import sqlite3 from 'sqlite3';

export const DB_NAME = 'db.sqlite';
export const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
};

const SQLQueries = {
    // CATEGORY
    guest: `
    CREATE TABLE IF NOT EXISTS guest
    (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL UNIQUE,
    fullName TEXT NOT NULL UNIQUE,
    respDate TEXT,
    respStatus INTEGER DEFAULT NULL,
    gender TEXT NOT NULL DEFAULT ${GENDER.MALE}
    )
    `,
};

const db = new sqlite3.Database(DB_NAME);

Object.entries(SQLQueries).forEach(async ([name, SQLQuery]) => {
    try {
        console.log('\x1b[34m', name);
        db.run(SQLQuery);
        console.log('\x1b[32m', 'completed');
        console.log('\x1b[0m', '');
    } catch (e) {
        console.log('\x1b[31m', 'error:' + e);
    }
});
db.close();
console.log('\x1b[32m', 'FULL COMPLETED');
console.log('\x1b[0m', '');
