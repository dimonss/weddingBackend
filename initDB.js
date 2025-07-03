import sqlite3 from 'sqlite3';
import { getDatabaseFilename } from './src/config/database.js';

export const DB_NAME = getDatabaseFilename();
export const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
};

const SQLQueries = {
    // USER
    user: `
        CREATE TABLE IF NOT EXISTS user
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phone TEXT NOT NULL UNIQUE,
            username TEXT NOT NULL UNIQUE,
            auth TEXT NOT NULL
        )
    `,

    user_v1: `
    ALTER TABLE user
    ADD husbands_name TEXT DEFAULT '';
    `,
    user_v2: `
    ALTER TABLE user
    ADD wifes_name TEXT DEFAULT '';
    `,
    user_v3: `
    ALTER TABLE user
    ADD address TEXT DEFAULT '';
    `,
    user_v4: `
    ALTER TABLE user
    ADD date TEXT DEFAULT '';
    `,
    user_v5: `
    ALTER TABLE user
    ADD time TEXT DEFAULT '';
    `,

    // GUEST
    guest: `
        CREATE TABLE IF NOT EXISTS guest
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            uuid TEXT NOT NULL UNIQUE,
            fullName TEXT NOT NULL UNIQUE,
            respDate TEXT,
            respStatus INTEGER DEFAULT NULL,
            gender TEXT NOT NULL DEFAULT ${GENDER.MALE}
        )
    `,
    guest_v1: `
    ALTER TABLE guest
    ADD user_id INTEGER;
    `,

};

const db = new sqlite3.Database(DB_NAME);


/**
 * Show information about created tables
 */
async function showTableInfo() {
    return new Promise((resolve, reject) => {
        db.all("SELECT name FROM sqlite_master WHERE type='table'", [], (err, tables) => {
            if (err) {
                console.error('Error getting table info:', err);
                reject(err);
            } else {
                console.log('\n📊 Created tables:');
                tables.forEach(table => {
                    console.log(`   - ${table.name}`);
                });
                console.log('');
                resolve();
            }
        });
    });
}

/**
 * Initialize database with all migrations
 */
async function initDatabase() {
    console.log('🗄️  Initializing Database');
    console.log(`📁 Database: ${DB_NAME}`);
    console.log('================================\n');
    
    try {
        // Run all migrations sequentially
        for (const [name, SQLQuery] of Object.entries(SQLQueries)) {
            console.log(`📋 Running migration: ${name}`);
            
            await new Promise((resolve, reject) => {
                db.run(SQLQuery, (err) => {
                    if (err) {
                        // Handle ALTER TABLE errors (column might already exist)
                        if (err.message.includes('duplicate column name')) {
                            console.log(`   ⚠️  Column already exists, skipping: ${name}`);
                            resolve();
                        } else {
                            console.error(`   ❌ Error in migration ${name}:`, err.message);
                            reject(err);
                        }
                    } else {
                        console.log(`   ✅ Completed: ${name}`);
                        resolve();
                    }
                });
            });
        }
        
        console.log('\n🎉 Database initialized successfully!');
        console.log(`📁 Database file: ${DB_NAME}`);
        
        // Show table information
        await showTableInfo();
        
    } catch (error) {
        console.error('💥 Failed to initialize database:', error);
        process.exit(1);
    } finally {
        db.close();
    }
}

// Run the initialization
initDatabase();
