from datetime import datetime
import time
import sqlite3

def processMessage(message):
	# if messager is not programmer exit subroutine
	if not message["isCustomer"]:
		return

	con = sqlite3.connect('db.sqlite')

	# check if bot is waiting for a response
	con.row_factory = sqlite3.Row
	botConversation = con.execute("SELECT * FROM botconversation \
		WHERE answerID IS NULL and messageBox IS ?", (message["messageBox"],)).fetchone()

	if botConversation is not None:
		answerMessage = dict(message)

		# if rule is thank you
		if botConversation["rule"] == "THANK_YOU":

			# sleep to make it look more natural, otherwise the bot will reply immediately
			# later make this asynchroneous
			time.sleep(0.7)
			
			# give feedback to customer
			feedbackMessage = {
				"text": "Thank you for your feedback!",
				"date": datetime.now().isoformat(),
				"customerID": answerMessage["customerID"],
				"messageBox": answerMessage["messageBox"],
				"isCustomer": False,
				"isBot": True
			}

			cur = con.cursor()
			query = cur.execute("INSERT INTO message (customerID, text, date, isCustomer, isBot, messageBox) \
				VALUES (:customerID, :text, :date, :isCustomer, :isBot, :messageBox)", feedbackMessage)
			con.commit()
			feedbackMessage["id"] = query.lastrowid

			botConversation = dict(botConversation)

			# update botconversation with both answer and feedback id
			botConversation["feedbackID"] = feedbackMessage["id"]
			botConversation["answerID"] = answerMessage["id"]
			
			cur.close()
			cur = con.cursor()
			cur.execute("UPDATE botconversation SET answerID = :answerID, feedbackID = :feedbackID WHERE id = :id",
				botConversation)

			con.commit()

	# THANK_YOU RULE
	elif message["isCustomer"] and "thank you".casefold() in message["text"].casefold():
		triggerMessage = dict(message)

		# sleep to make it look more natural, otherwise the bot will reply immediately
		# later make this asynchroneous
		time.sleep(0.7)

		question = {
			"text": "Would you like to review this service?",
			"date": datetime.now().isoformat(),
			"customerID": triggerMessage["customerID"],
			"messageBox": triggerMessage["messageBox"],
			"isCustomer": False,
			"isBot": True
		}

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
	
	return