import sqlite3 from 'sqlite3';

// Enable verbose mode for detailed error messages during development
sqlite3.verbose();

// Database configuration
const DB_NAME = 'db.sqlite';
const db = new sqlite3.Database(DB_NAME);

/**
 * Class responsible for guest-related database operations
 */
class GuestSQL {
    /**
     * Find a guest by UUID
     *
     * @param {string} uuid - The unique identifier of the guest
     * @param {Function} callback - Callback function(error, row)
     */
    static find(uuid, callback) {
        const query = 'SELECT * FROM guest WHERE uuid = ?';
        db.get(query, [uuid], callback);
    }

    /**
     * Get all guests
     *
     * @param {Function} callback - Callback function(error, rows)
     */
    static findAll(callback) {
        const query = 'SELECT * FROM guest ORDER BY fullName';
        db.all(query, [], callback);
    }

    /**
     * Update guest response status
     *
     * @param {Object} data - The data to update
     * @param {string} data.uuid - Guest UUID
     * @param {number} data.respStatus - Response status (accept/reject)
     * @param {string} data.respDate - Response date
     * @param {Function} callback - Callback function(error, result)
     */
    static updateStatus(data, callback) {
        const { uuid, respStatus, respDate } = data;
        const query = 'UPDATE guest SET respStatus = ?, respDate = ? WHERE uuid = ?';
        db.run(query, [respStatus, respDate, uuid], callback);
    }
}

export default GuestSQL;
