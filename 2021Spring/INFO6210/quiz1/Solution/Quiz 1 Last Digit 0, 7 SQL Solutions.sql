
-- Quiz 1 Last Digit 0, 7 SQL Solutions

-- Q3

Select CustomerID, year(OrderDate) as Year,
       count(SalesOrderId) as 'Total Orders'
From Sales.SalesOrderHeader
where CustomerID in
(select CustomerID
 From Sales.SalesOrderHeader
 Group By CustomerID
 having count(distinct year(OrderDate)) >= 3)
Group By CustomerID, year(OrderDate)
Order by CustomerID, year(OrderDate);



-- Q4

with temp1 as
(select TerritoryID, count(SalesOrderID) NumberOfOrders
 from Sales.SalesOrderHeader
 where year(OrderDate) in (2005, 2006, 2007) and month(OrderDate) in (1, 2, 3)
       and TotalDue < 100
 group by TerritoryID)

select top 1 with ties t.TerritoryID, s.Name, NumberOfOrders
from temp1 t
join Sales.SalesTerritory s
on t.TerritoryID = s.TerritoryID
order by NumberOfOrders desc;


