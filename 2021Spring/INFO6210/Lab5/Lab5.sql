CREATE DATABASE YongjiShen_Lab5;
GO
USE YongjiShen_Lab5;


-- Lab 5-1
/* 
 Create a function in your own database that takes two
 parameters:
    1) A year parameter
    2) A month parameter
 The function then calculates and returns the total sale
 for the requested year and month. If there was no sale
 for the requested period, returns 0.
 Hints: a) Use the TotalDue column of the
 Sales.SalesOrderHeader table in an
 AdventureWorks database for
 calculating the total sale.
 b) The year and month parameters should use
 the INT data type.
 c) Make sure the function returns 0 if there
 was no sale in the database for the requested
 period. 
*/

-- select YEAR(OrderDate) as 'year',MONTH(OrderDate) as 'month',TOTALDUE 
-- from AdventureWorks2008R2.sales.salesOrderHeader
-- order by YEAR(OrderDate),MONTH(OrderDate);

CREATE FUNCTION CalTotalDue
(@year int, @month int)
RETURNS float
AS
BEGIN
    DECLARE @total as float;
    set @total = (select sum(TotalDue) 
                    from AdventureWorks2008R2.sales.salesOrderHeader
                    WHERE YEAR(OrderDate) = @year AND MONTH(OrderDate) = @month)
    if (@total is null) set @total = 0
    RETURN @total
END


-- Test Cases
select dbo.CalTotalDue(2005,4) as "TotalSale"; --0
select dbo.CalTotalDue(2005,7) as "TotalSale"; --1074117.419
select dbo.CalTotalDue(2006,3) as "TotalSale"; --2350568.126


drop function if EXISTS CalTotalDue


-- Lab 5-2
/*
 Create a table in your own database using the following statement.
 CREATE TABLE DateRange
 (DateID INT IDENTITY,
  DateValue DATE,
  Month INT,
  DayOfWeek INT);
 Write a stored procedure that accepts two parameters:
  1) A starting date
  2) The number of the consecutive dates beginning with the starting
    date
 The stored procedure then populates all columns of the
 DateRange table according to the two provided parameters.
*/

CREATE TABLE DateRange
(
    DateID INT IDENTITY,
    DateValue DATE,
    Month INT,
    DayOfWeek INT
);

CREATE PROCEDURE CreateDateRange
 @startDate DATE,
 @Number int
AS
BEGIN
    while @Number <> 0
    BEGIN
        INSERT INTO DateRange
        values (@startDate, MONTH(@startDate), DATEPART(dw, @startDate) )
        set @Number = @Number -1
        set @startDate = DATEADD(day,1,@startDate)
    END
END

-- Test Cases

Declare @TestDate Date
set @TestDate = '2021-04-01'
Declare @TestNumber int
set @TestNumber = 20;

exec CreateDateRange @TestDate, @TestNumber;


select * from DateRange;

drop procedure if exists CreateDateRange
drop table if exists DateRange



-- Lab 5-3
/* With three tables as defined below:
    CREATE TABLE Customer
    (CustomerID VARCHAR(20) PRIMARY KEY,
    CustomerLName VARCHAR(30),
    CustomerFName VARCHAR(30),
    CustomerStatus VARCHAR(10));
    CREATE TABLE SaleOrder
    (OrderID INT IDENTITY PRIMARY KEY,
    CustomerID VARCHAR(20) REFERENCES Customer(CustomerID),
    OrderDate DATE,
    OrderAmountBeforeTax INT);
    CREATE TABLE SaleOrderDetail
    (OrderID INT REFERENCES SaleOrder(OrderID),
    ProductID INT,
    Quantity INT,
    UnitPrice INT,
    PRIMARY KEY (OrderID, ProductID));
 Write a trigger to update the CustomerStatus column of Customer
 based on the total of OrderAmountBeforeTax for all orders
 placed by the customer. If the total exceeds 5,000, put Preferred
 in the CustomerStatus column. */


CREATE TABLE Customer
(
    CustomerID VARCHAR(20) PRIMARY KEY,
    CustomerLName VARCHAR(30),
    CustomerFName VARCHAR(30),
    CustomerStatus VARCHAR(10)
);
CREATE TABLE SaleOrder
(
    OrderID INT IDENTITY PRIMARY KEY,
    CustomerID VARCHAR(20) REFERENCES Customer(CustomerID),
    OrderDate DATE,
    OrderAmountBeforeTax INT
);
CREATE TABLE SaleOrderDetail
(
    OrderID INT REFERENCES SaleOrder(OrderID),
    ProductID INT,
    Quantity INT,
    UnitPrice INT,
    PRIMARY KEY (OrderID, ProductID)
);

CREATE TRIGGER updateStatus
on dbo.SaleOrder
after INSERT, UPDATE,DELETE
AS
BEGIN
    Declare @CurrCustomerID VARCHAR(20)
    -- Declare @CurrCustomerStatus VARCHAR(10)
    Declare @TotalOrderAmountBeforeTax INT

    set @CurrCustomerID = ISNULL((SELECT CustomerID FROM Inserted), (SELECT CustomerID FROM Deleted));

    set @TotalOrderAmountBeforeTax = (select Sum(OrderAmountBeforeTax) 
                                      from dbo.SaleOrder 
                                      where CustomerID = @CurrCustomerID
                                      group by CustomerID);
                                     
    if @TotalOrderAmountBeforeTax > 5000
       update dbo.Customer
       set CustomerStatus = 'Preferred'
       where CustomerID = @CurrCustomerID
    else
       update dbo.Customer
       set CustomerStatus = NULL
       where CustomerID = @CurrCustomerID
END

-- Test Cases
-- initialize Customer
INSERT INTO Customer values ('001','A1','A2',NULL)
INSERT INTO Customer values ('002','B1','B2',NULL)
INSERT INTO Customer values ('003','C1','C2',NULL)
INSERT INTO Customer values ('004','D1','D2',NULL)
select * from Customer;
select * from SaleOrder;

-- initialize SaleOrder
INSERT INTO SaleOrder values ('001','2021-04-01',6000)
INSERT INTO SaleOrder values ('004','2021-04-01',40)
select * from Customer;
select * from SaleOrder;


-- Insert Case
INSERT INTO SaleOrder values ('004','2021-04-02',60000)
select * from Customer;
select * from SaleOrder;


-- Update Case
update SaleOrder set OrderAmountBeforeTax = 50
       where CustomerID = '001' and OrderDate = '2021-04-01'
select * from Customer;
select * from SaleOrder;


-- Delete Case
DELETE FROM SaleOrder where CustomerID = '004' and OrderDate = '2021-04-02'
select * from Customer;
select * from SaleOrder;


-- Insert Case
INSERT INTO SaleOrder values ('002','2021-04-02',60000)
select * from Customer;
select * from SaleOrder;


drop trigger if exists updateStatus;
drop table if EXISTS SaleOrderDetail;
drop table if EXISTS SaleOrder;
drop table if EXISTS Customer;