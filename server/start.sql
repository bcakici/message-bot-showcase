-- DELETE FROM MESSAGE;
-- DELETE FROM MESSAGEBOX;
-- DELETE FROM BOTCONVERSATION;

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

-- DROP VIEW DASHBOARD;
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
)
SELECT
	*
FROM
	MessageBox mb
	LEFT JOIN outOfFive oof ON mb.id = oof.messageBox;