// Authentication Debug Utilities

export const debugAuth = {
  // Test API connection
  async testConnection() {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      console.log('✅ Backend connection successful:', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Backend connection failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Test registration
  async testRegister() {
    const testUser = {
      firstName: 'Test',
      lastName: 'User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(testUser)
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Registration test successful:', data);
        return { success: true, data, testUser };
      } else {
        console.error('❌ Registration test failed:', data);
        return { success: false, error: data.message, testUser };
      }
    } catch (error) {
      console.error('❌ Registration test error:', error);
      return { success: false, error: error.message, testUser };
    }
  },

  // Test login
  async testLogin(email = 'test@example.com', password = 'password123') {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Login test successful:', data);
        return { success: true, data };
      } else {
        console.error('❌ Login test failed:', data);
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('❌ Login test error:', error);
      return { success: false, error: error.message };
    }
  },

  // Check local storage
  checkLocalStorage() {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    console.log('🔍 Local Storage Check:');
    console.log('Token:', token ? '✅ Present' : '❌ Missing');
    console.log('User:', user ? '✅ Present' : '❌ Missing');
    
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log('User data:', parsedUser);
      } catch (error) {
        console.error('❌ Invalid user data in localStorage:', error);
      }
    }

    return { token, user };
  },

  // Clear auth data
  clearAuth() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    console.log('🧹 Authentication data cleared');
  },

  // Run all tests
  async runAllTests() {
    console.log('🧪 Running Authentication Debug Tests...\n');
    
    // Test 1: Backend connection
    console.log('1. Testing backend connection...');
    const connectionTest = await this.testConnection();
    
    if (!connectionTest.success) {
      console.log('❌ Backend is not running. Please start it with: npm run dev');
      return;
    }

    // Test 2: Registration
    console.log('\n2. Testing registration...');
    const registerTest = await this.testRegister();
    
    // Test 3: Login (if registration succeeded)
    if (registerTest.success) {
      console.log('\n3. Testing login with registered user...');
      await this.testLogin(registerTest.testUser.email, registerTest.testUser.password);
    } else {
      console.log('\n3. Testing login with default credentials...');
      await this.testLogin();
    }

    // Test 4: Local storage
    console.log('\n4. Checking local storage...');
    this.checkLocalStorage();

    console.log('\n🏁 Debug tests completed!');
  }
};

// Make it available globally for easy debugging
if (typeof window !== 'undefined') {
  window.debugAuth = debugAuth;
}