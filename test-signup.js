// Test script to verify signup endpoint
const axios = require('axios');

const testData = {
  companyName: "Test Company",
  name: "John Doe",
  email: "john@test.com",
  phone: "1234567890",
  password: "password123",
  confirmPassword: "password123"
};

async function testSignup() {
  try {
    console.log('Testing signup endpoint...');
    console.log('Data:', testData);
    
    const response = await axios.post('http://localhost:3001/api/auth/signup', testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Success:', response.data);
  } catch (error) {
    console.log('Error:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    });
  }
}

testSignup();