import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 NFL Game Picks Backend Setup');
console.log('================================\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  
  const envContent = `# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/nfl_gamepicks"

# JWT Secret (change this in production!)
JWT_SECRET="your-secret-key-change-this-in-production"

# Server Configuration
PORT=4000
`;
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('⚠️  Please update the DATABASE_URL with your actual database credentials');
} else {
  console.log('✅ .env file already exists');
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('\n📦 Installing dependencies...');
  console.log('Run: npm install');
} else {
  console.log('✅ Dependencies are installed');
}

console.log('\n📋 Next Steps:');
console.log('1. Update the DATABASE_URL in .env with your database credentials');
console.log('2. Run: npm install (if not already done)');
console.log('3. Run: npx prisma generate');
console.log('4. Run: npx prisma db push');
console.log('5. Run: npm start');
console.log('\n🎯 Your GraphQL server will be available at: http://localhost:4000');

console.log('\n💡 For development, you can also use SQLite:');
console.log('   Update prisma/schema.prisma to use:');
console.log('   provider = "sqlite"');
console.log('   url = "file:./dev.db"'); 