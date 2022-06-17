from flask import (Flask, jsonify, request)
from flask_cors import CORS, cross_origin

import sqlite3
import json

from processMessage import processMessage

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route("/")
def index():
	return "I am working, don't disturb me."

# this is the endpoint for the bot to listen messages
@app.route("/messageListener", methods=['POST'])
def messageListener():
	
	data = request.get_json()

	con = sqlite3.connect('db.sqlite')
	cur = con.cursor()

	query = cur.execute("INSERT INTO message (customerID, text, date, isCustomer, isBot, messageBox) \
		VALUES (:customerID, :text, :date, :isCustomer, :isBot, :messageBox)", data)
	con.commit()
	cur.close()

	message = dict(data)
	message["id"] = query.lastrowid

	processMessage(message)

	return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

# this is the endpoint for getting conversation history
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
