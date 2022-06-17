CREATE TABLE Message (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	customerID INTEGER,
	messageBox text,
	text text,
	date text,
	isCustomer INTEGER,
	isBot INTEGER
);

CREATE TABLE BotConversation (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	messageBox text,
	triggerID INTEGER,
	questionID INTEGER,
	answerID INTEGER,
	feedbackID INTEGER,
	rule text,
	processedData text
);

CREATE TABLE Customer (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name text
);