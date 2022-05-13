import json
from flask import Flask, jsonify, request
import db_controller
from db import create_tables

app = Flask(__name__)

# adds the headers the the HTTP responses/requests

@app.after_request
def after_request(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"
    return response

# defines the GET all request    

@app.route('/people', methods=["GET"])
def get_people():
    people = db_controller.get_rows()
    return jsonify(people)

# defines the POST request

@app.route('/person', methods=["POST"])
def insert_person():
    f = request.get_json()
    uname = f["uname"]
    byear = f["byear"]
    pword = f["pword"]
    result = db_controller.insert_row(uname, byear, pword)
    return jsonify(result)

# defines the GET by name request

@app.route('/person/name/<name>', methods=['GET'])
def get_person_by_name(name):
    person = db_controller.get_by_name(name)
    return jsonify(person)

# defines the GET by ID request

@app.route('/person/id/<id>', methods=['GET'])
def get_person_by_id(id):
    person = db_controller.get_by_id(id)
    return jsonify(person)

# runs the app

if __name__ == '__main__':
    create_tables()
    app.run(port=5000)