import express from 'express';
import GuestSQL from './db/guestSQL.js';
import { commonDto } from './DTO/common.js';
import { STATUS } from './constants.js';
import { getCurrentDate } from './utils/commonUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
const PORT = process.env.PORT || 7000;
const app = express();

/**
 * Setup middleware functions
 */
const setupMiddleware = () => {
    // Parse JSON request body
    app.use(express.json());

    // CORS configuration
    // app.use((req, res, next) => {
    //     res.append('Access-Control-Allow-Origin', ['*']);
    //     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    //     res.append('Access-Control-Allow-Headers', 'Content-Type,Auth,auth');
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
        res.json({ status: 'UP' });
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
    // Handle 404 errors
    app.use((req, res) => {
        res.status(404).json(commonDto(STATUS.NOT_FOUND, `Cannot ${req.method} ${req.path}`));
    });

    // Error handler
    app.use((err, req, res, next) => {
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
