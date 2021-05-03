CREATE DATABASE "g6";
GO

USE "g6";

CREATE SCHEMA Book;

CREATE TABLE Book.Comment
		(
		CommentID int NOT NULL PRIMARY KEY,
		BooksID int NOT NULL REFERENCES Book.BookInformation(BooksID),
		Comment varchar(40)
		);
CREATE TABLE Book.BookInformation
		(
		BooksID int NOT NULL PRIMARY KEY,
		BooksISBN varchar(255) NOT NULL,
		BooksName varchar(255) NOT NULL,
		AuthorsID int NOT NULL REFERENCES Book.AuthorInformation(AuthorsID),
		PublishingHouse varchar(60) NOT NULL REFERENCES Book.PublishingHouse(PublishingHouse),
		BooksTypeID int NOT NULL REFERENCES Book.BookType(BooksTypeID),
		AvailableStatus varchar(40) NOT NULL
		);
CREATE TABLE Book.AuthorInformation
		(
		AuthorsID int NOT NULL PRIMARY KEY,
		FirstName varchar(40) NOT NULL,
		LastName varchar(40) NOT NULL,
		Gender varchar(40) NOT NULL,
		Nationality varchar(40) NOT NULL
		);
CREATE TABLE Book.BookType
		(
		BooksTypeID int NOT NULL PRIMARY KEY,
		Information varchar(40) NOT NULL
		);
CREATE TABLE Book.PublishingHouse
		(
		PublishingHouse varchar(60) NOT NULL PRIMARY KEY,
		Address1 varchar(60) NOT NULL,
		Address2 varchar(60) NOT NULL,
		ContactNumber int NOT NULL
		);

CREATE SCHEMA Rental;

CREATE TABLE Rental.BookCopy
		(
		CopyID int NOT NULL PRIMARY KEY,
		BooksID int NOT NULL REFERENCES Book.BookInformation(BooksID),
		Availability int,
		Location varchar(40) NOT NULL
		);
CREATE TABLE Rental.LibraryStaff
		(
		StaffID int NOT NULL PRIMARY KEY,
		FirstName varchar(40) NOT NULL,
		LastName varchar(40) NOT NULL,
		ConcatNumber int NOT NULL
		);

CREATE TABLE Rental.Render
		(
		ReturnID int NOT NULL IDENTITY PRIMARY KEY,
		CopyID int NOT NULL REFERENCES Rental.BookCopy(CopyID),
		StudentID int NOT NULL REFERENCES Student.StudentInformation(StudentID),
		DueDate DATE not null,
		RenderDate DATE,
		OverDue as DATEDIFF(day,DueDate,isnull(RenderDate,DueDate))
		);

CREATE TABLE Rental.Rental
		(
		RentalID int NOT NULL IDENTITY PRIMARY KEY,
		StudentID int NOT NULL REFERENCES Student.StudentInformation(StudentID),
		CopyID int NOT NULL REFERENCES Rental.BookCopy(CopyID),
		StaffID int NOT NULL REFERENCES Rental.LibraryStaff(StaffID),
		RentalDate date not null,
		DueDate as (DATEADD(day,30,RentalDate))
		);	

CREATE SCHEMA Student;

CREATE TABLE Student.StudentInformation
		(
		StudentID int NOT NULL PRIMARY KEY,
		FirstName varchar(40) NOT NULL,
		LastName varchar(40) NOT NULL,
		Gender varchar(40) NOT NULL,
		ContactNumber int NOT NULL,
		EmailAddress varchar(40) NOT NULL,
		College varchar(40) NOT NULL REFERENCES Student.CollegeInformation(College),
		CardNumber int NOT NULL REFERENCES Student.CardInformation(CardNumber)
		);
CREATE TABLE Student.CardInformation
		(
		CardNumber int NOT NULL PRIMARY KEY,
		Password varchar(20) NOT NULL,
		CardStatus varchar(20) NOT NULL
		);
CREATE TABLE Student.CollegeInformation
		(
		College varchar(40) NOT NULL PRIMARY KEY,
		Address1 varchar(60) NOT NULL,
		Address2 varchar(60) NOT NULL,
		ContactNumber int NOT NULL
		);

	
	
