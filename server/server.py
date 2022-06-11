from flask import (Flask, request, jsonify)
from flask_cors import CORS, cross_origin

import sqlite3
import json

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/")
def index():
	return "I am working, don't disturb me."

@app.route("/receiveMessage", methods=['POST'])
def receiveMessage():
	data = request.get_json()

	con = sqlite3.connect('db.sqlite')	
	cur = con.cursor()

	values = (data.get("customerID"), data.get("text"), data.get("date"), data.get("isCustomer"), data.get("isBot"), data.get("messageBox"))
	cur.execute("INSERT INTO message (customerID, text, date, isCustomer, isBot, messageBox) VALUES (?, ?, ?, ?, ?, ?)", values)
	con.commit()

	return(request.data)

@app.route("/messageBox", methods=['POST'])
def messageBox():
	data = request.get_json()

	con = sqlite3.connect('db.sqlite')	
	con.row_factory = sqlite3.Row

	values = (data.get("messageBox"),)
	result = con.execute("SELECT * FROM message WHERE messageBox IS ?", values).fetchall()
	con.commit()

	return(json.dumps( [dict(ix) for ix in result] ))


if __name__ == '__main__':
	# app.debug = True
	app.run(host='0.0.0.0',port=3003,debug=True)