import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

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
     * Create a new guest
     *
     * @param {Object} guest - Guest data
     * @param {string} guest.fullName - Guest's full name
     * @param {string} guest.gender - Guest's gender
     * @param {Function} callback - Callback function(error, result)
     * @param {number} userId - ID of the user creating the guest
     */
    static create(guest, callback, userId) {
        const { fullName, gender } = guest;
        const uuid = uuidv4();

        const query = 'INSERT INTO guest (uuid, fullName, gender, user_id) VALUES (?, ?, ?, ?)';
        db.run(query, [uuid, fullName, gender, userId], function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, { uuid, fullName, gender, user_id: userId });
            }
        });
    }

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
     * Get all guests for a specific user
     *
     * @param {Function} callback - Callback function(error, rows)
     * @param {number} userId - ID of the user
     */
    static findAll(callback, userId) {
        if (userId) {
            const query = 'SELECT * FROM guest WHERE user_id = ? ORDER BY fullName';
            db.all(query, [userId], callback);
        } else {
            const query = 'SELECT * FROM guest ORDER BY fullName';
            db.all(query, [], callback);
        }
    }

    /**
     * Update guest information
     *
     * @param {string} uuid - Guest UUID
     * @param {Object} updates - The data to update
     * @param {string} updates.fullName - Guest's full name
     * @param {string} updates.gender - Guest's gender
     * @param {Function} callback - Callback function(error, result)
     */
    static update(uuid, updates, callback) {
        const { fullName, gender, respStatus } = updates;
        const query = 'UPDATE guest SET fullName = ?, gender = ?, respStatus = ? WHERE uuid = ?';
        db.run(query, [fullName, gender, respStatus, uuid], function (err) {
            if (err) {
                callback(err);
            } else {
                if (this.changes > 0) {
                    callback(null, { uuid, fullName, gender });
                } else {
                    callback(null, null);
                }
            }
        });
    }

    /**
     * Delete a guest
     *
     * @param {string} uuid - Guest UUID
     * @param {Function} callback - Callback function(error, result)
     */
    static delete(uuid, callback) {
        const query = 'DELETE FROM guest WHERE uuid = ?';
        db.run(query, [uuid], function (err) {
            if (err) {
                callback(err);
            } else {
                callback(null, { deleted: this.changes > 0 });
            }
        });
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
