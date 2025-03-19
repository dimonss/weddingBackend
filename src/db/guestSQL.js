import sqlite3 from 'sqlite3';

sqlite3.verbose();
const dbName = 'db.sqlite';
const chats = new sqlite3.Database(dbName);

class GuestSQL {
    static find(uuid, cb) {
        chats.get('SELECT * FROM guest WHERE uuid = ?', uuid, cb);
    }
    static updateStatus(data, cb) {
        const sql = 'UPDATE guest SET respStatus = ?, respDate = ? WHERE uuid = ?';
        chats.run(sql, data.respStatus, data.respDate, data.uuid, cb);
    }
}

export default GuestSQL;
