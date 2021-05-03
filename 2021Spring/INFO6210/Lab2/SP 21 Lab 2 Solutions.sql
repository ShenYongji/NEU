
-- Lab 2 Solutions

-- 2-1

select SalesPersonID, SalesOrderID, cast(OrderDate as date) 'Order Date',
       round(TotalDue, 2) 'Total Due'
from Sales.SalesOrderHeader
where SalesPersonID = 276 and TotalDue > 40000
order by SalesPersonID, OrderDate;


--2-2

Select TerritoryID as 'Territory ID', 
       count(SalesOrderId) as 'Total Orders',
	   cast(round(sum(TotalDue), 0) as int) as 'Total Sales'
From Sales.SalesOrderHeader
Group By TerritoryID
having count(SalesOrderId) > 5000 
Order by TerritoryID;


-- 2-3

Select ProductID as 'Product ID', 
       Name as 'Product Name',
       ListPrice as 'List Price', 
	   cast(SellStartDate as date) 'Sell Start Date'
From Production.Product
Where ListPrice > (Select ListPrice From Production.Product where ProductID = 888)
ORDER BY ListPrice desc;


-- 2-4

Select p.ProductID as 'Product ID',
       p.Name as 'Product Name',
       sum(sod.OrderQty) as 'total sold quantity'
From Production.Product p 
join Sales.SalesOrderDetail sod
on p.ProductID = sod.ProductID
Group By p.ProductID, p.Name
Having sum(sod.OrderQty) > 2000
Order by sum(sod.OrderQty) desc;


-- 2-5

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

select t.TerritoryID, Name, round(max(TotalDue), 2) HighestOrderValue
from Sales.SalesTerritory t
join Sales.SalesOrderHeader sh
on t.TerritoryID = sh.TerritoryID
where t.TerritoryID not in
(select TerritoryID
 from Sales.SalesOrderHeader
 where TotalDue > 140000)
group by t.TerritoryID, name
order by t.TerritoryID;

