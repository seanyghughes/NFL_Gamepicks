import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🗄️  NFL Game Picks Database Manager');
  console.log('=====================================\n');

  // Example queries you can run:

  // 1. View all teams
  console.log('📋 All Teams:');
  const teams = await prisma.teams.findMany({
    orderBy: { name: 'asc' }
  });
  teams.forEach(team => {
    console.log(`  ${team.id}. ${team.name} (${team.conference} ${team.division})`);
  });

  // 2. View all users
  console.log('\n👥 All Users:');
  const users = await prisma.users.findMany({
    orderBy: { created_at: 'desc' }
  });
  users.forEach(user => {
    console.log(`  ${user.id}. ${user.name} (${user.email})`);
  });

  // 3. View all games
  console.log('\n🏈 All Games:');
  const games = await prisma.games.findMany({
    include: {
      home_team: true,
      road_team: true
    },
    orderBy: { time: 'asc' }
  });
  games.forEach(game => {
    console.log(`  ${game.id}. Week ${game.week}: ${game.road_team.name} @ ${game.home_team.name}`);
  });

  // 4. View all picks
  console.log('\n🎯 All Picks:');
  const picks = await prisma.picks.findMany({
    include: {
      user: true,
      team: true,
      game: {
        include: {
          home_team: true,
          road_team: true
        }
      }
    },
    orderBy: { created_at: 'desc' }
  });
  picks.forEach(pick => {
    console.log(`  ${pick.user.name} picked ${pick.team.name} for ${pick.game.road_team.name} @ ${pick.game.home_team.name}`);
  });

  // 5. View all leagues
  console.log('\n🏆 All Leagues:');
  const leagues = await prisma.leagues.findMany({
    include: {
      createdByUser: true,
      userLeagues: {
        include: {
          user: true
        }
      }
    },
    orderBy: { created_at: 'desc' }
  });
  leagues.forEach(league => {
    console.log(`  ${league.id}. ${league.name} (${league.userLeagues.length} members)`);
  });

  console.log('\n✅ Database query completed!');
  console.log('\n💡 To add data, you can:');
  console.log('   1. Use Prisma Studio: npx prisma studio');
  console.log('   2. Use GraphQL mutations through your app');
  console.log('   3. Modify this script to add data programmatically');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 