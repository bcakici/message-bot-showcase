from datetime import datetime
import time
import sqlite3
from triggers.thankyou.ask_for_review import ask_for_review 
from triggers.thankyou.receive_review import receive_review 

def process_message(message):
	# if messager is not programmer exit subroutine
	if not message["isCustomer"]:
		return

	con = sqlite3.connect('db.sqlite')

	# check if bot is waiting for a response
	con.row_factory = sqlite3.Row
	bot_conversation = con.execute("SELECT * FROM botConversation \
		WHERE answerID IS NULL and messageBox IS ?", (message["messageBox"],)).fetchone()

	if bot_conversation is not None:
		bot_conversation = dict(bot_conversation)

		# if rule is thank you
		if bot_conversation["rule"] == "THANK_YOU":
			receive_review(message, bot_conversation)


	# THANK_YOU RULE
	elif message["isCustomer"] and "thank you".casefold() in message["text"].casefold():
		ask_for_review(message)
	
	return