from flask import (Flask, jsonify, request)
from flask_cors import CORS, cross_origin
from datetime import datetime

import sqlite3
import json

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route("/")
def index():
	return "I am working, don't disturb me."


def processMessage(message):
	if message["isCustomer"] and "thank you".casefold() in message["text"].casefold():

		# insert a new data into the database
		con = sqlite3.connect('db.sqlite')
		cur = con.cursor()

		reviewQuestion = {
			"text": "Would you like to review this service?",
			"date": datetime.now().isoformat(),
			"customerID": message["customerID"],
			"messageBox": message["messageBox"],
			"isCustomer": False,
			"isBot": True
		}

		cur.execute("INSERT INTO message (customerID, text, date, isCustomer, isBot, messageBox) VALUES (:customerID, :text, :date, :isCustomer, :isBot, :messageBox)", reviewQuestion)
		con.commit()
		cur.close()

@app.route("/messageListener", methods=['POST'])
def messageListener():
	
	data = request.get_json()

	con = sqlite3.connect('db.sqlite')
	cur = con.cursor()


	cur.execute("INSERT INTO message (customerID, text, date, isCustomer, isBot, messageBox) VALUES (:customerID, :text, :date, :isCustomer, :isBot, :messageBox)", data)
	con.commit()
	cur.close()

	processMessage(data)

	return(request.data)


@app.route("/messageBox", methods=['POST'])
def messageBox():
	data = request.get_json()

	con = sqlite3.connect('db.sqlite')
	con.row_factory = sqlite3.Row

	messageBoxID = data.get("messageBox")
	result = con.execute(
		"SELECT * FROM message WHERE messageBox IS ?", (messageBoxID,)).fetchall()
	con.commit()

	return(json.dumps([dict(ix) for ix in result]))


if __name__ == '__main__':
	# app.debug = True
	app.run(host='0.0.0.0', port=3003, debug=True)
