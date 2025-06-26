/**
 * Request logging middleware
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const requestLogger = (req, res, next) => {
    console.log(
        `${new Date().toISOString()} ${req.method} ${req.path} ${req.headers['authorization'] || 'without no auth'}`,
    );
    next();
};

export default requestLogger;
