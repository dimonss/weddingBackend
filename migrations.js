import sqlite3 from 'sqlite3';

export const DB_NAME = 'db.sqlite';
export const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
};

const SQLQueries = {
    // USER
    user: `
        CREATE TABLE IF NOT EXISTS user
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phone TEXT NOT NULL UNIQUE,
            username TEXT NOT NULL UNIQUE,
            auth TEXT NOT NULL
        )
    `,

    // GUEST
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
    guest_v1: `
    ALTER TABLE guest
    ADD user_id INTEGER;
    `,
    guest_v2: `
    ALTER TABLE user
    ADD husbands_name TEXT DEFAULT '';
    `,
    guest_v3: `
    ALTER TABLE user
    ADD wifes_name TEXT DEFAULT '';
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
