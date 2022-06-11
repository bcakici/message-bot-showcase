CREATE TABLE Message (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	customerID INTEGER,
	messageBox text,
	text text, 
	date text, 
	isCustomer INTEGER, 
	isBot INTEGER 
);

CREATE TABLE Review (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	customerID INTEGER,
	outOf5 INTEGER
);

CREATE TABLE Customer (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name text
);