from datetime import datetime
import time
import sqlite3
from conversationLogic.triggerThankYou import triggerThankYou 
from conversationLogic.replyThankYou import replyThankYou 

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
		botConversation = dict(botConversation)

		# if rule is thank you
		if botConversation["rule"] == "THANK_YOU":
			replyThankYou(message, botConversation)


	# THANK_YOU RULE
	elif message["isCustomer"] and "thank you".casefold() in message["text"].casefold():
		triggerThankYou(message)
	
	return