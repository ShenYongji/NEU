
-- 0, 1, 2

-- Question 1

SELECT FullName, [1] as 'Sun', [2] as 'Mon', [3] as 'Tue', [4] as 'Wed', [5] as 'Thr', [6] as 'Fri', [7] as 'Sat'
FROM 
(select (p.LastName + ', ' + p.FirstName) FullName, datepart(dw, sh.OrderDate) Weekday, SalesOrderID
from Sales.SalesOrderHeader sh
join Person.Person p
on sh.SalesPersonID = p.BusinessEntityID) AS SourceTable
PIVOT
(
count(SalesOrderID)
FOR Weekday IN
( [1], [2], [3], [4], [5], [6], [7] )
) AS PivotTable
ORDER BY FullName;


-- Question 2

select CustomerID, CAST(SUM(TotalDue) AS decimal(10,2)) TotalPurchase,

STUFF((SELECT  TOP 5 WITH TIES ', '+RTRIM(CAST(SalesOrderID as char))  
       FROM Sales.SalesOrderHeader s  
	   WHERE s.CustomerID = c.CustomerID
       ORDER BY TotalDue desc
       FOR XML PATH('')) , 1, 2, '') AS Orders

from Sales.SalesOrderHeader c
where CustomerID in (
select distinct CustomerID
from Sales.SalesOrderHeader sh
join Sales.SalesOrderDetail sd
on sh.SalesOrderID = sd.SalesOrderID
group by CustomerID, sh.SalesOrderID
having count(distinct sd.ProductID) > 70)
group by CustomerID
order by CustomerID;


-- Question 3

create trigger trMemberFee on Orderdetail
after insert, update, delete
as
begin
   declare @OID int, @ODate date, @CustID int, @TotalPurchase money;
   set @OID = (select coalesce(i.OrderID, d.OrderID)
			   from inserted i full join deleted d on i.OrderID=d.OrderID);
   set @ODate = (select OrderDate from SalesOrder where OrderID = @OID);
   set @CustID = (select CustomerID from SalesOrder where OrderID = @OID);
   set @TotalPurchase = (select sum(UnitPrice * Quantity) from OrderDetail 
                         where OrderID in 
						    (select OrderID from SalesOrder where CustomerID = @CustID)
						     and year(@ODate) = year(getdate()));
   if @TotalPurchase > 5000
      update Customer set MembershipFee = 0
   else
      update Customer set MembershipFee = 100;
end


