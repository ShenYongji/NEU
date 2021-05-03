
-- 7, 8

-- Question 1

SELECT [Month],
       [Black],
	   [Red],
	   [Yellow],
	   [White]
FROM (SELECT DATENAME(mm, OrderDate) AS [Month], Color,
       OrderQty
FROM   Sales.SalesOrderHeader sh
JOIN Sales.SalesOrderDetail sd
ON sh.SalesOrderID = sd.SalesOrderID
JOIN Production.Product p
ON p.ProductID = sd.ProductID
WHERE Color in ('Black' , 'Red' , 'Yellow' , 'White')
	  ) AS SourceTable
PIVOT
     (SUM(OrderQty)
      FOR Color IN ([Black] , [Red] , [Yellow] , [White])
     ) AS PivotTable
ORDER BY MONTH([Month]+ ' 1 2020');


-- Question 2

with temp as (
select CustomerID, sum(sd.OrderQty) TotalQuantity
from Sales.SalesOrderHeader sh
join Sales.SalesOrderDetail sd
on sh.SalesOrderID = sd.SalesOrderID
group by CustomerID, sh.SalesOrderID)

select c.CustomerID, count(distinct SalesOrderID) TotalOrderCount, 
       max(TotalQuantity) HighestTotalQuantity,

STUFF((SELECT  TOP 3 WITH TIES ', '+RTRIM(CAST(SalesOrderID as char))  
       FROM Sales.SalesOrderHeader t  
	   WHERE t.CustomerID = c.CustomerID 
       ORDER BY TotalDue DESC
       FOR XML PATH('')) , 1, 2, '') AS Orders

from Sales.SalesOrderHeader c
join temp t
on c.CustomerID = t.CustomerID
where c.CustomerID not in
(select CustomerID
from Sales.SalesOrderHeader
where TotalDue < 80000)
group by c.CustomerID
order by c.CustomerID;


-- Question 3

CREATE TRIGGER utrSalaryAudit 
ON Employee  
AFTER UPDATE
AS  
BEGIN
	IF UPDATE(Salary)
	begin
	   declare @ct smallint, @emp int;

	   select @emp = employeeid from inserted;

	   select @ct = count(employeeid)
	   from SalaryAudit
	   where year(changetime) = year(getdate())
	     and employeeid = @emp;

	   IF @ct >= 2

	       ROLLBACK Transaction

	   ELSE
	      INSERT INTO SalaryAudit (EmployeeID, OldSalary, NewSalary) 
		   SELECT i.EmployeeID, d.Salary, i.Salary
		   FROM inserted i
		   JOIN deleted d
		   ON i.EmployeeID = d.EmployeeID;	  
    end
END

drop TRIGGER utrSalaryAudit




