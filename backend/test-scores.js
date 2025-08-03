import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addSampleScores() {
  try {
    console.log('🏈 Adding sample scores to games...');

    // Get some games from Week 1
    const games = await prisma.games.findMany({
      where: { week: 1 },
      take: 5 // Take first 5 games
    });

    const sampleScores = [
      { home: 24, road: 17 },
      { home: 31, road: 28 },
      { home: 14, road: 21 },
      { home: 35, road: 10 },
      { home: 20, road: 20 } // Tie game
    ];

    for (let i = 0; i < games.length && i < sampleScores.length; i++) {
      const game = games[i];
      const scores = sampleScores[i];
      
      // Determine winning team
      let winningTeamId = null;
      if (scores.home > scores.road) {
        winningTeamId = game.home_team_id;
      } else if (scores.road > scores.home) {
        winningTeamId = game.road_team_id;
      }
      // If scores are equal, winningTeamId remains null (tie)

      await prisma.games.update({
        where: { id: game.id },
        data: {
          home_score: scores.home,
          road_score: scores.road,
          winning_team_id: winningTeamId,
          is_finalized: true
        }
      });

      console.log(`✅ Updated Game ${game.id}: ${scores.road} @ ${scores.home}`);
    }

    console.log('🎉 Sample scores added successfully!');
  } catch (error) {
    console.error('❌ Error adding sample scores:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSampleScores(); 