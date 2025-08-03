import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🏈 Checking Team Logos in Database...');
  console.log('=====================================\n');

  const teams = await prisma.teams.findMany({
    orderBy: { name: 'asc' }
  });

  console.log('📋 Teams with Logo URLs:');
  teams.forEach(team => {
    const logoStatus = team.logo_url ? '✅' : '❌';
    console.log(`${logoStatus} ${team.name}: ${team.logo_url || 'No logo'}`);
  });

  const teamsWithLogos = teams.filter(team => team.logo_url);
  const teamsWithoutLogos = teams.filter(team => !team.logo_url);

  console.log('\n📊 Summary:');
  console.log(`   ✅ Teams with logos: ${teamsWithLogos.length}`);
  console.log(`   ❌ Teams without logos: ${teamsWithoutLogos.length}`);
  console.log(`   📋 Total teams: ${teams.length}`);

  if (teamsWithoutLogos.length > 0) {
    console.log('\n⚠️  Teams missing logos:');
    teamsWithoutLogos.forEach(team => {
      console.log(`   - ${team.name}`);
    });
  }

  console.log('\n🎯 Team logo check completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 