--Inserting DueDate while Rental.Rental is inserting
create trigger Rental.updateDueDate
on Rental.Rental
after INSERT
AS
BEGIN
	insert into Rental.Render (CopyID,StudentID,DueDate) 
	select CopyID, StudentID, DueDate from inserted;
END

drop trigger if exists Rental.updateDueDate;	
	
--Update Book Copy Availability
CREATE PROCEDURE Rental.updtavailability
AS 
BEGIN
	UPDATE Rental.BookCopy 
	SET Availability = 0
	WHERE CopyID IN (SELECT CopyID FROM Rental.Rental) 
	AND CopyID NOT IN (SELECT CopyID FROM Rental.Render)
END;

exec Rental.updtavailability;

-- when a student returns a book, call this procedure to update Rental.Render.
create PROCEDURE Rental.setReturnDate 
@CopyID int, 
@StudentID int
AS
BEGIN
	update Rental.Render
	set RenderDate = GETDATE() 
	where CopyID = @CopyID and StudentID = @StudentID
END

-- Test
exec Rental.setReturnDate 61, 2108;


-- Prevent renting when OverDue is greater than 0
CREATE FUNCTION Rental.CheckDuedate (@StID int)
RETURNS SMALLINT
AS
BEGIN
    DECLARE @Count SMALLINT = 0;
    SELECT @Count = COUNT(re.StudentID)
    FROM Rental.Render re
    WHERE re.StudentID = @StID
        AND re.OverDue > 0;
    RETURN @Count;
END;
ALTER TABLE Rental.Rental ADD CONSTRAINT BanOverdue CHECK (Rental.CheckDuedate(StudentID) = 0);
--Drop constraint and function
ALTER TABLE Rental.Rental DROP CONSTRAINT BanOverdue
DROP FUNCTION CheckDuedate


-- Prevent renting when Availability is 0
CREATE FUNCTION Rental.CheckAvailability (@CpID int)
RETURNS SMALLINT
AS
BEGIN
    DECLARE @Count SMALLINT = 0;
    SELECT @Count = COUNT(bc.CopyID)
    FROM Rental.BookCopy bc 
    WHERE bc.CopyID = @CpID
        AND bc.Availability = 0;
    RETURN @Count;
END;
ALTER TABLE Rental.Rental ADD CONSTRAINT NotAvailable CHECK (Rental.CheckAvailability(CopyID) = 0);
--Drop constraint and function
ALTER TABLE Rental.Rental DROP CONSTRAINT NotAvailable
DROP FUNCTION Rental.CheckAvailability


-- Ban if card is inactivated.
CREATE FUNCTION Rental.CheckCardStatus (@SID varchar(30))
RETURNS smallint
AS
BEGIN
   DECLARE @Count smallint=0;
   SELECT @Count = COUNT(StudentID) 
          FROM (SELECT StudentID
        FROM Student.StudentInformation si
        JOIN Student.CardInformation ci
        ON si.CardNumber = ci.Cardnumber
        WHERE ci.CardStatus = 'inactivated') a
          WHERE StudentID = @SID;
   RETURN @Count;
END;

ALTER TABLE Rental.Rental ADD CONSTRAINT BanInactiveCard CHECK (Rental.CheckCardStatus(StudentID) = 0);

--Ban inactivited card 
INSERT INTO Rental.Rental (RentalID,StudentID,CopyID,StaffID,RentalDate,DueDate)
VALUES (1010,2107,65,118,'2020-03-18','2020-04-17');

--Allow activite card 
INSERT INTO Rental.Rental (RentalID,StudentID,CopyID,StaffID,RentalDate,DueDate)
VALUES (1010,2108,61,118,'2020-03-18','2020-04-17');


-- Password

-- Create DMK
CREATE MASTER KEY
ENCRYPTION BY PASSWORD = 'Test_P@sswOrd';

-- Create certificate to protect symmetric key
CREATE CERTIFICATE TestCertificate
WITH SUBJECT = 'Card Information password',
EXPIRY_DATE = '2021-10-01';

