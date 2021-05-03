-- Part A

CREATE TABLE dbo.TargetCustomers(    
	TargetID int NOT NULL PRIMARY KEY,    
	FirstName varchar(10),    
	LastName varchar(10),    
	Address varchar(20),    
	City varchar(10),    
	State varchar(10),    
	ZipCode int
);

CREATE TABLE dbo.MailingLists(    
	MailingListID int IDENTITY NOT NULL PRIMARY KEY,    
	 varchar(30)
);

CREATE TABLE dbo.TargetMailingLists(    
	 TargetID int NOT NULL REFERENCES TargetCustomers(TargetID),    
	 MailingListID int NOT NULL REFERENCES MailingLists(MailingListID),    
	 CONSTRAINT pks PRIMARY KEY CLUSTERED(TargetID, MailingListID)
);


-- Part B

Use AdventureWorks2008R2;
SELECT distinct c.CustomerID,
COALESCE( STUFF((SELECT  distinct ', '+RTRIM(CAST(SalesPersonID as char))  
       FROM Sales.SalesOrderHeader 
       WHERE CustomerID = c.customerid
       FOR XML PATH('')) , 1, 2, '') , '')  AS SalesPersons
FROM Sales.Customer c
left join Sales.SalesOrderHeader oh on c.customerID = oh.CustomerID
order by c.CustomerID desc;


-- Part C

IF OBJECT_ID('tempdb..#TempTable') IS NOT NULL
DROP TABLE #TempTable;

WITH Parts(AssemblyID, ComponentID, PerAssemblyQty, EndDate, ComponentLevel) AS
(
    -- Top-level compoments
	SELECT b.ProductAssemblyID, b.ComponentID, b.PerAssemblyQty,
        b.EndDate, 0 AS ComponentLevel
    FROM Production.BillOfMaterials AS b
    WHERE b.ProductAssemblyID = 992
          AND b.EndDate IS NULL

    UNION ALL

	-- All other sub-compoments
    SELECT bom.ProductAssemblyID, bom.ComponentID, p.PerAssemblyQty,
        bom.EndDate, ComponentLevel + 1
    FROM Production.BillOfMaterials AS bom 
        INNER JOIN Parts AS p
        ON bom.ProductAssemblyID = p.ComponentID
        AND bom.EndDate IS NULL
)
SELECT AssemblyID, ComponentID, Name, ListPrice, PerAssemblyQty, 
       ListPrice * PerAssemblyQty SubTotal, ComponentLevel

into #TempTable

FROM Parts AS p
    INNER JOIN Production.Product AS pr
    ON p.ComponentID = pr.ProductID
ORDER BY ComponentLevel, AssemblyID, ComponentID;


SELECT
	(SELECT ListPrice
	FROM #TempTable
	WHERE ComponentLevel = 0 and ComponentID = 815)
	-
	(SELECT SUM(ListPrice)
	FROM #TempTable
	WHERE ComponentLevel = 1 and AssemblyID = 815) AS 'Price Difference';


