-- Part A (2 points)
/*
 Create 3 tables and the corresponding relationships to 
 implement the ERD below in your own database.
*/

CREATE DATABASE YongjiShen_Lab4;
GO
USE YongjiShen_Lab4;

-- drop table IF EXISTS partA.TargetMailingLists,partA.TargetCustomers,partA.MailingLists
-- drop schema partA

CREATE SCHEMA partA;

create TABLE partA.TargetCustomers
(
        TargetID int IDENTITY NOT NULL PRIMARY KEY,
        FirstName varchar(40) NOT NULL,
        LastName varchar(40) NOT NULL,
        Address varchar(40) NOT NULL,
        City varchar(40) NOT NULL,
        State varchar(40) NOT NULL,
        ZipCode int NOT NULL
);
create TABLE partA.MailingLists
(
        MailingListID int IDENTITY NOT NULL PRIMARY KEY,
        MailingList varchar(40) NOT NULL
);

create Table partA.TargetMailingLists
(
        TargetID int NOT NULL REFERENCES partA.TargetCustomers(TargetID),
        MailingListID int NOT NULL REFERENCES partA.MailingLists(MailingListID),
        CONSTRAINT PK_TargetMailingLists PRIMARY KEY (TargetID,MailingListID)
);

-- Part B (2 point)
/* 
 Using the content of AdventureWorks, write a query to retrieve
 all unique customers with all salespeople they have dealt with.
 If a customer has never worked with a salesperson, make the
 'Salesperson ID' column blank instead of displaying NULL.
 Sort the returned data by CustomerID in the descending order.
 The result should have the following format.
 Hint: Use the SalesOrderHeadrer table.
*/
use AdventureWorks2008R2;


SELECT DISTINCT t2.CustomerID,
STUFF((select DISTINCT
        ', ' + COALESCE(CAST(t1.SalesPersonID as VARCHAR),'')
        from Sales.SalesOrderHeader t1
        where t1.CustomerID =t2.CustomerID
        FOR XML PATH('')) , 1, 2, '') AS SalesPersonID
FROM Sales.SalesOrderHeader t2
order by t2.CustomerID desc


-- Part C (2 points)
/* Bill of Materials - Recursive */
/* 
 The following code retrieves the components required for manufacturing
 the "Mountain-500 Black, 48" (Product 992). Use it as the starter code
 for calculating the material cost reduction if the component 815
 is manufactured internally at the level 1 instead of purchasing it
 for use at the level 0. Use the list price of a component as
 the material cost for the component. 
*/

drop table if exists #tmp_table;

 WITH Parts(AssemblyID, ComponentID, PerAssemblyQty, EndDate, ComponentLevel) AS
(
 SELECT b.ProductAssemblyID, b.ComponentID, b.PerAssemblyQty,
 b.EndDate, 0 AS ComponentLevel
 FROM Production.BillOfMaterials AS b
 WHERE b.ProductAssemblyID in (992) AND b.EndDate IS NULL
 UNION ALL
 SELECT bom.ProductAssemblyID, bom.ComponentID, p.PerAssemblyQty,
 bom.EndDate, ComponentLevel + 1
 FROM Production.BillOfMaterials AS bom
 INNER JOIN Parts AS p
 ON bom.ProductAssemblyID = p.ComponentID AND bom.EndDate IS NULL
)

SELECT AssemblyID, ComponentID, Name, PerAssemblyQty, ListPrice, ComponentLevel
into #tmp_table
FROM Parts AS p
INNER JOIN Production.Product AS pr
ON p.ComponentID = pr.ProductID
WHERE ComponentLevel in (0,1) 
ORDER BY ComponentLevel, AssemblyID, ComponentID;

-- Select * from #tmp_table;

select(
 (
  select sum(PerAssemblyQty*ListPrice) as Price from #tmp_table
  where ComponentID = 815 and ComponentLevel = 0
 )
 - 
 (
   select sum(PerAssemblyQty*ListPrice) as Price from #tmp_table
   where AssemblyID = 815 and ComponentLevel = 1
 )
) as 'CostReduction';