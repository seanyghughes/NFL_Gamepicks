import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create sample teams
  const teams = [
    { name: 'Kansas City Chiefs', geo: 'Kansas City', stadium: 'Arrowhead Stadium', division: 'AFC West', conference: 'AFC' },
    { name: 'Baltimore Ravens', geo: 'Baltimore', stadium: 'M&T Bank Stadium', division: 'AFC North', conference: 'AFC' },
    { name: 'Buffalo Bills', geo: 'Buffalo', stadium: 'Highmark Stadium', division: 'AFC East', conference: 'AFC' },
    { name: 'Cincinnati Bengals', geo: 'Cincinnati', stadium: 'Paycor Stadium', division: 'AFC North', conference: 'AFC' },
    { name: 'New England Patriots', geo: 'New England', stadium: 'Gillette Stadium', division: 'AFC East', conference: 'AFC' },
    { name: 'Miami Dolphins', geo: 'Miami', stadium: 'Hard Rock Stadium', division: 'AFC East', conference: 'AFC' },
    { name: 'New York Jets', geo: 'New York', stadium: 'MetLife Stadium', division: 'AFC East', conference: 'AFC' },
    { name: 'Pittsburgh Steelers', geo: 'Pittsburgh', stadium: 'Acrisure Stadium', division: 'AFC North', conference: 'AFC' },
    { name: 'Cleveland Browns', geo: 'Cleveland', stadium: 'FirstEnergy Stadium', division: 'AFC North', conference: 'AFC' },
    { name: 'Tennessee Titans', geo: 'Tennessee', stadium: 'Nissan Stadium', division: 'AFC South', conference: 'AFC' },
    { name: 'Indianapolis Colts', geo: 'Indianapolis', stadium: 'Lucas Oil Stadium', division: 'AFC South', conference: 'AFC' },
    { name: 'Jacksonville Jaguars', geo: 'Jacksonville', stadium: 'TIAA Bank Field', division: 'AFC South', conference: 'AFC' },
    { name: 'Houston Texans', geo: 'Houston', stadium: 'NRG Stadium', division: 'AFC South', conference: 'AFC' },
    { name: 'Denver Broncos', geo: 'Denver', stadium: 'Empower Field at Mile High', division: 'AFC West', conference: 'AFC' },
    { name: 'Las Vegas Raiders', geo: 'Las Vegas', stadium: 'Allegiant Stadium', division: 'AFC West', conference: 'AFC' },
    { name: 'Los Angeles Chargers', geo: 'Los Angeles', stadium: 'SoFi Stadium', division: 'AFC West', conference: 'AFC' },
    { name: 'Philadelphia Eagles', geo: 'Philadelphia', stadium: 'Lincoln Financial Field', division: 'NFC East', conference: 'NFC' },
    { name: 'Dallas Cowboys', geo: 'Dallas', stadium: 'AT&T Stadium', division: 'NFC East', conference: 'NFC' },
    { name: 'New York Giants', geo: 'New York', stadium: 'MetLife Stadium', division: 'NFC East', conference: 'NFC' },
    { name: 'Washington Commanders', geo: 'Washington', stadium: 'FedExField', division: 'NFC East', conference: 'NFC' },
    { name: 'Green Bay Packers', geo: 'Green Bay', stadium: 'Lambeau Field', division: 'NFC North', conference: 'NFC' },
    { name: 'Minnesota Vikings', geo: 'Minnesota', stadium: 'U.S. Bank Stadium', division: 'NFC North', conference: 'NFC' },
    { name: 'Detroit Lions', geo: 'Detroit', stadium: 'Ford Field', division: 'NFC North', conference: 'NFC' },
    { name: 'Chicago Bears', geo: 'Chicago', stadium: 'Soldier Field', division: 'NFC North', conference: 'NFC' },
    { name: 'Tampa Bay Buccaneers', geo: 'Tampa Bay', stadium: 'Raymond James Stadium', division: 'NFC South', conference: 'NFC' },
    { name: 'Atlanta Falcons', geo: 'Atlanta', stadium: 'Mercedes-Benz Stadium', division: 'NFC South', conference: 'NFC' },
    { name: 'Carolina Panthers', geo: 'Carolina', stadium: 'Bank of America Stadium', division: 'NFC South', conference: 'NFC' },
    { name: 'New Orleans Saints', geo: 'New Orleans', stadium: 'Caesars Superdome', division: 'NFC South', conference: 'NFC' },
    { name: 'San Francisco 49ers', geo: 'San Francisco', stadium: 'Levi\'s Stadium', division: 'NFC West', conference: 'NFC' },
    { name: 'Seattle Seahawks', geo: 'Seattle', stadium: 'Lumen Field', division: 'NFC West', conference: 'NFC' },
    { name: 'Los Angeles Rams', geo: 'Los Angeles', stadium: 'SoFi Stadium', division: 'NFC West', conference: 'NFC' },
    { name: 'Arizona Cardinals', geo: 'Arizona', stadium: 'State Farm Stadium', division: 'NFC West', conference: 'NFC' }
  ];

  console.log('Creating teams...');
  for (const team of teams) {
    await prisma.teams.upsert({
      where: { name: team.name },
      update: {},
      create: team
    });
  }

  // Create sample games for Week 1
  const currentYear = new Date().getFullYear();
  const sampleGames = [
    {
      year: currentYear,
      week: 1,
      home_team_id: 1, // Chiefs
      road_team_id: 2, // Ravens
      stadium: 'Arrowhead Stadium',
      time: new Date(currentYear, 8, 7, 20, 20), // September 7, 8:20 PM
      is_finalized: false
    },
    {
      year: currentYear,
      week: 1,
      home_team_id: 3, // Bills
      road_team_id: 4, // Bengals
      stadium: 'Highmark Stadium',
      time: new Date(currentYear, 8, 8, 13, 0), // September 8, 1:00 PM
      is_finalized: false
    },
    {
      year: currentYear,
      week: 1,
      home_team_id: 17, // Eagles
      road_team_id: 18, // Cowboys
      stadium: 'Lincoln Financial Field',
      time: new Date(currentYear, 8, 8, 16, 25), // September 8, 4:25 PM
      is_finalized: false
    },
    {
      year: currentYear,
      week: 1,
      home_team_id: 21, // Packers
      road_team_id: 22, // Vikings
      stadium: 'Lambeau Field',
      time: new Date(currentYear, 8, 8, 20, 20), // September 8, 8:20 PM
      is_finalized: false
    },
    {
      year: currentYear,
      week: 1,
      home_team_id: 25, // 49ers
      road_team_id: 26, // Seahawks
      stadium: 'Levi\'s Stadium',
      time: new Date(currentYear, 8, 9, 16, 25), // September 9, 4:25 PM
      is_finalized: false
    }
  ];

  console.log('Creating sample games...');
  for (const game of sampleGames) {
    await prisma.games.create({
      data: game
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 