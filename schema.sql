
DROP DATABASE IF EXISTS booking;

CREATE DATABASE booking;

USE booking;


CREATE TABLE apartment (

	id int NOT NULL AUTO_INCREMENT,
	apartmentid int NOT NULL,
	price int NOT NULL,
    max int NOT NULL,
    minStay int NOT NULL,
    stars dec(4,2) NOT NULL,
    numRatings int NOT NULL,
	PRIMARY KEY (id)

);

CREATE TABLE dates (

	id int NOT NULL AUTO_INCREMENT,
	date varchar (20) NOT NULL,
	apartment_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (apartment_id)
		REFERENCES apartment (id)

);


INSERT INTO apartment (apartmentid, price, minStay, stars, numRatings, max)
   VALUES
   ("9873001" ,"40", "4", "4.83", "78", "4"),
   ("9873002" ,"55", "6", "4.5", "23", "3"),
   ("9873003" ,"90", "3", "4.95", "125", "5");             

INSERT INTO dates (date, apartment_id)
   VALUES
   ("2018/12/01", (SELECT id from apartment WHERE apartmentid = "9873001")),
   ("2018/12/02", (SELECT id from apartment WHERE apartmentid = "9873001")),
   ("2018/12/04", (SELECT id from apartment WHERE apartmentid = "9873001")),
   ("2018/12/06", (SELECT id from apartment WHERE apartmentid = "9873001")),
   ("2018/12/05", (SELECT id from apartment WHERE apartmentid = "9873002")),
   ("2018/12/10", (SELECT id from apartment WHERE apartmentid = "9873003")),
   ("2018/12/12", (SELECT id from apartment WHERE apartmentid = "9873003"));