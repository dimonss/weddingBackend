import sqlite3 from 'sqlite3';

// Enable verbose mode for detailed error messages during development
sqlite3.verbose();

// Database configuration
const DB_NAME = 'db.sqlite';
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
    static validateCredentials( credentials, callback) {
        const authEncoded = Buffer.from(credentials).toString('base64');
        const query = `SELECT * FROM user WHERE auth = '${authEncoded}'`;

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
}

export default UserSQL; 