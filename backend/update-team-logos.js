import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Team logo mappings based on available images
const teamLogoMappings = {
  "Arizona Cardinals": "/images/Arizona Cardinals.svg",
  "Atlanta Falcons": "/images/Atalanta Falcons.svg", // Note: typo in filename
  "Baltimore Ravens": "/images/Baltimore Ravens.svg",
  "Buffalo Bills": "/images/Buffalo Bills.svg",
  "Carolina Panthers": "/images/Caroline Panthers.svg", // Note: typo in filename
  "Chicago Bears": "/images/Chicago Bears.svg",
  "Cincinnati Bengals": "/images/Cincinnati Bengals.svg",
  "Cleveland Browns": "/images/Cleveland Browns.svg",
  "Dallas Cowboys": "/images/Dallas Cowboys.svg",
  "Denver Broncos": "/images/Denver Broncos.svg",
  "Detroit Lions": "/images/Detroit Lions.svg",
  "Green Bay Packers": "/images/Green Bay Packers.svg",
  "Houston Texans": "/images/Houston Texans.svg",
  "Indianapolis Colts": "/images/Indianapolis Colts.svg",
  "Jacksonville Jaguars": "/images/Jacksonville Jaguars.svg",
  "Kansas City Chiefs": "/images/Kansas City Chiefs.svg",
  "Las Vegas Raiders": "/images/Las Vegas Raiders.svg",
  "Los Angeles Chargers": "/images/Los Angeles Chargers.svg",
  "Los Angeles Rams": "/images/Los Angeles Rams.svg",
  "Miami Dolphins": "/images/Miami Dolphins.svg",
  "Minnesota Vikings": "/images/Minnesota Vikings.svg",
  "New England Patriots": "/images/New England Patriots.svg",
  "New Orleans Saints": "/images/New Orleans Saints.svg",
  "New York Giants": "/images/New York Giants.svg",
  "New York Jets": "/images/New York Jets.svg",
  "Philadelphia Eagles": "/images/Philadelphia Eagles.svg",
  "Pittsburgh Steelers": "/images/Pittsburgh Steelers.svg",
  "San Francisco 49ers": "/images/San Francisco 49ers.svg",
  "Seattle Seahawks": "/images/Seattle Seahawks.svg",
  "Tampa Bay Buccaneers": "/images/Tampa Bay Buccaneers.svg",
  "Tennessee Titans": "/images/Tennessee Titans.svg",
  "Washington Commanders": "/images/Washington Commanders.svg"
};

async function main() {
  console.log('🏈 Updating Team Logos in Database...');
  console.log('=====================================\n');

  let updatedTeams = 0;
  let skippedTeams = 0;

  for (const [teamName, logoUrl] of Object.entries(teamLogoMappings)) {
    try {
      // Find the team
      const team = await prisma.teams.findFirst({
        where: { name: teamName }
      });

      if (!team) {
        console.log(`⚠️  Team not found: ${teamName}`);
        skippedTeams++;
        continue;
      }

      // Update the team's logo URL
      await prisma.teams.update({
        where: { id: team.id },
        data: { logo_url: logoUrl }
      });

      console.log(`✅ Updated: ${teamName} -> ${logoUrl}`);
      updatedTeams++;

    } catch (error) {
      console.error(`❌ Error updating ${teamName}:`, error);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Teams updated: ${updatedTeams}`);
  console.log(`   ⏭️  Teams skipped: ${skippedTeams}`);
  console.log(`   📋 Total teams in mapping: ${Object.keys(teamLogoMappings).length}`);

  // Show updated teams
  console.log('\n📋 Updated Teams with Logos:');
  const teamsWithLogos = await prisma.teams.findMany({
    where: {
      logo_url: { not: null }
    },
    orderBy: { name: 'asc' }
  });

  teamsWithLogos.forEach(team => {
    console.log(`   ${team.name}: ${team.logo_url}`);
  });

  console.log('\n🎯 Team logos successfully updated!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 