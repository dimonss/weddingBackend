import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

// Enable verbose mode for detailed error messages during development
sqlite3.verbose();

// Database configuration
const DB_NAME = 'db.sqlite';
const db = new sqlite3.Database(DB_NAME);

// Gender constants
const GENDER = {
    MALE: 'male',
    FEMALE: 'female',
};

// Sample guest names for each user
const sampleGuests = {
    // For john_doe (User ID 1)
    john_doe: [
        { fullName: 'Michael Johnson', gender: GENDER.MALE },
        { fullName: 'Sarah Williams', gender: GENDER.FEMALE },
        { fullName: 'David Brown', gender: GENDER.MALE },
        { fullName: 'Emily Davis', gender: GENDER.FEMALE },
        { fullName: 'Robert Wilson', gender: GENDER.MALE },
        { fullName: 'Lisa Anderson', gender: GENDER.FEMALE },
        { fullName: 'James Taylor', gender: GENDER.MALE },
    ],

    // For mike_wilson (User ID 2)
    mike_wilson: [
        { fullName: 'Christopher Garcia', gender: GENDER.MALE },
        { fullName: 'Amanda Martinez', gender: GENDER.FEMALE },
        { fullName: 'Daniel Rodriguez', gender: GENDER.MALE },
        { fullName: 'Jessica Lopez', gender: GENDER.FEMALE },
        { fullName: 'Matthew Hernandez', gender: GENDER.MALE },
        { fullName: 'Nicole Gonzalez', gender: GENDER.FEMALE },
        { fullName: 'Andrew Perez', gender: GENDER.MALE },
        { fullName: 'Rachel Torres', gender: GENDER.FEMALE },
    ],

    // For alex_brown (User ID 3)
    alex_brown: [
        { fullName: 'Kevin Moore', gender: GENDER.MALE },
        { fullName: 'Stephanie Jackson', gender: GENDER.FEMALE },
        { fullName: 'Brian Martin', gender: GENDER.MALE },
        { fullName: 'Lauren Lee', gender: GENDER.FEMALE },
        { fullName: 'Steven Thompson', gender: GENDER.MALE },
        { fullName: 'Megan White', gender: GENDER.FEMALE },
        { fullName: 'Ryan Harris', gender: GENDER.MALE },
    ],

    // For david_miller (User ID 4)
    david_miller: [
        { fullName: 'Nathan Clark', gender: GENDER.MALE },
        { fullName: 'Ashley Lewis', gender: GENDER.FEMALE },
        { fullName: 'Adam Robinson', gender: GENDER.MALE },
        { fullName: 'Brittany Walker', gender: GENDER.FEMALE },
        { fullName: 'Mark Young', gender: GENDER.MALE },
        { fullName: 'Katherine Hall', gender: GENDER.FEMALE },
        { fullName: 'Timothy Allen', gender: GENDER.MALE },
        { fullName: 'Victoria King', gender: GENDER.FEMALE },
        { fullName: 'Jeffrey Wright', gender: GENDER.MALE },
    ],

    // For chris_taylor (User ID 5)
    chris_taylor: [
        { fullName: 'Scott Green', gender: GENDER.MALE },
        { fullName: 'Danielle Baker', gender: GENDER.FEMALE },
        { fullName: 'Eric Adams', gender: GENDER.MALE },
        { fullName: 'Heather Nelson', gender: GENDER.FEMALE },
        { fullName: 'Gregory Carter', gender: GENDER.MALE },
        { fullName: 'Tiffany Mitchell', gender: GENDER.FEMALE },
        { fullName: 'Derek Perez', gender: GENDER.MALE },
    ],

    // For james_lee (User ID 6)
    james_lee: [
        { fullName: 'Brandon Roberts', gender: GENDER.MALE },
        { fullName: 'Crystal Turner', gender: GENDER.FEMALE },
        { fullName: 'Travis Phillips', gender: GENDER.MALE },
        { fullName: 'Monica Campbell', gender: GENDER.FEMALE },
        { fullName: 'Corey Parker', gender: GENDER.MALE },
        { fullName: 'Angela Evans', gender: GENDER.FEMALE },
        { fullName: 'Shane Edwards', gender: GENDER.MALE },
        { fullName: 'Holly Collins', gender: GENDER.FEMALE },
    ],

    // For robert_clark (User ID 7)
    robert_clark: [
        { fullName: 'Tyler Stewart', gender: GENDER.MALE },
        { fullName: 'Melissa Sanchez', gender: GENDER.FEMALE },
        { fullName: 'Jared Morris', gender: GENDER.MALE },
        { fullName: 'Diana Rogers', gender: GENDER.FEMALE },
        { fullName: 'Cody Reed', gender: GENDER.MALE },
        { fullName: 'Erica Cook', gender: GENDER.FEMALE },
        { fullName: 'Wesley Morgan', gender: GENDER.MALE },
    ],

    // For thomas_rodriguez (User ID 8)
    thomas_rodriguez: [
        { fullName: 'Mario Bell', gender: GENDER.MALE },
        { fullName: 'Vanessa Murphy', gender: GENDER.FEMALE },
        { fullName: 'Ricardo Bailey', gender: GENDER.MALE },
        { fullName: 'Sofia Rivera', gender: GENDER.FEMALE },
        { fullName: 'Fernando Cooper', gender: GENDER.MALE },
        { fullName: 'Isabella Richardson', gender: GENDER.FEMALE },
        { fullName: 'Carlos Cox', gender: GENDER.MALE },
        { fullName: 'Gabriela Howard', gender: GENDER.FEMALE },
        { fullName: 'Diego Ward', gender: GENDER.MALE },
        { fullName: 'Valentina Torres', gender: GENDER.FEMALE },
    ],

    // For daniel_martinez (User ID 9)
    daniel_martinez: [
        { fullName: 'Luis Peterson', gender: GENDER.MALE },
        { fullName: 'Camila Gray', gender: GENDER.FEMALE },
        { fullName: 'Javier Ramirez', gender: GENDER.MALE },
        { fullName: 'Sofia James', gender: GENDER.FEMALE },
        { fullName: 'Miguel Watson', gender: GENDER.MALE },
        { fullName: 'Lucia Brooks', gender: GENDER.FEMALE },
        { fullName: 'Antonio Kelly', gender: GENDER.MALE },
    ],

    // For paul_robinson (User ID 10)
    paul_robinson: [
        { fullName: 'George Sanders', gender: GENDER.MALE },
        { fullName: 'Grace Price', gender: GENDER.FEMALE },
        { fullName: 'Frank Bennett', gender: GENDER.MALE },
        { fullName: 'Chloe Wood', gender: GENDER.FEMALE },
        { fullName: 'Henry Barnes', gender: GENDER.MALE },
        { fullName: 'Zoe Ross', gender: GENDER.FEMALE },
        { fullName: 'Walter Henderson', gender: GENDER.MALE },
        { fullName: 'Lily Coleman', gender: GENDER.FEMALE },
        { fullName: 'Ralph Jenkins', gender: GENDER.MALE },
    ],
};

