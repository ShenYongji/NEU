
-- 5, 6, 9

-- Question 1

SELECT [Month],
       ISNULL(cast([30020] as int), 0) '30020',
	   ISNULL(cast([30021] as int), 0) '30021',
	   ISNULL(cast([30022] as int), 0) '30022',
	   ISNULL(cast([30023] as int), 0) '30023',
	   ISNULL(cast([30024] as int), 0) '30024'
FROM (SELECT DATENAME(mm, OrderDate) AS [Month], CustomerID, TotalDue
      FROM Sales.SalesOrderHeader
      WHERE CustomerID BETWEEN 30020 AND 30024
	  ) AS SourceTable
PIVOT
     (SUM(TotalDue) 
      FOR CustomerID IN ([30020], [30021], [30022], [30023], [30024])
     ) AS PivotTable
ORDER BY MONTH([Month]+ ' 1 2019');


-- Question 2

with temp as (
select distinct CustomerID, sum(sd.OrderQty) TotalQuantity
from Sales.SalesOrderHeader sh
join Sales.SalesOrderDetail sd
on sh.SalesOrderID = sd.SalesOrderID
group by CustomerID, sh.SalesOrderID
having sum(sd.OrderQty) > 450)

select c.CustomerID, count(distinct SalesOrderID) TotalOrderCount, max(TotalQuantity) HighestTotalQuantity,

STUFF((SELECT  TOP 5 WITH TIES ', '+RTRIM(CAST(SalesOrderID as char))  
       FROM Sales.SalesOrderHeader s  
	   WHERE s.CustomerID = c.CustomerID
       ORDER BY TotalDue DESC
       FOR XML PATH('')) , 1, 2, '') AS Orders

from Sales.SalesOrderHeader c
join temp t
on c.CustomerID = t.CustomerID
group by c.CustomerID
order by c.CustomerID;


-- Question 3

create trigger trAuditRaise
on Raise
after INSERT
as
begin
   declare @ttlRaise int, @empID int, @enterAmount int, @yr int;
   set @yr = (select year(RaiseDate) from inserted);
   set @empID = (select EmployeeID from inserted);
   select @ttlRaise = sum(RaiseAmount)
      from Raise
      where EmployeeID = @empID and year(RaiseDate) = @yr;

   if @ttlRaise > 40000
      begin
         rollback transaction;
         set @enterAmount = (select RaiseAmount from inserted);
         insert into RaiseAudit (EnteredAmount)
            values (@enterAmount);
      end
end



