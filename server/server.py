from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
import json
import sqlite3

app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/")
@cross_origin(supports_credentials=True)
def index():
	return "I am working, don't disturb me."

@app.route("/receiveMessage", methods=['POST'])
@cross_origin(supports_credentials=True)
def receiveMessage():
	data = request.get_json()

	con = sqlite3.connect('db.sqlite')	
	cur = con.cursor()

	values = (data.get("customerID"), data.get("text"), data.get("date"), data.get("isCustomer"), data.get("isBot"))
	cur.execute("INSERT INTO message (customerID, text, date, isCustomer, isBot) VALUES (?, ?, ?, ?, ?)", values)
	con.commit()

	return(request.data)


if __name__ == '__main__':
	# app.debug = True
	app.run(host='0.0.0.0',port=3003,debug=True)