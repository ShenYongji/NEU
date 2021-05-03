
-- 3 or 4

-- Question 1 

SELECT FullName, [2005] as '2005', [2006] as '2006', [2007] as '2007', [2008] as '2008'
FROM 
(select (p.LastName + ', ' + p.FirstName) FullName, year(sh.OrderDate) OrderYear, SalesOrderID
from Sales.SalesOrderHeader sh
join Sales.Customer c
on sh.CustomerID = c.CustomerID
join Person.Person p
on c.PersonID = p.BusinessEntityID
where sh.CustomerID between 30000 and 30005) AS SourceTable
PIVOT
(
count(SalesOrderID)
FOR OrderYear IN
( [2005], [2006], [2007], [2008] )
) AS PivotTable
ORDER BY FullName;


-- Question 2

with temp as (
select SalesPersonID, count(distinct sd.ProductID) UniqueProducts,
       rank() over (order by count(distinct sd.ProductID) desc) Rank
from Sales.SalesOrderHeader sh
join Sales.SalesOrderDetail sd
on sh.SalesOrderID = sd.SalesOrderID
group by SalesPersonID, sh.SalesOrderID
)

select c.SalesPersonID, count(distinct SalesOrderID) TotalOrderCount, 
       max(UniqueProducts) HighetUniqueProductsPerOrder,

STUFF((SELECT  TOP 5 WITH TIES ', '+RTRIM(CAST(SalesOrderID as char))  
       FROM Sales.SalesOrderHeader s  
	   WHERE s.SalesPersonID = c.SalesPersonID
       ORDER BY TotalDue DESC
       FOR XML PATH('')) , 1, 2, '') AS Orders

from Sales.SalesOrderHeader c
join temp t
on c.SalesPersonID = t.SalesPersonID
where Rank <= 10
group by c.SalesPersonID
order by c.SalesPersonID;


-- Question 3

create trigger trMembershipDiscount on Orderdetail
after insert
as
begin
   declare @OID int, @CustID int, @Member varchar(10);

   set @OID = (select OrderID from inserted);

   set @CustID = (select CustomerID from SalesOrder where OrderID = @OID);

   set @Member = (select Membership from Customer where CustomerID = @CustID);

   if @Member = 'Platinum'
      update Orderdetail set UnitPrice = UnitPrice * 0.8
             where OrderID = @OID and ProductID = (select ProductID from inserted);
end

