USE AdventureWorks2008R2;

/* Use the content of the AdventureWorks database for each of
 the following questions. Submit the SQL queries to Canvas in
 a single .sql file. */

-- 2-1
/* Write a query to retrieve all orders processed by the salesperson 276
 and had an total due value greater than $40,000. Include
 the salesperson id, sales order id, order date and total due columns
 in the returned data.
 Use the CAST function in the SELECT clause to display the date
 only for the order date. Use ROUND to display only two decimal
 places for the total due amount. Use an alias to give a descriptive
 column heading if a column heading is missing. Sort the returned
 data first by the SalesPerson ID, then order date.
 Hint: (a) Use the Sales.SalesOrderHeader table.
 (b) The syntax for CAST is CAST(expression AS data_type),
 where expression is the column name we want to format and
 we can use DATE as data_type for this question to display
 just the date.
 (c) The syntax for ROUND is ROUND(expression, position_to_round),
 where expression is the column name we want to format and
 we can use 2 for position_to_round to display two decimal
 places. */

select SalesPersonID, SalesOrderID, CAST(OrderDate AS date) AS 'OrderDate', ROUND(TotalDue,2) AS 'Total Due' 
from Sales.SalesOrderHeader
where SalesPersonID = 276 and TotalDue > 40000
order by SalesOrderID, OrderDate;


-- 2-2
/* List the territory id, total number of orders and total sales amount
 for each sales territory. Use the TotalDue column for calculating the
 total sales amount. Include only the sales territories which
 have a total order count greater than 5000.

 Use a column alias to make the report look more presentable. Use ROUND and CAST
 to display the total sales amount as a rounded integer. Sort the returned
 data by the territory id.
 Hint: You need to work with the Sales.SalesOrderHeader table. */

select TerritoryID, COUNT(SalesOrderNumber) as "TotalNumberofOrders", CAST(ROUND(SUM(TotalDue),2) as int) as "TotalSalesAmount"
from Sales.SalesOrderHeader
group by TerritoryID
having COUNT(SalesOrderNumber) > 5000
order by TerritoryID ASC;

-- 2-3
/* Write a query to select the product id, name, list price, and
 sell start date for the product(s) that have a list price greater
 than the list price of the product 888. Display only the date
 for the sell start date and make sure all columns have a descriptive
 heading. Sort the returned data by the list price in descending.
 Hint: You’ll need to use a simple subquery to get the list price
 of the product 888 and use it in a WHERE clause. */

-- select ListPrice from Production.Product where ProductID = 888
-- Output： 1003.9100

select ProductID, Name, ListPrice, CAST(SellStartDate as date) as "SellStartDate" 
from Production.Product
where ListPrice > ( 
    select ListPrice from Production.Product 
    where ProductID = 888
    )
order by ListPrice DESC;


-- 2-4
/* Write a query to retrieve the total sold quantity for each product.
 Return only the products that have a total sold quantity greater than 2000.
 Use a column alias to make the report look more presentable.
 Sort the returned data by the total sold quantity in the descending order.
 Include the product ID, product name and total sold quantity columns
 in the report.
 Hint: Use the Sales.SalesOrderDetail and Production.Product tables. */

select s.ProductID, p.name, Sum(s.OrderQty) as "TotalSoldQuantity"
from Sales.SalesOrderDetail s, Production.Product p
where s.ProductID = p.ProductID
group by s.ProductID,p.name
having Sum(s.OrderQty) > 2000
order by TotalSoldQuantity Desc;


-- 2-5
/* Retrieve a unique list of the customer id of the
 customers who have purchased both Product 710 and Product 715.
 Sort the returned data by the customer id.
*/

select distinct h.CustomerID from Sales.SalesOrderHeader h, 
            (select a.SalesOrderID as "SalesOrderID" from 
                (select SalesOrderID, ProductID from Sales.SalesOrderDetail where ProductID = 710) a , 
                (select SalesOrderID, ProductID from Sales.SalesOrderDetail where ProductID = 715) b
            where a.SalesOrderID = b.SalesOrderID) t
where h.SalesOrderID  = t.SalesOrderID
order by h.CustomerID asc;

select distinct h.CustomerID from Sales.SalesOrderHeader h, (
                                            SELECT hh.SalesOrderID as "SalesOrderID"
                                            FROM Sales.SalesOrderDetail hh
                                            INNER JOIN Sales.SalesOrderDetail ht
                                            ON hh.SalesOrderID=ht.SalesOrderID
                                            where hh.ProductID = 710 and ht.ProductID = 715
                                            ) t
where t.SalesOrderID = h.SalesOrderID
order by h.CustomerID asc;

(select CustomerID
 from Sales.SalesOrderHeader oh
 join Sales.SalesOrderDetail od
      on oh.SalesOrderID = od.SalesOrderID
 where od.ProductID = 710)

INTERSECT

(select CustomerID
 from Sales.SalesOrderHeader oh
 join Sales.SalesOrderDetail od
      on oh.SalesOrderID = od.SalesOrderID
 where od.ProductID = 715)

order by CustomerID;
-- 2-6
/* Write a query to return the sales territories which have
 never had an order worth more than $140000. Include the
 territory id, territory name and highest order value
 in the returned data. Use TotalDue of SalesOrderHeader as
 the order value. Display the highest order value in two decimal
 places. Sort the returned data by the territory id.
*/

select h.TerritoryID, t.Name, ROUND(max(h.TotalDue),2) as "HighestOrderValue" 
from Sales.SalesOrderHeader h, Sales.SalesTerritory t
where h.TerritoryID not in (select distinct TerritoryID from Sales.SalesOrderHeader
                            where TotalDue > 140000) 
      and t.TerritoryID = h.TerritoryID
group by h.TerritoryID, t.Name
order by h.TerritoryID;