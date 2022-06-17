from datetime import datetime
import time
import sqlite3

def replyThankYou(answerMessage, botConversation):

	# sleep to make it look more natural, otherwise the bot will reply immediately
	# later make this asynchroneous
	time.sleep(0.7)

	text = answerMessage["text"]

	# get only the number from text
	processedText = text.replace("$", "")

	# if there is a number and if number is in range complete bot conversation
	if processedText.isdigit() and int(processedText) <= 5:
	
		# give feedback to customer
		feedbackMessage = {
			"text": "Thank you for your feedback!",
			"date": datetime.now().isoformat(),
			"customerID": answerMessage["customerID"],
			"messageBox": answerMessage["messageBox"],
			"isCustomer": False,
			"isBot": True
		}

		con = sqlite3.connect('db.sqlite')
		cur = con.cursor()
		query = cur.execute("INSERT INTO message (customerID, text, date, isCustomer, isBot, messageBox) \
			VALUES (:customerID, :text, :date, :isCustomer, :isBot, :messageBox)", feedbackMessage)
		con.commit()
		feedbackMessage["id"] = query.lastrowid

		# update botconversation with both answer and feedback id
		botConversation["feedbackID"] = feedbackMessage["id"]
		botConversation["answerID"] = answerMessage["id"]
		
		cur.close()
		cur = con.cursor()
		cur.execute("UPDATE botconversation SET answerID = :answerID, feedbackID = :feedbackID WHERE id = :id",
			botConversation)

		con.commit()

	# if there is no number or number is not in range
	else:
		
		# give feedback to customer
		feedbackMessage = {
			"text": "Sorry, I did not understand your feedback. Please try again.",
			"date": datetime.now().isoformat(),
			"customerID": answerMessage["customerID"],
			"messageBox": answerMessage["messageBox"],
			"isCustomer": False,
			"isBot": True
		}

		con = sqlite3.connect('db.sqlite')
		cur = con.cursor()
		query = cur.execute("INSERT INTO message (customerID, text, date, isCustomer, isBot, messageBox) \
			VALUES (:customerID, :text, :date, :isCustomer, :isBot, :messageBox)", feedbackMessage)

		con.commit()