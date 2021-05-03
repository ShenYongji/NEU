-- Quiz 2 

-- 2nd Last Digit of NUID 3 or 4

-- Your Name: Yongji Shen
-- Your NUID: 001531346


-- Question 1 (4 points)

/* Using AdventureWorks2008R2, rewrite the following query to 
   present the same data in a horizontal format,
   as listed below, based on the SQL PIVOT command. */
use AdventureWorks2008R2;

select (p.LastName + ', ' + p.FirstName) FullName, year(sh.OrderDate) OrderYear, count(SalesOrderID) TotalOrder
from Sales.SalesOrderHeader sh
join Sales.Customer c
on sh.CustomerID = c.CustomerID
join Person.Person p
on c.PersonID = p.BusinessEntityID
where sh.CustomerID between 30000 and 30005
group by p.LastName + ', ' + p.FirstName, year(sh.OrderDate)
order by FullName;

/*
FullName				2005	2006	2007	2008
McCoy, James			0		2		4		2
McDonald, Christinia	0		0		1		1
McGuel, Alejandro		0		0		2		2
McKay, Yvonne			1		1		2		0
McLin, Nkenge			2		2		2		1
McPhearson, Nancy		0		0		2		2
*/
SELECT FullName, [2005], [2006], [2007], [2008]
FROM 
(
	select (p.LastName + ', ' + p.FirstName) FullName, year(sh.OrderDate) OrderYear, SalesOrderID
	from Sales.SalesOrderHeader sh
	join Sales.Customer c
	on sh.CustomerID = c.CustomerID
	join Person.Person p
	on c.PersonID = p.BusinessEntityID
	where sh.CustomerID between 30000 and 30005
) AS SourceTable
PIVOT
(
	count(SalesOrderID) 
   FOR OrderYear IN ([2005], [2006], [2007], [2008])
) AS PivotTable;




-- Question 2 (5 points)

/*
Using AdventureWorks2008R2, write a query to retrieve 
the salespersons and their order info.

Return the salesperson id, a salesperson's total order count,
the highest total product quantity contained in an order 
for all orders of a salesperson, and a salesperson's top 5 orders.
The returned data should have the format displayed below.

For the highest total product quantity contained in an order 
for all orders of a salesperson, an example is:

Salesperson A has 3 orders.

Salesperson A's order #1 has a total sold quantity of 17
Salesperson A's order #2 has a total sold quantity of 25
Salesperson A's order #3 has a total sold quantity of 20

Then the highest total product quantity contained in an order 
for all orders of Salesperson A is 25. 

Keep in mind, it's the total sold product quantity of an order. 
For example, an order has two products:
Product 1 has a quantity of 7
Product 2 has a quantity of 12
Then the total sold quantity of this order is 19.

The top 5 orders have the 5 highest order values. 
Use TotalDue as the order value. If there is a tie, 
the tie must be retrieved.

Include only the salespersons who owned the top 10 orders.
The top 10 orders have the 10 highest numbers of unique products
contained in an order. 

Sort the returned data by SalespersonID.
*/

/*
SalesPersonID	TotalOrderCount	HighetUniqueProductsPerOrder	Orders
274				48				      71								      51830, 57136, 53465, 48359, 49127
275				450				   66								      47395, 53621, 50289, 47416, 48336
276				418				   72								      47355, 51822, 57186, 51126, 57105
282				271				   67								      53573, 47451, 51823, 45529, 53458
289				348				   71								      46616, 46607, 46645, 53535, 51160
290				175				   72								      46981, 51858, 57150, 69531, 51739
*/

use AdventureWorks2008R2;

-- select SalesPersonID,Count(soh.SalesOrderID), Sum(TotalDue), sum(OrderQty), count(ProductID)
-- from Sales.SalesOrderHeader soh
-- join Sales.SalesOrderDetail sod
-- on soh.SalesOrderID = sod.SalesOrderID
-- group by SalesPersonID;

 -- part 1
select SalesPersonID,Count(soh.SalesOrderID)  as 'TotalOrderCount'
from Sales.SalesOrderHeader soh
where SalesPersonID is not null
group by SalesPersonID;

-- part 2
select sod.SalesPersonID, SUM(sod.OrderQty)
from Sales.SalesOrderDetail sod
join Sales.SalesOrderHeader soh
on soh.SalesOrderID = sod.SalesOrderID
where sod.SalesPersonID is not null
group by sod.SalesOrderID;






-- Question 3 (6 points)

/* Given the following tables, there is a business rule
   to give a customer of the Platinum membership 20% discount.
   A customer's membership is stored in the Customer table.
   Write a trigger to implement the business rule.

   If there are more than one product for an order,
   then the products are added to the order one by one.
   You can just consider the INSERT scenario. */

use YongjiShen_Lab5;

create table Customer
(CustomerID int primary key,
 LastName varchar(50),
 FirstName varchar(50),
 Membership varchar(10));

create table SalesOrder
(OrderID int primary key,
 CustomerID int references Customer(CustomerID),
 OrderDate date);

create table OrderDetail
(OrderID int references SalesOrder(OrderID),
 ProductID int,
 Quantity int,
 UnitPrice money
 primary key(OrderID, ProductID));

create Trigger CountFinalPrice
on dbo.OrderDetail
after insert
AS
BEGIN
   Declare @currOrderID INT
   Declare @currCustomerID int
   Declare @currProductID int
   Declare @currMembership varchar(10)
   Declare @currUnitPrice money

   set @currOrderID = (select OrderID from inserted)

   set @currProductID = (select ProductID from inserted)

   set @currUnitPrice = (select UnitPrice from inserted)

   set @currCustomerID = (select CustomerID from dbo.SalesOrder
                           where OrderID = @currOrderID)

   set @currMemberShip = (select Membership 
                          from dbo.Customer
                          where CustomerID = @currCustomerID)
   if @currMemberShip = 'Platinum'
      update dbo.OrderDetail
      set UnitPrice = @currUnitPrice * 0.8
      where OrderID = @currOrderID and ProductID = @currProductID
END

INSERT INTO dbo.Customer values (1,'A1','A2','Platinum');
INSERT INTO dbo.Customer values (2,'B1','B2','Regular');
select * from dbo.Customer;

INSERT INTO dbo.SalesOrder values (1,1,getdate());
INSERT INTO dbo.SalesOrder values (2,2,getdate());

insert into dbo.OrderDetail values (2,1,1,20);
insert into dbo.OrderDetail values (1,1,1,20);

insert into dbo.OrderDetail values (2,2,1,500);
insert into dbo.OrderDetail values (1,2,1,500);

select * from dbo.SalesOrder;
select * from dbo.OrderDetail;

drop trigger if exists CountFinalPrice;
drop table if exists dbo.OrderDetail;
drop table if exists dbo.SalesOrder;
drop table if exists dbo.Customer;

