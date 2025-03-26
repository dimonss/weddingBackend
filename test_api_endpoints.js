import fetch from 'node-fetch';
import sqlite3 from 'sqlite3';

// Setup constants
const API_URL = 'http://127.0.0.1:7001';
const TEST_UUID = 'CE748DF5-2232-739B-4704-0C0382763A0F';
const DB_NAME = 'db.sqlite';

// Enable verbose mode for sqlite
sqlite3.verbose();
const db = new sqlite3.Database(DB_NAME);

// Test health endpoint
async function testHealthEndpoint() {
    console.log('\n----- Testing /health endpoint -----');
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();

        if (response.ok && data.status === 'UP') {
            console.log('✅ Health check passed');
            return true;
        } else {
            console.error('❌ Health check failed:', data);
            return false;
        }
    } catch (error) {
        console.error('❌ Error connecting to API:', error.message);
        console.log('Make sure your server is running on port 7000');
        return false;
    }
}

// Test getting a guest by UUID
async function testGetGuest() {
    console.log('\n----- Testing /guest/:uuid endpoint -----');
    try {
        const response = await fetch(`${API_URL}/guest/${TEST_UUID}`);
        const data = await response.json();

        if (response.ok && data.status === 'OK') {
            console.log('✅ Got guest successfully:', data.data);
            return true;
        } else {
            console.error('❌ Failed to get guest:', data);
            return false;
        }
    } catch (error) {
        console.error('❌ Error getting guest:', error.message);
        return false;
    }
}

// Test accepting an invitation
async function testAcceptInvitation() {
    console.log('\n----- Testing /guest_accept/:uuid endpoint -----');
    try {
        const response = await fetch(`${API_URL}/guest_accept/${TEST_UUID}`, {
            method: 'POST',
        });
        const data = await response.json();

        if (response.ok && data.status === 'OK') {
            console.log('✅ Invitation accepted successfully:', data.data);
            return true;
        } else {
            console.error('❌ Failed to accept invitation:', data);
            return false;
        }
    } catch (error) {
        console.error('❌ Error accepting invitation:', error.message);
        return false;
    }
}

// Test rejecting an invitation
async function testRejectInvitation() {
    console.log('\n----- Testing /guest_reject/:uuid endpoint -----');
    try {
        const response = await fetch(`${API_URL}/guest_reject/${TEST_UUID}`, {
            method: 'POST',
        });
        const data = await response.json();

        if (response.ok && data.status === 'OK') {
            console.log('✅ Invitation rejected successfully:', data.data);
            return true;
        } else {
            console.error('❌ Failed to reject invitation:', data);
            return false;
        }
    } catch (error) {
        console.error('❌ Error rejecting invitation:', error.message);
        return false;
    }
}

// Run all tests
async function runTests() {
    try {
        console.log('\nStarting API endpoint tests...');
        console.log('Make sure your server is running on port 7000\n');

        // First check if the server is reachable
        const healthCheck = await testHealthEndpoint();
        if (!healthCheck) {
            console.error('\n❌ Server health check failed. Please start your server and try again.');
            return;
        }

        // Run the remaining tests
        await testGetGuest();
        await testAcceptInvitation();
        await testRejectInvitation();

        console.log('\n✅ API tests completed!');
    } catch (error) {
        console.error('\n❌ Tests failed:', error);
    } finally {
        db.close();
    }
}

// Run the tests
runTests();
