CREATE TABLE Message (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	messageBox text,
	text text,
	date text,
	isCustomer INTEGER,
	isBot INTEGER
);

CREATE TABLE MessageBox (
	id text PRIMARY KEY,
	customer text,
	date text,
	isTransactionCompleted text
);

CREATE TABLE BotConversation (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	date text,
	messageBox text,
	triggerID INTEGER,
	questionID INTEGER,
	answerID INTEGER,
	feedbackID INTEGER,
	rule text,
	processedData text
);

CREATE VIEW Dashboard AS WITH outOfFive AS (
	SELECT
		messageBox,
		date,
		processedData as outOfFive
	FROM
		BotConversation
	WHERE
		rule IS "THANK_YOU"
		AND processedData IS NOT NULL
	ORDER BY
		date DESC
), withTransactionNotes AS (
	SELECT
		messageBox,
		date,
		processedData as transactionNote
	FROM
		BotConversation
	WHERE
		rule IS "COMPLETED_TRANSACTION"
		AND processedData IS NOT NULL
	ORDER BY
		date DESC
), lastTenNeedsOrder AS
(SELECT
	*
FROM
	MessageBox mb
	LEFT JOIN outOfFive oof ON mb.id = oof.messageBox
	LEFT JOIN withTransactionNotes wtn ON mb.id = wtn.messageBox
	ORDER BY date DESC LIMIT 10) 
SELECT * FROM lastTenNeedsOrder ORDER BY date ASC;