/**
 * JSDoc Configuration
 * 
 * This configuration helps generate documentation and provides better ESLint support
 * for the wedding invitation system database schema.
 */

module.exports = {
    /**
     * Source files to document
     */
    source: {
        include: [
            'src/',
            'migrations.js',
            'addMockUsers.js',
            'addMockGuests.js'
        ],
        exclude: [
            'node_modules/',
            'build/',
            'dist/'
        ],
        includePattern: '.+\\.js$',
        excludePattern: '(node_modules/|docs/)'
    },

    /**
     * Output directory for generated documentation
     */
    opts: {
        destination: './docs/',
        recurse: true,
        template: 'node_modules/docdash',
        readme: './README.md'
    },

    /**
     * Templates and styling
     */
    templates: {
        cleverLinks: true,
        monospaceLinks: true,
        default: {
            outputSourceFiles: true,
            includeDate: false
        }
    },

    /**
     * Plugins
     */
    plugins: [
        'plugins/markdown'
    ],

    /**
     * Tags configuration
     */
    tags: {
        allowUnknownTags: ['optional'],
        dictionaries: ['jsdoc', 'closure']
    },

    /**
     * Source type
     */
    sourceType: 'module',

    /**
     * Markdown configuration
     */
    markdown: {
        idInHeadings: true
    },

    /**
     * Type definitions for better documentation
     */
    typedefs: {
        /**
         * @typedef {Object} User
         * @property {number} id - Unique identifier for the user
         * @property {string} phone - User's phone number (Ukrainian format: +380...)
         * @property {string} username - Unique username for login
         * @property {string} auth - Base64 encoded authentication credentials
         * @property {string} husbands_name - Husband's full name
         * @property {string} wifes_name - Wife's full name
         * @property {string} address - Wedding venue address
         * @property {string} date - Wedding date (YYYY-MM-DD format)
         * @property {string} time - Wedding time (HH:MM format)
         */

        /**
         * @typedef {Object} Guest
         * @property {number} id - Unique identifier for the guest
         * @property {string} uuid - Unique UUID for guest identification
         * @property {string} fullName - Guest's full name
         * @property {string|null} respDate - Date when guest responded to invitation
         * @property {number|null} respStatus - Response status: null (pending), 1 (accepted), 0 (declined)
         * @property {string} gender - Guest's gender: 'male' or 'female'
         * @property {number|null} user_id - Foreign key reference to user.id
         */

        /**
         * @typedef {Object} CoupleInfo
         * @property {string} husbands_name - Husband's name
         * @property {string} wifes_name - Wife's name
         */

        /**
         * @typedef {Object} WeddingInfo
         * @property {string} date - Wedding date
         * @property {string} time - Wedding time
         * @property {string} address - Wedding address
         */

        /**
         * @typedef {Object} GuestResponse
         * @property {string} uuid - Guest UUID
         * @property {number} respStatus - Response status
         * @property {string} respDate - Response date
         */

        /**
         * @typedef {'male'|'female'} Gender
         */

        /**
         * @typedef {null|0|1} ResponseStatus
         * @description Response status values: null (pending), 0 (declined), 1 (accepted)
         */
    }
}; 