
-- Lab 3-1

SELECT SalesPersonID, p.LastName, p.FirstName,
       COUNT(o.SalesOrderid) [Total Orders],
	   CASE
		  WHEN COUNT(o.SalesOrderID) BETWEEN 1 AND 100
			 THEN 'Need to Work Hard'
		  WHEN COUNT(o.SalesOrderID) BETWEEN 101 AND 300
			 THEN 'Fine'
		  ELSE 'Strong Performer'
	   END AS Performance
FROM Sales.SalesOrderHeader o
JOIN Person.Person p
   ON o.SalesPersonID = p.BusinessEntityID
GROUP BY o.SalesPersonID, p.LastName, p.FirstName
ORDER BY p.LastName, p.FirstName;


-- Lab 3-2

SELECT o.TerritoryID, s.Name, year(o.OrderDate) Year,
	   COUNT(o.SalesOrderid) [Total Orders],
	   DENSE_RANK() OVER (PARTITION BY o.TerritoryID ORDER BY COUNT(o.SalesOrderid) DESC) [Rank]
FROM Sales.SalesTerritory s 
JOIN Sales.SalesOrderHeader o
	  ON s.TerritoryID = o.TerritoryID
GROUP BY o.TerritoryID, s.Name, year(o.OrderDate)
ORDER BY o.TerritoryID;


-- Lab 3-3

SELECT TOP 1 WITH TIES  SP.BusinessEntityID, SP.Bonus AS LowestBonus
FROM [Sales].[SalesPerson] SP
JOIN [Sales].[SalesTerritory] ST
ON SP.TerritoryID = ST.TerritoryID
JOIN [HumanResources].[Employee] E
ON SP.BusinessEntityID = E.BusinessEntityID
WHERE E.Gender = 'M' AND ST.[Group] = 'Europe'
ORDER BY SP.Bonus;


-- Lab 3-4

select Year, CustomerID, round(TotalSale, 2) [Total Sales], OrderCount 'Order Count' from
(
  select year(OrderDate) Year, CustomerID, sum(TotalDue) TotalSale, count(SalesOrderID) OrderCount,
         rank() over (partition by year(OrderDate) order by sum(TotalDue) desc) as rank
  from Sales.SalesOrderHeader
  group by year(OrderDate), CustomerID) temp
where rank =1
order by Year;


-- Lab 3-5

SELECT cast(OrderDate as date) Date,
       sum(OrderQty) TotalProductQuantitySold
FROM Sales.SalesOrderHeader so
JOIN Sales.SalesOrderDetail sd
ON so.SalesOrderID = sd.SalesOrderID
WHERE OrderDate NOT IN
(SELECT OrderDate
 FROM Sales.SalesOrderHeader sh
 JOIN Sales.SalesOrderDetail sd
      ON sh.SalesOrderID = sd.SalesOrderID
 JOIN Production.Product p
      ON p.ProductID = sd.ProductID
 WHERE p.Color = 'Red')
GROUP BY OrderDate
ORDER BY TotalProductQuantitySold desc;


