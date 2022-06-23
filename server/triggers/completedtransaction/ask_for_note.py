from datetime import datetime
import time
import sqlite3

def ask_for_note(message_box):

	# sleep to make it look more natural, otherwise the bot will reply immediately
	# later make this asynchroneous
	time.sleep(0.7)

	question = {
		"text": "Hello, it looks like your transaction is completed. Would you like to give us feedback on this service?",
		"date": datetime.now().isoformat(),
		"messageBox": message_box,
		"isCustomer": False,
		"isBot": True
	}

	con = sqlite3.connect('db.sqlite')
	cur = con.cursor()
	query = cur.execute("INSERT INTO message (text, date, isCustomer, isBot, messageBox) \
		VALUES (:text, :date, :isCustomer, :isBot, :messageBox)", question)
	
	con.commit()

	question["id"] = query.lastrowid

	botConversation = {
		"questionID": question["id"],
		"messageBox": message_box,
		"rule": "COMPLETED_TRANSACTION",
		"date": datetime.now().isoformat()
	}

	cur.close()
	cur = con.cursor()
	cur.execute("INSERT INTO botconversation (questionID, messageBox, rule, date) \
		VALUES (:questionID, :messageBox, :rule, :date)", botConversation)

	con.commit()