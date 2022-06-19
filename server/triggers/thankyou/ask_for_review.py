from datetime import datetime
import time
import sqlite3

def ask_for_review(trigger_message):

	# sleep to make it look more natural, otherwise the bot will reply immediately
	# later make this asynchroneous
	time.sleep(0.7)

	question = {
		"text": "Would you like to review this service out of 5?",
		"date": datetime.now().isoformat(),
		"messageBox": trigger_message["messageBox"],
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
		"triggerID": trigger_message["id"],
		"questionID": question["id"],
		"messageBox": trigger_message["messageBox"],
		"rule": "THANK_YOU",
		"date": datetime.now().isoformat()
	}

	# con.set_trace_callback(print)

	cur.close()
	cur = con.cursor()
	cur.execute("INSERT INTO botconversation (triggerID, questionID, messageBox, rule, date) \
		VALUES (:triggerID, :questionID, :messageBox, :rule, :date)", botConversation)

	con.commit()