/**
 * Get all users from the database
 */
function getAllUsers() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, username FROM user ORDER BY id';
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error fetching users:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

/**
 * Clear existing guests from the database
 */
function clearGuests() {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM guest', (err) => {
            if (err) {
                console.error('Error clearing guests:', err);
                reject(err);
            } else {
                console.log('✅ Existing guests cleared');
                resolve();
            }
        });
    });
}

/**
 * Insert a single guest into the database
 */
function insertGuest(guest, userId) {
    return new Promise((resolve, reject) => {
        const uuid = uuidv4();
        const query = 'INSERT INTO guest (uuid, fullName, gender, user_id) VALUES (?, ?, ?, ?)';

        const values = [uuid, guest.fullName, guest.gender, userId];

        db.run(query, values, function (err) {
            if (err) {
                console.error(`❌ Error inserting guest ${guest.fullName}:`, err);
                reject(err);
            } else {
                console.log(`✅ Guest ${guest.fullName} inserted with ID: ${this.lastID}`);
                resolve(this.lastID);
            }
        });
    });
}

/**
 * Insert all guests for all users
 */
async function insertAllGuests() {
    console.log('🚀 Starting to insert sample guests...\n');

    try {
        // Get all users
        const users = await getAllUsers();
        console.log(`📋 Found ${users.length} users in database\n`);

        // Clear existing guests first
        await clearGuests();

        let totalGuests = 0;

        // Insert guests for each user
        for (const user of users) {
            const userGuests = sampleGuests[user.username] || [];

            if (userGuests.length > 0) {
                console.log(`👥 Adding ${userGuests.length} guests for user: ${user.username} (ID: ${user.id})`);

                for (const guest of userGuests) {
                    await insertGuest(guest, user.id);
                    totalGuests++;
                }

                console.log(`✅ Completed adding guests for ${user.username}\n`);
            } else {
                console.log(`⚠️  No sample guests found for user: ${user.username}\n`);
            }
        }

        console.log(`🎉 All sample guests inserted successfully!`);
        console.log(`📊 Total guests inserted: ${totalGuests}`);

        // Display summary
        db.get('SELECT COUNT(*) as count FROM guest', (err, row) => {
            if (err) {
                console.error('Error getting guest count:', err);
            } else {
                console.log(`📊 Total guests in database: ${row.count}`);
            }
            db.close();
        });
    } catch (error) {
        console.error('❌ Error during seeding:', error);
        db.close();
        process.exit(1);
    }
}