-- Create symmetric key to encrypt data
CREATE SYMMETRIC KEY TestSymmetricKey
WITH ALGORITHM = AES_128
ENCRYPTION BY CERTIFICATE TestCertificate;

-- Open symmetric key
OPEN SYMMETRIC KEY TestSymmetricKey
DECRYPTION BY CERTIFICATE TestCertificate;


--upload new encrypt version of password
UPDATE Student.CardInformation
SET [Password] = EncryptByKey(Key_GUID(N'TestSymmetricKey'),convert(varbinary, 'zz1xzd'))
WHERE CardNumber = 12350;


SELECT * FROM Student.CardInformation;

SELECT CardNumber,convert(varchar,DECRYPTBYKEY([Password])) AS [Password],CardStatus
FROM Student.CardInformation;


/*CREATE VIEW*/
CREATE VIEW Student.[Students' rental information ] AS 
SELECT si.College, si.StudentID, si.FirstName, si.LastName, 
		si.Gender, bi.BooksName, r.RentalDate, r.DueDate
FROM (
		(
		Student.StudentInformation si 
		INNER JOIN Rental.Rental r 
		ON si.StudentID = r.StudentID 
		) 
		INNER JOIN Rental.BookCopy bc 
		ON r.CopyID = bc.CopyID
	) 
INNER JOIN Book.BookInformation bi 
ON bc.BooksID = bi.BooksID;

SELECT * FROM Student.[Students' rental information ]
ORDER BY College, StudentID;

CREATE VIEW Book.[Computer Application Book Rental Information] AS 
SELECT bt.Information, bi.BooksName, si.FirstName, si.LastName, si.College 
FROM (((Book.BookType bt INNER JOIN Book.BookInformation bi ON bt.BooksTypeID = bi.BooksTypeID ) INNER JOIN Rental.BookCopy bc ON bi.BooksID = bc.BooksID ) INNER JOIN Rental.Rental r ON bc.CopyID = r.CopyID ) INNER JOIN Student.StudentInformation si ON r.StudentID = si.StudentID 
WHERE bt.BooksTypeID = 2;
SELECT * FROM Book.[Computer Application Book Rental Information]
ORDER BY College;

CREATE VIEW Book.[Comic Rental Information] AS
SELECT bt.Information, bi.BooksName, si.FirstName, si.LastName, si.College 
FROM (((Book.BookType bt INNER JOIN Book.BookInformation bi ON bt.BooksTypeID = bi.BooksTypeID ) INNER JOIN Rental.BookCopy bc ON bi.BooksID = bc.BooksID ) INNER JOIN Rental.Rental r ON bc.CopyID = r.CopyID ) INNER JOIN Student.StudentInformation si ON r.StudentID = si.StudentID 
WHERE bt.BooksTypeID = 1;
SELECT * FROM Book.[Comic Rental Information]
ORDER BY College;

CREATE VIEW Book.[Civil Engineering Book Rental Informaion] AS
SELECT bt.Information, bi.BooksName, si.FirstName, si.LastName, si.College 
FROM (((Book.BookType bt INNER JOIN Book.BookInformation bi ON bt.BooksTypeID = bi.BooksTypeID ) INNER JOIN Rental.BookCopy bc ON bi.BooksID = bc.BooksID ) INNER JOIN Rental.Rental r ON bc.CopyID = r.CopyID ) INNER JOIN Student.StudentInformation si ON r.StudentID = si.StudentID 
WHERE bt.BooksTypeID = 3;
SELECT * FROM Book.[Civil Engineering Book Rental Informaion]
ORDER BY College;

CREATE VIEW Book.[Management Book Rental Information] AS 
SELECT bt.Information, bi.BooksName, si.FirstName, si.LastName, si.College 
FROM (((Book.BookType bt INNER JOIN Book.BookInformation bi ON bt.BooksTypeID = bi.BooksTypeID ) INNER JOIN Rental.BookCopy bc ON bi.BooksID = bc.BooksID ) INNER JOIN Rental.Rental r ON bc.CopyID = r.CopyID ) INNER JOIN Student.StudentInformation si ON r.StudentID = si.StudentID 
WHERE bt.BooksTypeID = 4;
SELECT * FROM Book.[Management Book Rental Information]
ORDER BY College;





/*INSERT DATA*/
/*
*Book
*Including AuthorInformation, BookInformation, BookType, Comment, PublishingHouse
 */
-- AuthorInformation
INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1111,'Alan','Moore','Male','U.S.');

INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1112,'Mark','Waid','Male','U.S.');

INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1113,'Junji','Ito','Male','Japan');

INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1114,'Alessio','Pipinato','Female','Israel');

INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1115,'Galit','Shmueli','Female','Israel');

INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1116,'Thomas','Connoly','Male','U.S.');

INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1117,'Wilfried','Lemahieu','Male','Belgium');

INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1118,'Jack','Meredith','Male','U.S.');

INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1119,'Dušan','Petkovi?','Male','German');

INSERT INTO Book.AuthorInformation (AuthorsID,FirstName,LastName,Gender,Nationality)
VALUES (1120,'Richard','Daft','Male','U.S.');

UPDATE Book.AuthorInformation 
SET FirstName = 'Alessio', LastName = 'Pipinato', Gender = 'Male', Nationality = 'U.S.'
WHERE AuthorsID = 1115;
SELECT * FROM Book.AuthorInformation ai ;

-- BookInformation
SELECT * FROM Book.BookInformation bi ;
INSERT INTO Book.BookInformation 
VALUES (11,'9781401294052','The Killing Joke',1111,'DC Comics',01,'Available');

INSERT INTO Book.BookInformation (BooksID,BooksISBN,BooksName,AuthorsID,PublishingHouse,BooksTypeID,AvailableStatus)
VALUES (12,'9781401220341','Kingdom Come',1112,'DC Comics',01,'Available');

INSERT INTO Book.BookInformation (BooksID,BooksISBN,BooksName,AuthorsID,PublishingHouse,BooksTypeID,AvailableStatus)
VALUES (13,'9781974707096','No Longer Human',1113,'Viz Media',01,'Available');

INSERT INTO Book.BookInformation (BooksID,BooksISBN,BooksName,AuthorsID,PublishingHouse,BooksTypeID,AvailableStatus)
VALUES (14,'9781118879368','Data Mining Foe Business Analytics',1114,'Wiley',02,'Available');

INSERT INTO Book.BookInformation (BooksID,BooksISBN,BooksName,AuthorsID,PublishingHouse,BooksTypeID,AvailableStatus)
VALUES (15,'9780128235508','Innovative Bridge Design Handbook',1115,'Butterworth Heinemann',03,'Available');

INSERT INTO Book.BookInformation 
VALUES (16,'9780132943260','Database Systems-A Practical Approach to Design Implementation and Management',1116,'Pearson Education',02,'Available');

INSERT INTO Book.BookInformation (BooksID,BooksISBN,BooksName,AuthorsID,PublishingHouse,BooksTypeID,AvailableStatus)
VALUES (17,'9781107186124','Principles Of DataBase Management',1117,'Cambridge University Press',02,'Available');

INSERT INTO Book.BookInformation (BooksID,BooksISBN,BooksName,AuthorsID,PublishingHouse,BooksTypeID,AvailableStatus)
VALUES (18,'9781119369096','Project Management-A strategic Managerial Approach',1118,'Wiley',04,'Available');

INSERT INTO Book.BookInformation (BooksID,BooksISBN,BooksName,AuthorsID,PublishingHouse,BooksTypeID,AvailableStatus)
VALUES (19,'9781259641800','Microsoft SQL Server 2016-A beginner Guide',1119,'codeMantra',02,'Available');

INSERT INTO Book.BookInformation (BooksID,BooksISBN,BooksName,AuthorsID,PublishingHouse,BooksTypeID,AvailableStatus)
VALUES (20,'9781285861982','Management',1120,'South-Western College Pub',04,'Available');

