// Validation Debug Utilities

export const validationDebug = {
  // Test different registration scenarios
  async testRegistrationValidation() {
    console.log('🧪 Testing Registration Validation...\n');

    const testCases = [
      {
        name: 'Valid Registration',
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: `test${Date.now()}@example.com`,
          password: 'password123',
          phone: '1234567890'
        },
        shouldPass: true
      },
      {
        name: 'Valid Registration (No Phone)',
        data: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: `test${Date.now()}@example.com`,
          password: 'password123'
        },
        shouldPass: true
      },
      {
        name: 'Valid Registration (Empty Phone)',
        data: {
          firstName: 'Bob',
          lastName: 'Johnson',
          email: `test${Date.now()}@example.com`,
          password: 'password123',
          phone: ''
        },
        shouldPass: true
      },
      {
        name: 'Invalid Email',
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'invalid-email',
          password: 'password123'
        },
        shouldPass: false
      },
      {
        name: 'Short Password',
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: `test${Date.now()}@example.com`,
          password: '123'
        },
        shouldPass: false
      },
      {
        name: 'Missing First Name',
        data: {
          firstName: '',
          lastName: 'Doe',
          email: `test${Date.now()}@example.com`,
          password: 'password123'
        },
        shouldPass: false
      },
      {
        name: 'Missing Last Name',
        data: {
          firstName: 'John',
          lastName: '',
          email: `test${Date.now()}@example.com`,
          password: 'password123'
        },
        shouldPass: false
      },
      {
        name: 'Invalid Phone (Letters)',
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: `test${Date.now()}@example.com`,
          password: 'password123',
          phone: 'abc123def'
        },
        shouldPass: false
      },
      {
        name: 'Valid Phone with Plus',
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: `test${Date.now()}@example.com`,
          password: 'password123',
          phone: '+1234567890'
        },
        shouldPass: true
      }
    ];

    const results = [];

    for (const testCase of testCases) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(testCase.data)
        });

        const data = await response.json();
        const passed = response.ok;
        const result = {
          ...testCase,
          passed,
          response: data,
          status: response.status
        };

        if (passed === testCase.shouldPass) {
          console.log(`✅ ${testCase.name}: PASSED`);
        } else {
          console.log(`❌ ${testCase.name}: FAILED`);
          console.log(`   Expected: ${testCase.shouldPass ? 'Success' : 'Failure'}`);
          console.log(`   Got: ${passed ? 'Success' : 'Failure'}`);
          if (!passed && data.errors) {
            console.log(`   Errors: ${data.errors.map(e => e.msg).join(', ')}`);
          }
        }

        results.push(result);
      } catch (error) {
        console.log(`❌ ${testCase.name}: ERROR - ${error.message}`);
        results.push({
          ...testCase,
          passed: false,
          error: error.message
        });
      }
    }

    console.log(`\n📊 Test Results: ${results.filter(r => r.passed === r.shouldPass).length}/${results.length} passed`);
    return results;
  },

  // Validate form data client-side
  validateRegistrationData(formData) {
    const errors = [];

    // First name validation
    if (!formData.firstName || formData.firstName.trim().length === 0) {
      errors.push('First name is required');
    }

    // Last name validation
    if (!formData.lastName || formData.lastName.trim().length === 0) {
      errors.push('Last name is required');
    }

    // Email validation
    if (!formData.email || formData.email.trim().length === 0) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please provide a valid email address');
    }

    // Password validation
    if (!formData.password) {
      errors.push('Password is required');
    } else if (formData.password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    // Phone validation (optional)
    if (formData.phone && formData.phone.trim().length > 0) {
      const phoneRegex = /^[+]?[1-9][\d]{9,14}$/;
      const cleanPhone = formData.phone.replace(/[^\d+]/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        errors.push('Phone number must be 10-15 digits, optionally starting with +');
      }
    }

    // Confirm password validation
    if (formData.confirmPassword !== formData.password) {
      errors.push('Passwords do not match');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Clean phone number
  cleanPhoneNumber(phone) {
    if (!phone) return '';
    return phone.replace(/[^\d+]/g, '');
  },

  // Format validation errors for display
  formatValidationErrors(errors) {
    if (!errors || !Array.isArray(errors)) return 'Validation failed';
    
    const errorMessages = errors.map(error => {
      if (typeof error === 'string') return error;
      if (error.msg) return error.msg;
      return 'Unknown validation error';
    });

    return errorMessages.join(', ');
  }
};

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  window.validationDebug = validationDebug;
}