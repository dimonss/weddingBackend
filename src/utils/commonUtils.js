/**
 * Get the current date/time in YYYY-MM-DD HH:MM:SS format
 *
 * @returns {string} Formatted date string
 */
export const getCurrentDate = () => {
    const date = new Date();

    // Add leading zeros to single-digit values
    const padZero = (num) => String(num).padStart(2, '0');

    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Convert escaped newlines back to actual newlines
 * This fixes the issue where SQLite stores "\\n" instead of "\n"
 *
 * @param {string} text - Text that may contain escaped newlines
 * @returns {string} Text with proper newlines
 */
export const fixNewlines = (text) => {
    if (!text || typeof text !== 'string') {
        return text;
    }
    return text.replace(/\\n/g, '\n');
};

/**
 * Process object and fix newlines in all string fields
 *
 * @param {Object} obj - Object that may contain escaped newlines
 * @returns {Object} Object with proper newlines
 */
export const fixNewlinesInObject = (obj) => {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    
    const result = { ...obj };
    for (const [key, value] of Object.entries(result)) {
        if (typeof value === 'string') {
            result[key] = fixNewlines(value);
        }
    }
    return result;
};
