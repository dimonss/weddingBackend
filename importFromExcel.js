import sqlite3 from 'sqlite3';
import xlsx from 'xlsx';
import { DB_NAME } from './migrations.js';

const db = new sqlite3.Database(DB_NAME);

// Read the Excel file
const workbook = xlsx.readFile('guestList.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];

// Convert to JSON
const data = xlsx.utils.sheet_to_json(worksheet, {
    header: ['uuid', 'fullName'],
    range: 1, // Skip header row
});

// Insert data into database
data.forEach((item) => {
    if (item.uuid && item.fullName) {
        db.run(`INSERT INTO guest (uuid, fullName) VALUES ("${item.uuid}", "${item.fullName}")`, (err) => {
            if (err) {
                console.log('\x1b[31m', `ERROR ${err.message} - ${item.fullName}`);
            } else {
                console.log('\x1b[32m', `SUCCESS ADD ${item.fullName}`);
            }
        });
    }
});

db.close();
console.log('\x1b[32m', 'FULL COMPLETED');
console.log('\x1b[0m', '');
