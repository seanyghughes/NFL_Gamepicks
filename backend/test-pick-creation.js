import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧪 Testing Pick Creation...');
  console.log('==========================\n');

  try {
    // Get a user
    const user = await prisma.users.findFirst();
    if (!user) {
      console.log('❌ No users found in database');
      return;
    }
    console.log(`✅ Found user: ${user.name} (ID: ${user.id})`);

    // Get a game
    const game = await prisma.games.findFirst();
    if (!game) {
      console.log('❌ No games found in database');
      return;
    }
    console.log(`✅ Found game: ${game.id} (Week ${game.week})`);

    // Get a team
    const team = await prisma.teams.findFirst();
    if (!team) {
      console.log('❌ No teams found in database');
      return;
    }
    console.log(`✅ Found team: ${team.name} (ID: ${team.id})`);

    // Check if pick already exists
    const existingPick = await prisma.picks.findUnique({
      where: {
        user_id_game_id: {
          user_id: user.id,
          game_id: game.id
        }
      }
    });

    if (existingPick) {
      console.log('⚠️  Pick already exists for this user and game');
      console.log(`   Pick ID: ${existingPick.id}`);
      console.log(`   Team ID: ${existingPick.team_id}`);
      return;
    }

    // Try to create a pick
    console.log('\n🎯 Attempting to create pick...');
    const pick = await prisma.picks.create({
      data: {
        team_id: team.id,
        user_id: user.id,
        game_id: game.id
      },
      include: {
        user: true,
        team: true,
        game: {
          include: {
            home_team: true,
            road_team: true
          }
        }
      }
    });

    console.log('✅ Pick created successfully!');
    console.log(`   Pick ID: ${pick.id}`);
    console.log(`   User: ${pick.user.name}`);
    console.log(`   Team: ${pick.team.name}`);
    console.log(`   Game: ${pick.game.road_team.name} @ ${pick.game.home_team.name}`);
    console.log(`   Week: ${pick.game.week}`);

    // Verify the pick was saved
    const savedPick = await prisma.picks.findUnique({
      where: { id: pick.id },
      include: {
        user: true,
        team: true,
        game: true
      }
    });

    if (savedPick) {
      console.log('\n✅ Pick verified in database');
    } else {
      console.log('\n❌ Pick not found in database after creation');
    }

  } catch (error) {
    console.error('❌ Error creating pick:', error);
    
    // Check if it's a unique constraint error
    if (error.code === 'P2002') {
      console.log('🔍 This is a unique constraint violation');
      console.log('   The user may have already made a pick for this game');
    }
  }

  // Show all picks
  console.log('\n📋 All Picks in Database:');
  const allPicks = await prisma.picks.findMany({
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

  if (allPicks.length === 0) {
    console.log('   No picks found');
  } else {
    allPicks.forEach(pick => {
      console.log(`   ${pick.user.name} picked ${pick.team.name} for ${pick.game.road_team.name} @ ${pick.game.home_team.name} (Week ${pick.game.week})`);
    });
  }
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 