const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting custom build process...');

// Set environment variables to avoid webpack issues
process.env.GENERATE_SOURCEMAP = 'false';
process.env.INLINE_RUNTIME_CHUNK = 'false';
process.env.SKIP_PREFLIGHT_CHECK = 'true';
process.env.DISABLE_ESLINT_PLUGIN = 'true';

try {
  // Try to install specific versions of problematic packages
  console.log('📦 Installing specific webpack versions...');
  try {
    execSync('npm install webpack-sources@3.2.3 --no-save', { stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  Could not install specific webpack-sources version');
  }
  
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