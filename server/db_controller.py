from db import get_db

# defines the functions for POST requests, GET requests for all rows, GET requests by ID and GET requests by name

def insert_row(uname, byear, pword):
    db = get_db()
    cursor = db.cursor()
    statement = "INSERT INTO data(uname, byear, pword) VALUES (?, ?, ?)"
    cursor.execute(statement, [uname, byear, pword])
    db.commit()
    return True

def get_by_name(name):
    db = get_db()
    cursor = db.cursor()
    statement = "SELECT * FROM data WHERE uname = ?"
    cursor.execute(statement, [name])
    return cursor.fetchall()

def get_by_id(id):
    db = get_db()
    cursor = db.cursor()
    statement = "SELECT * FROM data WHERE id = ?"
    cursor.execute(statement, [id])
    return cursor.fetchone()

def get_rows():
    db = get_db()
    cursor = db.cursor()
    statement = "SELECT * FROM data"
    cursor.execute(statement)
    return cursor.fetchall()