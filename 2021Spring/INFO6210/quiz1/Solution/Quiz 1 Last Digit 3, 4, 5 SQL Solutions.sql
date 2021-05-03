
-- Quiz 1 Last Digit 3, 4, 5 SQL Solutions

-- Q3

Select SalesPersonID, year(OrderDate) as Year,
       count(SalesOrderId) as 'Total Orders'
From Sales.SalesOrderHeader
where SalesPersonID in
(select SalesPersonID
 From Sales.SalesOrderHeader
 group by SalesPersonID
 having count( distinct year(OrderDate)) = 
        (select count( distinct year(OrderDate)) From Sales.SalesOrderHeader))
Group By SalesPersonID, year(OrderDate)
Order by SalesPersonID, year(OrderDate);




-- Q4

with temp1 as
     (select CustomerID, max(TotalDue) as HighestOrderValue
      from Sales.SalesOrderHeader
      group by CustomerID),

     temp2 as
	 (select CustomerID, sum(OrderQty) as HighestOrderQuantity,
      rank() over (partition by customerid order by sum(OrderQty) desc) as OrderQtyPosition
      from Sales.SalesOrderHeader sh
      join Sales.SalesOrderDetail sd
      on sh.SalesOrderID = sd.SalesOrderID
      group by CustomerID, sh.SalesOrderID)

select distinct t1.CustomerID, t1.HighestOrderValue, t2.HighestOrderQuantity
from temp1 as t1
join temp2 as t2
on t1.CustomerID = t2.CustomerID
where OrderQtyPosition = 1
order by t1.CustomerID desc;



