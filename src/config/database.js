import dotenv from 'dotenv';

dotenv.config();

/**
 * Database configuration based on environment
 */
export const DB_CONFIG = {
    // Use test database for development, production database for production
    filename: process.env.NODE_ENV === 'production' ? 'db.sqlite' : 'test_db.sqlite',
    
    // Enable verbose mode for development
    verbose: process.env.NODE_ENV !== 'production',
    
    // Environment info
    environment: process.env.NODE_ENV || 'development'
};

/**
 * Get database filename based on environment
 * @returns {string} Database filename
 */
export function getDatabaseFilename() {
    return DB_CONFIG.filename;
}

/**
 * Check if running in production mode
 * @returns {boolean} True if in production
 */
export function isProduction() {
    return process.env.NODE_ENV === 'production';
}

/**
 * Check if running in development mode
 * @returns {boolean} True if in development
 */
export function isDevelopment() {
    return process.env.NODE_ENV !== 'production';
}

/**
 * Get database configuration object
 * @returns {Object} Database configuration
 */
export function getDatabaseConfig() {
    return DB_CONFIG;
}

// Log database configuration on startup
console.log(`🗄️  Database Configuration:`);
console.log(`   Environment: ${DB_CONFIG.environment}`);
console.log(`   Database File: ${DB_CONFIG.filename}`);
console.log(`   Verbose Mode: ${DB_CONFIG.verbose ? 'Enabled' : 'Disabled'}`);
console.log(''); 