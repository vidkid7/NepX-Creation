// API Endpoint Testing Script
const baseUrl = 'http://localhost:3000';

async function testEndpoint(name, url, options = {}) {
  try {
    const response = await fetch(`${baseUrl}${url}`, options);
    const data = await response.json();
    console.log(`✅ ${name}: ${response.status} - ${data.success ? 'SUCCESS' : 'FAILED'}`);
    return { success: true, status: response.status, data };
  } catch (error) {
    console.log(`❌ ${name}: ERROR - ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log('🚀 Starting API Endpoint Tests...\n');
  
  // Test Public APIs
  console.log('📡 Testing Public APIs:');
  await testEndpoint('Public Services', '/api/public/services');
  await testEndpoint('Public Technologies', '/api/public/technologies');
  await testEndpoint('Public Testimonials', '/api/public/testimonials');
  await testEndpoint('Public Projects', '/api/public/projects');
  await testEndpoint('Public Courses', '/api/public/courses');
  await testEndpoint('Public Hero Content', '/api/public/content/hero');
  await testEndpoint('Public About Content', '/api/public/content/about');
  await testEndpoint('Public Contact Content', '/api/public/content/contact');
  
  console.log('\n🔒 Testing Admin APIs (should fail without auth):');
  await testEndpoint('Admin Services', '/api/admin/services');
  await testEndpoint('Admin Projects', '/api/admin/projects');
  await testEndpoint('Admin Dashboard Stats', '/api/admin/dashboard/stats');
  
  console.log('\n✅ API Tests Complete!');
}

runTests();
