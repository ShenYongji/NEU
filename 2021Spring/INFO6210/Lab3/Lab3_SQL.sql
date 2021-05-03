USE AdventureWorks2008R2;
-- Lab 3-1
/* Modify the following query to add a column that identifies the
 performance of salespersons and contains the following feedback
 based on the number of orders processed by a salesperson:
 'Need to Work Hard' for the order count range 1-100
 'Fine' for the order count range of 101-300
 'Strong Performer' for the order count greater than 300
 Give the new column an alias to make the report more readable.
*/

SELECT
 SalesPersonID, p.LastName, p.FirstName,
 COUNT(o.SalesOrderid) [Total Orders],
 case
    when COUNT(o.SalesOrderid) > 1 and COUNT(o.SalesOrderid) <= 100
        then 'Need to Work Hard'
    when COUNT(o.SalesOrderid) > 100 and COUNT(o.SalesOrderid) <= 300
        then 'Fine'
    when COUNT(o.SalesOrderid) > 300
        then 'Strong Performer'
 end as feedback
FROM Sales.SalesOrderHeader o
JOIN Person.Person p
 ON o.SalesPersonID = p.BusinessEntityID
GROUP BY o.SalesPersonID, p.LastName, p.FirstName
ORDER BY p.LastName, p.FirstName;


-- Lab 3-2
/* Modify the following query to add a rank without gaps in the
 ranking based on total orders in the descending order. Also
 partition by territory.*/

SELECT 
 DENSE_RANK() over (partition by o.TerritoryID order by COUNT(o.SalesOrderid) DESC) as rank,
 o.TerritoryID, s.Name, year(o.OrderDate) Year,
 COUNT(o.SalesOrderid) [Total Orders]
FROM Sales.SalesTerritory s
JOIN Sales.SalesOrderHeader o
 ON s.TerritoryID = o.TerritoryID
GROUP BY o.TerritoryID, s.Name, year(o.OrderDate)
ORDER BY o.TerritoryID;

-- Lab 3-3
/* Write a query that returns the male salesperson(s) who received
 the lowest bonus amount in Europe. Include the salesperson's
 id and bonus amount in the returned data. Your solution must
 retrieve the tie if there is a tie. */
select t.BusinessEntityID as 'SalesPersonID', t.Bonus from (
            select
             sp.BusinessEntityID,
            --  sp.SalesPersonID
             sp.TerritoryID,
             sp.Bonus,
             RANK() over (order by sp.Bonus) as Rank,
             st.[Group]
            from Sales.SalesPerson sp
            JOIN HumanResources.Employee e
             on e.BusinessEntityID = sp.BusinessEntityID
            JOIN Sales.SalesTerritory st
             on sp.TerritoryID = st.TerritoryID
            where e.Gender = 'M' and st.[Group] = 'Europe') t
where t.Rank = 1
-- Lab 3-4
/* Write a query to retrieve the most valuable customer of each year.
 The most valuable customer of a year is the customer who has
 made the most purchase for the year. Use the yearly sum of the
 TotalDue column in SalesOrderHeader as a customer's total purchase
 for a year. If there is a tie for the most valuable customer,
 your solution should retrieve it.
 Include the customer's id, total purchase, and total order count
 for the year. Display the total purchase in two decimal places.
 Sort the returned data by the year. */

select 
 t.CustomerID,
 t.Year,
 t.TotalPurchase,
 t.TotalOrderCountForTheYear
from
    (select 
    CustomerID, 
    year(OrderDate) as Year,
    Count(SalesOrderID) as "TotalOrderCountForTheYear", 
    Round(Sum(TotalDue),2) as "TotalPurchase",
    RANK() over (partition by year(OrderDate) order by Round(Sum(TotalDue),2) desc) as rank
    from Sales.SalesOrderHeader
    group by CustomerID,year(OrderDate)
    ) t
where t.rank = 1
order by t.Year 

select Year, CustomerID, round(TotalSale, 2) [Total Sales], OrderCount 'Order Count' from
(
  select year(OrderDate) Year, CustomerID, sum(TotalDue) TotalSale, count(SalesOrderID) OrderCount,
         rank() over (partition by year(OrderDate) order by sum(TotalDue) desc) as rank
  from Sales.SalesOrderHeader
  group by year(OrderDate), CustomerID) temp
where rank =1
order by Year;

-- Lab 3-5
/* Write a query to retrieve the dates in which there was
 at least one product sold but no product in red
 was sold.

 Return the "date" and "total product quantity sold
 for the date" columns. The order quantity can be found in
 SalesOrderDetail. Display only the date for a date.
 Sort the returned data by the
 "total product quantity sold for the date" column in desc. */

-- select
--  CAST(soh.OrderDate AS date) as 'Date',
--  sum(sod.OrderQty) as 'TotalProductQuantitySoldForTheDate'
-- from Sales.SalesOrderHeader soh
-- join Sales.SalesOrderDetail sod
-- on soh.SalesOrderID = sod.SalesOrderID
-- where sod.ProductID not in (
--                             select ProductID from Production.product
--                             where color = 'red' )
-- group by CAST(soh.OrderDate AS date)
-- order by TotalProductQuantitySoldForTheDate desc

select
 CAST(soh.OrderDate AS date) as 'Date',
 sum(sod.OrderQty) as 'TotalProductQuantitySoldForTheDate'
from Sales.SalesOrderHeader soh
join Sales.SalesOrderDetail sod
 on soh.SalesOrderID = sod.SalesOrderID
where CAST(soh.OrderDate AS date) not in (
    select distinct
     CAST(soh.OrderDate AS date) as 'Date' 
    from Sales.SalesOrderHeader soh
    join Sales.SalesOrderDetail sod
     on soh.SalesOrderID = sod.SalesOrderID
    where sod.ProductID in (
        select ProductID from Production.product
        where color = 'red' 
    )
)
group by CAST(soh.OrderDate AS date)
order by TotalProductQuantitySoldForTheDate desc