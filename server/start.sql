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
	isTransactionCompleted text
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

CREATE VIEW Dashboard AS WITH outOfFive AS (
	SELECT
		messageBox,
		processedData as outOfFive
	FROM
		BotConversation
	WHERE
		rule IS "THANK_YOU"
		AND processedData IS NOT NULL
)
SELECT
	*
FROM
	MessageBox mb
	LEFT JOIN outOfFive oof ON mb.id = oof.messageBox;