const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./defect_tracker.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to SQLite3 database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS defects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    status TEXT,
    assignedTo TEXT
)`);

module.exports = db;