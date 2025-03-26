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
