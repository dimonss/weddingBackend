import GuestSQL from '../db/guestSQL.js';
import { commonDto } from '../DTO/common.js';
import { STATUS } from '../constants.js';

/**
 * Middleware to check if user has access to a specific guest
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const checkGuestAccess = (req, res, next) => {
    const uuid = req.params.uuid;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json(commonDto(STATUS.ERROR, 'User not authenticated'));
    }

    GuestSQL.find(uuid, (error, guest) => {
        if (error) {
            console.error('Error finding guest:', error);
            return res.status(500).json(commonDto(STATUS.ERROR, 'Database error'));
        }

        if (!guest) {
            return res.status(404).json(commonDto(STATUS.NOT_FOUND, 'Guest not found'));
        }

        // Check if the guest belongs to the authenticated user
        if (guest.user_id !== userId) {
            return res.status(401).json(commonDto(STATUS.ERROR, 'Invalid credentials'));
        }

        // Add guest to request for potential use in routes
        req.guest = guest;
        next();
    });
};

export default checkGuestAccess; 