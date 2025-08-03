const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting custom build process...');

// Set environment variables to avoid webpack issues
process.env.GENERATE_SOURCEMAP = 'false';
process.env.INLINE_RUNTIME_CHUNK = 'false';

try {
  // Run the build
  console.log('📦 Running React build...');
  execSync('npx react-scripts build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 