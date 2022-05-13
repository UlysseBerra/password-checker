-- creates the database table data with the fields id, uname, byear, and password

CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uname TEXT NOT NULL,
    byear TEXT,
    password TEXT NOT NULL
)