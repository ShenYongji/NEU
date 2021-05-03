use AdventureWorks2008R2

select CustomerID,SalesOrderID,YEAR(OrderDate) AS Year from Sales.SalesOrderHeader
order by CustomerID,YEAR(OrderDate);

-- Question 3 (3 points)
/* Using AdventureWorks2008R2, list the total number of orders made in each
 year by a customer. Include only the customer(s) who has
 made at least one order per year in every year according to
 the data stored in the database.
 Return the customer id, year, the total number of orders made in each
 year by the customer.
 Sort the returned data first by CustomerID, then by year. */

select 
 CustomerID,
 Count(SalesOrderID) AS 'TotalNumberOfOrders', 
 YEAR(OrderDate) AS Year
from Sales.SalesOrderHeader
group by CustomerID, YEAR(OrderDate)
order by CustomerID, YEAR(OrderDate);


-- Question 4 (4 points)
/* Using AdventureWorks2008R2, write a query to create a report containing
 a salesperson's highest order value and a salesperson's highest total
 sold product quantity per order for all orders of each salesperson.
 Exclude orders that don't have a salesperson listed for this report.

 Include the salesperson id, the highest order value and the highest
 total sold product quantity per order columns in the returned data
 for all salespersons.
 Sort the report by the salesperson id in desc. */

select
 a.SalesPersonID, 
 MAX(a.TotalDue) as 'HighestOrderValue', 
 Max(TotalOrderQty) AS 'HighestTotalSoldProducyQuantity' 
from 
(select SalesOrderID,SalesPersonID,TotalDue from Sales.SalesOrderHeader) a
join 
(SELECT SalesOrderID, sum(OrderQty) as "TotalOrderQty" from Sales.SalesOrderDetail
group by SalesOrderID) b
on a.SalesOrderID = b.SalesOrderID and a.SalesPersonID is not NULL
group by a.SalesPersonID
order by a.SalesPersonID desc

 