/**
 * Display all guests in the database grouped by user
 */
function displayAllGuests() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT g.id,
                   g.uuid,
                   g.fullName,
                   g.gender,
                   g.respStatus,
                   g.respDate,
                   u.username,
                   u.husbands_name,
                   u.wifes_name
            FROM guest g
                     LEFT JOIN user u ON g.user_id = u.id
            ORDER BY u.username, g.fullName
        `;

        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error fetching guests:', err);
                reject(err);
            } else {
                console.log('\n📋 Current guests in database:');
                console.log('─'.repeat(140));
                console.log(
                    'ID | UUID (short) | Full Name           | Gender | Status | Response Date | User        | Couple',
                );
                console.log('─'.repeat(140));

                rows.forEach((row) => {
                    const shortUuid = row.uuid.substring(0, 8) + '...';
                    const couple = `${row.husbands_name || ''} & ${row.wifes_name || ''}`.trim();
                    const status = row.respStatus === null ? 'Pending' : row.respStatus === 1 ? 'Accepted' : 'Declined';

                    console.log(
                        `${row.id.toString().padStart(2)} | ` +
                            `${shortUuid.padEnd(12)} | ` +
                            `${row.fullName.padEnd(19)} | ` +
                            `${row.gender.padEnd(6)} | ` +
                            `${status.padEnd(6)} | ` +
                            `${(row.respDate || '').padEnd(13)} | ` +
                            `${row.username.padEnd(11)} | ` +
                            `${couple}`,
                    );
                });

                console.log('─'.repeat(140));

                // Group by user and show counts
                const userCounts = {};
                rows.forEach((row) => {
                    userCounts[row.username] = (userCounts[row.username] || 0) + 1;
                });

                console.log('\n📊 Guests per user:');
                Object.entries(userCounts).forEach(([username, count]) => {
                    console.log(`   ${username}: ${count} guests`);
                });

                resolve(rows);
            }
        });
    });
}

// Main execution
async function main() {
    console.log('🌱 Wedding Guest Database Seeder');
    console.log('=================================\n');

    try {
        // Insert sample guests
        await insertAllGuests();

        // Display all guests
        await displayAllGuests();

        console.log('\n✨ Guest seeding completed successfully!');
    } catch (error) {
        console.error('💥 Guest seeding failed:', error);
        process.exit(1);
    }
}

// Run the seeder
main();
