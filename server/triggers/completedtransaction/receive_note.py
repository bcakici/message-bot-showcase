from datetime import datetime
import time
import sqlite3

def receive_note(answer_message, bot_conversation):

	text = answer_message["text"]

	if len(text) > 4:
	
		# give feedback to customer
		feedbackMessage = {
			"text": "Thank you for your feedback note!",
			"date": datetime.now().isoformat(),
			"messageBox": answer_message["messageBox"],
			"isCustomer": False,
			"isBot": True
		}

		con = sqlite3.connect('db.sqlite')
		cur = con.cursor()
		query = cur.execute("INSERT INTO message (text, date, isCustomer, isBot, messageBox) \
			VALUES (:text, :date, :isCustomer, :isBot, :messageBox)", feedbackMessage)
		con.commit()
		feedbackMessage["id"] = query.lastrowid

		# update bot_conversation with both answer and feedback id
		bot_conversation["feedbackID"] = feedbackMessage["id"]
		bot_conversation["answerID"] = answer_message["id"]
		bot_conversation["processedData"] = text
		
		cur.close()
		cur = con.cursor()
		cur.execute("UPDATE botConversation SET answerID = :answerID, feedbackID = :feedbackID, \
			processedData = :processedData WHERE id = :id",
			bot_conversation)

		con.commit()

	# if feedback is too short, ask again
	else:
		
		# give feedback to customer to try again
		feedbackMessage = {
			"text": "Sorry, your feedback is too short, please try again with a longer feedback.",
			"date": datetime.now().isoformat(),
			"messageBox": answer_message["messageBox"],
			"isCustomer": False,
			"isBot": True
		}

		con = sqlite3.connect('db.sqlite')
		cur = con.cursor()
		query = cur.execute("INSERT INTO message (text, date, isCustomer, isBot, messageBox) \
			VALUES (:text, :date, :isCustomer, :isBot, :messageBox)", feedbackMessage)

		con.commit()