/**
 * Creates a standardized response object
 *
 * @param {string} status - Response status (OK, ERROR, etc)
 * @param {string} message - Response message
 * @param {any} data - Response data payload
 * @returns {Object} Standardized response object
 */
export const commonDto = (status, message = '', data = null) => ({
    status,
    message,
    data,
});