-- PublishingHouse
INSERT INTO Book.PublishingHouse 
VALUES ('DC Comics','NY','1700 Broad Way',516);
INSERT INTO Book.PublishingHouse 
VALUES ('Viz Media','SF','1355 Market Street Suite 200',546);
INSERT INTO Book.PublishingHouse 
VALUES ('Wiley','NJ','111 River Street',748);
INSERT INTO Book.PublishingHouse 
VALUES ('Butterworth Heinemann','Oxford','Linacre House',441);
INSERT INTO Book.PublishingHouse 
VALUES ('Cambridge University Press','NY','One Liberty Plaza,20th Floor',442);
INSERT INTO Book.PublishingHouse 
VALUES ('codeMantra','Burlington','1500 District Ave',769);
INSERT INTO Book.PublishingHouse 
VALUES ('South-Western College Pub','Cincinnati','632 Vine St Ste 200',213);
INSERT INTO Book.PublishingHouse 
VALUES ('Pearson Education','BO','501 Boylston',617);
SELECT * FROM Book.PublishingHouse ph ;

-- BookType
INSERT INTO Book.BookType 
VALUES (01,'Comic');
INSERT INTO Book.BookType 
VALUES (02,'Computer Application');
INSERT INTO Book.BookType 
VALUES (03,'Civil Engineering');
INSERT INTO Book.BookType 
VALUES (04,'Management');
SELECT * FROM Book.BookType bt ;

-- Comment
INSERT INTO Book.Comment
VALUES 
(101, 11, 'Good'),
(102, 12, 'Perfect'),
(103, 13,'Not Bad'),
(104, 14, 'Awesome!'),
(105, 15, 'I like this comic!'),
(106, 16, 'It is very helpful to my study'),
(107, 17, 'A good book'),
(108, 18, 'It is very helpful'),
(109, 19, 'Boring'),
(110, 20, 'Perfect');
SELECT * FROM Book.Comment;


/*
 * Rental
 *Including BookCopy, LibraryStaff, Render, Rental
 */

 -- LibraryStaff
 INSERT INTO Rental.LibraryStaff 
 VALUES (111,'Bethany','Patrick',123);
 INSERT INTO Rental.LibraryStaff 
 VALUES (112,'Celia','Moody',124);
 INSERT INTO Rental.LibraryStaff 
 VALUES (113,'David','Howell',125);
 INSERT INTO Rental.LibraryStaff 
 VALUES (114,'Stella','Moreno',126);
 INSERT INTO Rental.LibraryStaff 
 VALUES (115,'Ernestine','Collier',127);
 INSERT INTO Rental.LibraryStaff 
 VALUES (116,'Josephine','Knight',128);
 INSERT INTO Rental.LibraryStaff 
 VALUES (117,'Rene','Bates',129);
 INSERT INTO Rental.LibraryStaff 
 VALUES (118,'Ramona','Wilkerson',130);
 INSERT INTO Rental.LibraryStaff 
 VALUES (119,'Mario','Sharp',131);
 INSERT INTO Rental.LibraryStaff 
 VALUES (120,'Phil','Pratt',132);
SELECT * FROM Rental.LibraryStaff ls ;

--BookCopy
-- Note that in the 'Availability' column '1' for 'available', '0' for unavailable.
SELECT * FROM Rental.BookCopy bc ;
INSERT INTO Rental.BookCopy 
VALUES(11,11,1,'A1');
INSERT INTO Rental.BookCopy 
VALUES(12,11,1,'A1');
INSERT INTO Rental.BookCopy 
VALUES(13,11,1,'A1');
INSERT INTO Rental.BookCopy 
VALUES(21,12,1,'A1');
INSERT INTO Rental.BookCopy 
VALUES(22,12,1,'A1');
INSERT INTO Rental.BookCopy 
VALUES(23,12,1,'A1');
INSERT INTO Rental.BookCopy 
VALUES(31,13,1,'A1');
INSERT INTO Rental.BookCopy 
VALUES(32,13,1,'A1');
INSERT INTO Rental.BookCopy 
VALUES(33,13,1,'A1');
INSERT INTO Rental.BookCopy 
VALUES(41,14,1,'B2')
	 ,(42,14,1,'B2')
	 ,(43,14,1,'B2')
	 ,(51,15,1,'C1')
	 ,(52,15,1,'C1')
	 ,(53,15,1,'C1')
	 ,(61,16,1,'B3')
	 ,(62,16,1,'B3')
	 ,(63,16,1,'B3')
	 ,(71,17,1,'B1')
	 ,(72,17,1,'B1')
	 ,(73,17,1,'B1')
	 ,(81,18,1,'D1')
	 ,(82,18,1,'D1')
	 ,(83,18,1,'D1')
	 ,(91,19,1,'B4')
	 ,(92,19,1,'B4')
	 ,(93,19,1,'B4')
	 ,(101,20,1,'D2')
	 ,(102,20,1,'D2')
	 ,(103,20,1,'D2');


