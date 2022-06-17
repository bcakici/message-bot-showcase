from datetime import datetime
import time
import sqlite3

def triggerThankYou(triggerMessage):

	# sleep to make it look more natural, otherwise the bot will reply immediately
	# later make this asynchroneous
	time.sleep(0.7)

	question = {
		"text": "Would you like to review this service out of 5?",
		"date": datetime.now().isoformat(),
		"customerID": triggerMessage["customerID"],
		"messageBox": triggerMessage["messageBox"],
		"isCustomer": False,
		"isBot": True
	}

	con = sqlite3.connect('db.sqlite')
	cur = con.cursor()
	query = cur.execute("INSERT INTO message (customerID, text, date, isCustomer, isBot, messageBox) \
		VALUES (:customerID, :text, :date, :isCustomer, :isBot, :messageBox)", question)
	
	con.commit()

	question["id"] = query.lastrowid

	botConversation = {
		"triggerID": triggerMessage["id"],
		"questionID": question["id"],
		"messageBox": triggerMessage["messageBox"],
		"rule": "THANK_YOU",
	}

	# con.set_trace_callback(print)

	cur.close()
	cur = con.cursor()
	cur.execute("INSERT INTO botconversation (triggerID, questionID, messageBox, rule) \
		VALUES (:triggerID, :questionID, :messageBox, :rule)", botConversation)

	con.commit()