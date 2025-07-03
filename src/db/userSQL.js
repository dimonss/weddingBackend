import sqlite3 from 'sqlite3';
import { getDatabaseFilename } from '../config/database.js';

// Enable verbose mode for detailed error messages during development
sqlite3.verbose();

// Database configuration
const DB_NAME = getDatabaseFilename();
const db = new sqlite3.Database(DB_NAME);

/**
 * Class responsible for user-related database operations
 */
class UserSQL {
    /**
     * Find a user by username
     *
     * @param {string} username - The username to search for
     * @param {Function} callback - Callback function(error, row)
     */
    static findByUsername(username, callback) {
        const query = 'SELECT * FROM user WHERE username = ?';
        db.get(query, [username], callback);
    }

    /**mi
     * Validate user credentials
     *
     * @param {string} credentials - The auth
     * @param {Function} callback - Callback function(error, user)
     */
    static validateCredentials(credentials, callback) {
        const authEncoded = Buffer.from(credentials).toString('base64');
        const query = `SELECT *
                       FROM user
                       WHERE auth = '${authEncoded}'`;

        db.get(query, (err, user) => {
            if (err) {
                callback(err);
            } else {
                callback(null, user);
            }
        });
    }

    /**
     * Get all users
     *
     * @param {Function} callback - Callback function(error, rows)
     */
    static getAll(callback) {
        const query = 'SELECT id, username, phone FROM user ORDER BY username';
        db.all(query, [], callback);
    }

    /**
     * Get user couple information (husbands_name and wifes_name)
     *
     * @param {number} userId - The user ID
     * @param {Function} callback - Callback function(error, user)
     */
    static getUserInfo(userId, callback) {
        const query = 'SELECT id, phone, username, husbands_name, wifes_name, date, time, address FROM user WHERE id = ?';
        db.get(query, [userId], callback);
    }

    /**
     * Update user couple information
     *
     * @param {number} userId - The user ID
     * @param {Object} coupleInfo - The couple information to update
     * @param {string} coupleInfo.husbands_name - Husband's name
     * @param {string} coupleInfo.wifes_name - Wife's name
     * @param {Function} callback - Callback function(error, result)
     */
    static updateCoupleInfo(userId, coupleInfo, callback) {
        const { husbands_name, wifes_name } = coupleInfo;
        const query = 'UPDATE user SET husbands_name = ?, wifes_name = ? WHERE id = ?';

        db.run(query, [husbands_name, wifes_name, userId], function (err) {
            if (err) {
                callback(err);
            } else {
                if (this.changes > 0) {
                    callback(null, { id: userId, husbands_name, wifes_name });
                } else {
                    callback(null, null);
                }
            }
        });
    }

    /**
     * Update user wedding details (date, time, address)
     *
     * @param {number} userId - The user ID
     * @param {Object} weddingInfo - The wedding information to update
     * @param {string} weddingInfo.date - Wedding date
     * @param {string} weddingInfo.time - Wedding time
     * @param {string} weddingInfo.address - Wedding address
     * @param {Function} callback - Callback function(error, result)
     */
    static updateWeddingInfo(userId, weddingInfo, callback) {
        const { date, time, address } = weddingInfo;
        const query = 'UPDATE user SET date = ?, time = ?, address = ? WHERE id = ?';

        db.run(query, [date, time, address, userId], function (err) {
            if (err) {
                callback(err);
            } else {
                if (this.changes > 0) {
                    callback(null, { id: userId, date, time, address });
                } else {
                    callback(null, null);
                }
            }
        });
    }
}

export default UserSQL;
