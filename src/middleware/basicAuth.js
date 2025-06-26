import UserSQL from '../db/userSQL.js';
import { commonDto } from '../DTO/common.js';
import { STATUS } from '../constants.js';

/**
 * Basic authentication middleware
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const basicAuth = (req, res, next) => {
    // Check for authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.set('WWW-Authenticate', 'Basic realm="Wedding Admin"');
        return res.status(401).json(commonDto(STATUS.ERROR, 'Authentication required'));
    }

    // Decode credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');

    // Validate credentials against database
    UserSQL.validateCredentials(credentials, (error, user) => {
        if (error) {
            console.error('Database error during authentication:', error);
            return res.status(500).json(commonDto(STATUS.ERROR, 'Authentication service error'));
        }

        if (!user) {
            return res.status(401).json(commonDto(STATUS.ERROR, 'Invalid credentials'));
        }

        // Add user info to request for potential use in routes
        req.user = user;
        next();
    });
};

export default basicAuth; 