
-- Quiz 1 Last Digit 2, 6, 9 SQL Solutions

-- Q3

Select CustomerID, year(OrderDate) as Year,
       count(SalesOrderId) as 'Total Orders'
From Sales.SalesOrderHeader
where CustomerID in
(select CustomerID
 From Sales.SalesOrderHeader
 group by CustomerID
 having count( distinct year(OrderDate)) = 
        (select count( distinct year(OrderDate)) From Sales.SalesOrderHeader))
Group By CustomerID, year(OrderDate)
Order by CustomerID, year(OrderDate);



-- Q4

with temp1 as
     (select SalesPersonID, max(TotalDue) as HighestOrderValue
      from Sales.SalesOrderHeader
	  where SalesPersonID is not null
      group by SalesPersonID),

     temp2 as
	 (select SalesPersonID, sum(OrderQty) as HighestOrderQuantity,
      rank() over (partition by SalesPersonID order by sum(OrderQty) desc) as OrderQtyPosition
      from Sales.SalesOrderHeader sh
      join Sales.SalesOrderDetail sd
      on sh.SalesOrderID = sd.SalesOrderID
	  where SalesPersonID is not null
      group by SalesPersonID, sh.SalesOrderID)

select distinct t1.SalesPersonID, t1.HighestOrderValue, t2.HighestOrderQuantity
from temp1 as t1
join temp2 as t2
on t1.SalesPersonID = t2.SalesPersonID
where OrderQtyPosition = 1
order by t1.SalesPersonID desc;

-- or

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
order by a.SalesPersonID desc;

