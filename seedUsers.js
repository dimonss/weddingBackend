import sqlite3 from 'sqlite3';

// Enable verbose mode for detailed error messages during development
sqlite3.verbose();

// Database configuration
const DB_NAME = 'db.sqlite';
const db = new sqlite3.Database(DB_NAME);

// Sample user data
const sampleUsers = [
    {
        phone: '+380991234567',
        username: 'john_doe',
        auth: 'am9objpkb2UxMjM=', // base64 encoded "john:doe123"
        husbands_name: 'John Doe',
        wifes_name: 'Jane Smith',
        address: 'Kyiv, Ukraine - Beautiful Wedding Venue',
        date: '2024-06-15',
        time: '15:00'
    },
    {
        phone: '+380992345678',
        username: 'mike_wilson',
        auth: 'bWlrZTp3aWxzb24xMjM=', // base64 encoded "mike:wilson123"
        husbands_name: 'Mike Wilson',
        wifes_name: 'Sarah Johnson',
        address: 'Lviv, Ukraine - Romantic Garden',
        date: '2024-07-20',
        time: '16:30'
    },
    {
        phone: '+380993456789',
        username: 'alex_brown',
        auth: 'YWxleDpicm93bjEyMw==', // base64 encoded "alex:brown123"
        husbands_name: 'Alex Brown',
        wifes_name: 'Emma Davis',
        address: 'Odesa, Ukraine - Seaside Resort',
        date: '2024-08-10',
        time: '17:00'
    },
    {
        phone: '+380994567890',
        username: 'david_miller',
        auth: 'ZGF2aWQ6bWlsbGVyMTIz', // base64 encoded "david:miller123"
        husbands_name: 'David Miller',
        wifes_name: 'Lisa Anderson',
        address: 'Kharkiv, Ukraine - Elegant Hall',
        date: '2024-09-05',
        time: '14:30'
    },
    {
        phone: '+380995678901',
        username: 'chris_taylor',
        auth: 'Y2hyaXM6dGF5bG9yMTIz', // base64 encoded "chris:taylor123"
        husbands_name: 'Chris Taylor',
        wifes_name: 'Maria Garcia',
        address: 'Dnipro, Ukraine - Modern Center',
        date: '2024-10-12',
        time: '18:00'
    },
    {
        phone: '+380996789012',
        username: 'james_lee',
        auth: 'amFtZXM6bGVlMTIz', // base64 encoded "james:lee123"
        husbands_name: 'James Lee',
        wifes_name: 'Anna White',
        address: 'Zaporizhzhia, Ukraine - Riverside Venue',
        date: '2024-11-08',
        time: '15:30'
    },
    {
        phone: '+380997890123',
        username: 'robert_clark',
        auth: 'cm9iZXJ0OmNsYXJrMTIz', // base64 encoded "robert:clark123"
        husbands_name: 'Robert Clark',
        wifes_name: 'Sophie Martin',
        address: 'Vinnytsia, Ukraine - Historic Castle',
        date: '2024-12-14',
        time: '16:00'
    },
    {
        phone: '+380998901234',
        username: 'thomas_rodriguez',
        auth: 'dGhvbWFzOnJvZHJpZ3VlejEyMw==', // base64 encoded "thomas:rodriguez123"
        husbands_name: 'Thomas Rodriguez',
        wifes_name: 'Isabella Lopez',
        address: 'Poltava, Ukraine - Country Estate',
        date: '2025-01-18',
        time: '17:30'
    },
    {
        phone: '+380999012345',
        username: 'daniel_martinez',
        auth: 'ZGFuaWVsOm1hcnRpbmV6MTIz', // base64 encoded "daniel:martinez123"
        husbands_name: 'Daniel Martinez',
        wifes_name: 'Olivia Thompson',
        address: 'Chernihiv, Ukraine - Traditional Manor',
        date: '2025-02-22',
        time: '14:00'
    },
    {
        phone: '+380990123456',
        username: 'paul_robinson',
        auth: 'cGF1bDpyb2JpbnNvbjEyMw==', // base64 encoded "paul:robinson123"
        husbands_name: 'Paul Robinson',
        wifes_name: 'Grace Lewis',
        address: 'Sumy, Ukraine - Cozy Restaurant',
        date: '2025-03-15',
        time: '18:30'
    }
];

/**
 * Clear existing users from the database
 */
function clearUsers() {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM user', (err) => {
            if (err) {
                console.error('Error clearing users:', err);
                reject(err);
            } else {
                console.log('✅ Existing users cleared');
                resolve();
            }
        });
    });
}

/**
 * Insert a single user into the database
 */
function insertUser(user) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO user (phone, username, auth, husbands_name, wifes_name, address, date, time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const values = [
            user.phone,
            user.username,
            user.auth,
            user.husbands_name,
            user.wifes_name,
            user.address,
            user.date,
            user.time
        ];

        db.run(query, values, function(err) {
            if (err) {
                console.error(`❌ Error inserting user ${user.username}:`, err);
                reject(err);
            } else {
                console.log(`✅ User ${user.username} inserted with ID: ${this.lastID}`);
                resolve(this.lastID);
            }
        });
    });
}

/**
 * Insert all sample users
 */
async function insertAllUsers() {
    console.log('🚀 Starting to insert sample users...\n');
    
    try {
        // Clear existing users first
        await clearUsers();
        
        // Insert all sample users
        for (const user of sampleUsers) {
            await insertUser(user);
        }
        
        console.log('\n🎉 All sample users inserted successfully!');
        
        // Display summary
        db.get('SELECT COUNT(*) as count FROM user', (err, row) => {
            if (err) {
                console.error('Error getting user count:', err);
            } else {
                console.log(`📊 Total users in database: ${row.count}`);
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
 * Display all users in the database
 */
function displayAllUsers() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, username, phone, husbands_name, wifes_name, date, time, address FROM user ORDER BY id';
        
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error fetching users:', err);
                reject(err);
            } else {
                console.log('\n📋 Current users in database:');
                console.log('─'.repeat(120));
                console.log('ID | Username      | Phone          | Husband\'s Name | Wife\'s Name   | Date       | Time  | Address');
                console.log('─'.repeat(120));
                
                rows.forEach(row => {
                    console.log(
                        `${row.id.toString().padStart(2)} | ` +
                        `${row.username.padEnd(13)} | ` +
                        `${row.phone.padEnd(14)} | ` +
                        `${(row.husbands_name || '').padEnd(14)} | ` +
                        `${(row.wifes_name || '').padEnd(12)} | ` +
                        `${(row.date || '').padEnd(10)} | ` +
                        `${(row.time || '').padEnd(5)} | ` +
                        `${row.address || ''}`
                    );
                });
                
                console.log('─'.repeat(120));
                resolve(rows);
            }
        });
    });
}

// Main execution
async function main() {
    console.log('🌱 Wedding User Database Seeder');
    console.log('================================\n');
    
    try {
        // Insert sample users
        await insertAllUsers();
        
        // Display all users
        await displayAllUsers();
        
        console.log('\n✨ Seeding completed successfully!');
        
    } catch (error) {
        console.error('💥 Seeding failed:', error);
        process.exit(1);
    }
}

// Run the seeder
main(); 