-- Rental	
insert into Rental.Rental (StudentID,CopyID,StaffID,RentalDate)
values
  (2102,52,112,'2020-01-02'),
  (2102,11,112,'2020-01-02'),
  (2101,61,114,'2020-01-05'),
  (2101,71,114,'2020-01-05'),
  (2101,21,114,'2020-01-05'),
  (2101,51,114,'2020-01-05'),
  (2105,62,116,'2020-01-06'),
  (2105,31,116,'2020-01-06'),
  (2106,63,116,'2020-01-06'),
  (2106,33,116,'2020-01-06'),
  (2110,21,117,'2020-03-15'),
  (2104,32,119,'2020-03-17'),
  (2102,92,115,'2020-08-05'),
  (2108,61,114,'2021-01-05');


/*
 *Student 
 */
-- CardInformation
INSERT INTO Student.CardInformation 
VALUES(12345,'zzasd','Active');
INSERT INTO Student.CardInformation 
VALUES(12341,'zzssd','Active');
INSERT INTO Student.CardInformation 
VALUES(12342,'zzqsd','Active');
INSERT INTO Student.CardInformation 
VALUES(12343,'zzrtsd','Active');
INSERT INTO Student.CardInformation 
VALUES(12344,'zzbsd','Active');
INSERT INTO Student.CardInformation 
VALUES(12346,'zzcxsd','Active');
INSERT INTO Student.CardInformation 
VALUES(12347,'zzvbsd','Active');
INSERT INTO Student.CardInformation 
VALUES(12348,'zzvbsd','Active');
INSERT INTO Student.CardInformation 
VALUES(12349,'zbvzsd','Active');
INSERT INTO Student.CardInformation 
VALUES(12350,'zzbversd','Active');
SELECT * FROM Student.CardInformation ci ;


--CollegeInformation
INSERT INTO Student.CollegeInformation 
VALUES ('Engineering','BO','360 Huntington Ave',617);
INSERT INTO Student.CollegeInformation 
VALUES ('CS','BO','361 Huntington Ave',618);
INSERT INTO Student.CollegeInformation 
VALUES ('Health','BO','362 Huntington Ave',619);
INSERT INTO Student.CollegeInformation 
VALUES ('Business','BO','363 Huntington Ave',620);
INSERT INTO Student.CollegeInformation 
VALUES ('Art','BO','360 Huntington Ave',621);
SELECT * FROM Student.CollegeInformation ci ;

--StudentInformation
INSERT INTO Student.StudentInformation 
VALUES (2101,'John','Wick','Male',511,'jw@gmail.com','Engineering',12341);
INSERT INTO Student.StudentInformation 
VALUES (2102,'Michael','Townly','Male',512,'mt@gmail.com','Engineering',12342)
	  ,(2103,'Trever','Philips','Male',513,'tp@gmail.com','CS',12343)
	  ,(2104,'Franklin','Deo','Male',514,'fd@gmail.com','CS',12344)
	  ,(2105,'Beyoneta','Beth','Female',515,'bb@gmail.com','Art',12345)
	  ,(2106,'Jill','Valentine','Femail',516,'jv@gmail.com','Business',12346)
	  ,(2107,'Chris','Redfield','Male',517,'cr@gmail.com','Health',12347)
	  ,(2108,'Laura','Croft','Female',518,'lc@gmail.com','Business',12348)
	  ,(2109,'Nathen','Drake','Male',519,'nd@gmail.com','Engineering',12349)
	  ,(2110,'Sam','Bridges','Male',520,'sam@gmail.com','Engineering',12350);
SELECT * FROM Student.StudentInformation si ;







