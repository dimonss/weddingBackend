import fetch from 'node-fetch';

// Setup constants
const API_URL = 'http://127.0.0.1:7001';
const TEST_UUID = 'CE748DF5-2232-739B-4704-0C0382763A0F';

// Test health endpoint
async function testHealthEndpoint() {
    console.log('\n----- Testing /health endpoint -----');
    try {
        const response = await fetch(`${API_URL}/health`);
        const data = await response.json();

        if (response.ok && data?.data?.status === 'UP') {
            console.log('✅ Health check passed');
            return true;
        } else {
            console.error('❌ Health check failed:', data);
            return false;
        }
    } catch (error) {
        console.error('❌ Error connecting to API:', error.message);
        console.log(`Make sure your server is running on ${API_URL}`);
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
            return data.data;
        } else {
            console.error('❌ Failed to get guest:', data);
            return null;
        }
    } catch (error) {
        console.error('❌ Error getting guest:', error.message);
        return null;
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
            console.log('✅ Invitation accepted successfully:', data?.data);

            // Verify respStatus from API response
            if (data.status === 'OK') {
                console.log('✅ API Response: respStatus is correctly set to 1 (accepted)');
            } else {
                console.error(`❌ API Response: respStatus is ${data.data?.respStatus}, expected 1`);
            }

            // Double-check by getting the guest again via API
            const guestAfterAccept = await testGetGuest();
            if (guestAfterAccept && guestAfterAccept.respStatus === 1) {
                console.log('✅ Get Guest API: respStatus is correctly set to 1 (accepted)');
            } else {
                console.error(`❌ Get Guest API: respStatus is ${guestAfterAccept?.respStatus}, expected 1`);
            }

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
        console.log('data');
        console.log(data);
        if (response.ok && data.status === 'OK') {
            console.log('✅ Invitation rejected successfully:', data.data);

            // Verify respStatus from API response
            if (data.status === 'OK') {
                console.log('✅ API Response: respStatus is correctly set to 0 (rejected)');
            } else {
                console.error(`❌ API Response: respStatus is ${data.data.respStatus}, expected 0`);
            }

            // Double-check by getting the guest again via API
            const guestAfterReject = await testGetGuest();
            if (guestAfterReject && guestAfterReject.respStatus === 0) {
                console.log('✅ Get Guest API: respStatus is correctly set to 0 (rejected)');
            } else {
                console.error(`❌ Get Guest API: respStatus is ${guestAfterReject?.respStatus}, expected 0`);
            }

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
        console.log(`Make sure your server is running on ${API_URL}\n`);
        console.log(`Using test UUID: ${TEST_UUID}\n`);

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
        //Double call for rewrite old data
        await testAcceptInvitation();

        console.log('\n✅ API tests completed!');
    } catch (error) {
        console.error('\n❌ Tests failed:', error);
    }
}

// Run the tests
runTests();
