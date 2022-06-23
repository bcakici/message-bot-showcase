from flask import (Flask, jsonify, request)
from flask_cors import CORS, cross_origin

from datetime import datetime

import sqlite3
import json
import names

from process_message import process_message
from triggers.completedtransaction.ask_for_note import ask_for_note 

app = Flask(__name__)
cors = CORS(app)

@app.route("/")
def index():
	return "Welcome to the server!"

# this is the endpoint for the bot to listen messages
@app.route("/messageListener", methods=['POST'])
def messageListener():
	
	data = request.get_json()

	con = sqlite3.connect('db.sqlite')
	cur = con.cursor()

	# create a message box if it does not exist yet
	query = cur.execute("SELECT id FROM messagebox WHERE id = ?", (data["messageBox"],))
	if query.fetchone() is None:
		names.get_first_name()
		messageBox = {"id": data["messageBox"], "date": data["date"], "customer": names.get_first_name()}
		cur.execute("INSERT INTO messagebox (id, customer, date) VALUES (:id, :customer, :date)", messageBox)
		con.commit()

	query = cur.execute("INSERT INTO message (text, date, isCustomer, isBot, messageBox) \
		VALUES (:text, :date, :isCustomer, :isBot, :messageBox)", data)
	con.commit()
	cur.close()

	message = dict(data)
	message["id"] = query.lastrowid

	process_message(message)

	return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

# this is the endpoint for getting conversation history
@app.route("/messages/<messageBoxID>/", methods=['GET'])
def messages(messageBoxID):
	con = sqlite3.connect('db.sqlite')
	con.row_factory = sqlite3.Row

	result = con.execute(
		"SELECT * FROM message WHERE messageBox IS ?", (messageBoxID,)).fetchall()
	con.commit()

	# also get customer
	customer = con.execute("SELECT customer FROM messagebox WHERE id IS ?", (messageBoxID,)).fetchone()
	con.close()

	# if customer does not exist return empty data
	if customer is None:
		return json.dumps({"customer": "", "messages": []}), 200, {'ContentType':'application/json'}

	# return both customer and messages
	return json.dumps({"customer": customer[0], "messages": [dict(ix) for ix in result]})

# mark transaction as completed
@app.route("/completeTransaction/<messageBoxID>/", methods=['GET'])
def completeTransaction(messageBoxID):
	con = sqlite3.connect('db.sqlite')
	cur = con.cursor()

	# mark message box as completed
	cur.execute("UPDATE messagebox SET isTransactionCompleted = ? WHERE id IS ?", 
		(datetime.now().isoformat(), messageBoxID,))
	con.commit()

	# ask customer for feedback on completed transaction
	ask_for_note(messageBoxID)

	# return 200
	return json.dumps({'success':True}), 200, {'ContentType':'application/json'}

# return last 10 message boxes
@app.route("/dashboard/", methods=['GET'])
def last_message_boxes():
	con = sqlite3.connect('db.sqlite')
	con.row_factory = sqlite3.Row

	result = con.execute(
		"SELECT * FROM dashboard").fetchall()
	con.commit()

	return(json.dumps([dict(ix) for ix in result]))

if __name__ == '__main__':
	# app.debug = True
	app.run(host='0.0.0.0', port=3003, debug=True)
