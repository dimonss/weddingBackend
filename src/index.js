import express from 'express';
import GuestSQL from './db/guestSQL.js';
import { commonDto } from './DTO/common.js';
import { STATUS } from './constants.js';
import { getCurrentDate } from './utils/commonUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
const PORT = process.env.PORT || 7000;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'defaultUsername';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'defaultPass';
const app = express();

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
    const [username, password] = credentials.split(':');

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) next();
    else return res.status(401).json(commonDto(STATUS.ERROR, 'Invalid credentials'));
};

/**
 * Setup middleware functions
 */
const setupMiddleware = () => {
    // Parse JSON request body
    app.use(express.json());

    // CORS configuration
    // app.use((req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    //     res.header(
    //         'Access-Control-Allow-Headers',
    //         'Origin, X-Requested-With, Content-Type, Accept, Authorization, Auth, auth',
    //     );
    //
    //     // Handle preflight requests
    //     if (req.method === 'OPTIONS') {
    //         return res.status(200).end();
    //     }
    //
    //     next();
    // });

    // Request logging
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
        next();
    });
};

/**
 * Setup API routes
 */
const setupRoutes = () => {
    // Health check route
    app.get('/health', (req, res) => {
        res.json(commonDto(STATUS.OK, 'success', { status: 'UP' }));
    });

    // Get all guests (protected with basic auth)
    app.get('/guests', basicAuth, (req, res) => {
        GuestSQL.getAll((error, guests) => {
            if (error) {
                console.error('Error fetching guests:', error);
                res.json(commonDto(STATUS.ERROR, 'Failed to fetch guests'));
                return;
            }
            res.json(commonDto(STATUS.OK, 'success', guests));
        });
    });

    // Get a guest by UUID
    app.get('/guest/:uuid', (req, res) => {
        const uuid = req?.params?.uuid;
        GuestSQL.find(uuid, (error, item) => {
            if (error) {
                res.json(commonDto(STATUS.ERROR, 'error'));
                return;
            }
            if (item) {
                res.json(commonDto(STATUS.OK, 'success', item));
            } else res.json(commonDto(STATUS.NOT_FOUND, 'user not found'));
        });
    });

    // Create new guest (protected with basic auth)
    app.post('/guest', basicAuth, (req, res) => {
        const { fullName, gender } = req.body;
        console.log(req.body);
        if (!fullName || !gender) {
            return res.json(commonDto(STATUS.ERROR, 'fullName and gender are required'));
        }
        GuestSQL.create({ fullName, gender }, (error, guest) => {
            if (error) {
                console.error('Error creating guest:', error);
                res.json(commonDto(STATUS.ERROR, 'Failed to create guest'));
                return;
            }
            res.json(commonDto(STATUS.OK, 'Guest created successfully', guest));
        });
    });

    // Update guest (protected with basic auth)
    app.put('/guest/:uuid', basicAuth, (req, res) => {
        const uuid = req.params.uuid;
        console.log(req);
        const { fullName, gender, respStatus } = req.body;
        if (!fullName || !gender) {
            return res.json(commonDto(STATUS.ERROR, 'fullName or gender or respStatus are required'));
        }
        GuestSQL.update(uuid, { fullName, gender, respStatus }, (error, guest) => {
            if (error) {
                console.error('Error updating guest:', error);
                res.json(commonDto(STATUS.ERROR, 'Failed to update guest'));
                return;
            }
            if (!guest) {
                return res.json(commonDto(STATUS.NOT_FOUND, 'Guest not found'));
            }
            res.json(commonDto(STATUS.OK, 'Guest updated successfully', guest));
        });
    });

    // Delete guest (protected with basic auth)
    app.delete('/guest/:uuid', basicAuth, (req, res) => {
        const uuid = req.params.uuid;
        GuestSQL.delete(uuid, (error, result) => {
            if (error) {
                console.error('Error deleting guest:', error);
                res.json(commonDto(STATUS.ERROR, 'Failed to delete guest'));
                return;
            }
            if (!result.deleted) {
                return res.json(commonDto(STATUS.NOT_FOUND, 'Guest not found'));
            }
            res.json(commonDto(STATUS.OK, 'Guest deleted successfully'));
        });
    });

    // Accept invitation
    app.post('/guest_accept/:uuid', (req, res) => {
        const uuid = req?.params?.uuid;
        const respDate = getCurrentDate();
        GuestSQL.updateStatus({ uuid, respStatus: 1, respDate }, (error, person) => {
            if (error) {
                res.json(commonDto(STATUS.ERROR, 'error'));
                return;
            }
            res.json(commonDto(STATUS.OK, 'success', person));
        });
    });

    // Reject invitation
    app.post('/guest_reject/:uuid', (req, res) => {
        const uuid = req?.params?.uuid;
        const respDate = getCurrentDate();
        GuestSQL.updateStatus({ uuid, respStatus: 0, respDate }, (error, person) => {
            if (error) {
                res.json(commonDto(STATUS.ERROR, 'error'));
                return;
            }
            res.json(commonDto(STATUS.OK, 'success', person));
        });
    });

    // Error handler
    app.use((err, req, res) => {
        console.error('Unhandled error:', err);
        res.status(500).json(commonDto(STATUS.ERROR, 'Internal server error'));
    });
};

/**
 * Start the Express server
 */
const startServer = () => {
    try {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server started on http://${HOSTNAME}:${PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

/**
 * Main function to start the application
 */
const startApp = async () => {
    setupMiddleware();
    setupRoutes();
    startServer();
};

// Launch the application
startApp();
