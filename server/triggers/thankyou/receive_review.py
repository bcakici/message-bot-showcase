from datetime import datetime
import time
import sqlite3

def receive_review(answer_message, bot_conversation):

	# sleep to make it look more natural, otherwise the bot will reply immediately
	# later make this asynchroneous
	time.sleep(0.7)

	text = answer_message["text"]

	# get only the number from text
	processed_text = text.replace("$", "")

	# if there is a number and if number is in range complete bot conversation
	if processed_text.isdigit() and int(processed_text) <= 5:
	
		# give feedback to customer
		feedbackMessage = {
			"text": "Thank you for your feedback!",
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
		bot_conversation["processedData"] = processed_text
		
		cur.close()
		cur = con.cursor()
		cur.execute("UPDATE botConversation SET answerID = :answerID, feedbackID = :feedbackID, \
			processedData = :processedData WHERE id = :id",
			bot_conversation)

		con.commit()

	# if there is no number or number is not in range
	else:
		
		# give feedback to customer to try again
		feedbackMessage = {
			"text": "Sorry, I did not understand your feedback. Please try again.",
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