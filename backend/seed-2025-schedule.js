import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 2025 NFL Schedule Data
const nflSchedule2025 = [
  // Week 1 (September 4-8, 2025)
  {
    week: 1,
    home_team: "Kansas City Chiefs",
    road_team: "Baltimore Ravens",
    stadium: "Arrowhead Stadium",
    time: new Date(2025, 8, 4, 20, 20), // September 4, 8:20 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Buffalo Bills",
    road_team: "Cincinnati Bengals",
    stadium: "Highmark Stadium",
    time: new Date(2025, 8, 7, 13, 0), // September 7, 1:00 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Philadelphia Eagles",
    road_team: "Dallas Cowboys",
    stadium: "Lincoln Financial Field",
    time: new Date(2025, 8, 7, 16, 25), // September 7, 4:25 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Green Bay Packers",
    road_team: "Minnesota Vikings",
    stadium: "Lambeau Field",
    time: new Date(2025, 8, 7, 20, 20), // September 7, 8:20 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "San Francisco 49ers",
    road_team: "Seattle Seahawks",
    stadium: "Levi's Stadium",
    time: new Date(2025, 8, 8, 16, 25), // September 8, 4:25 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "New England Patriots",
    road_team: "Miami Dolphins",
    stadium: "Gillette Stadium",
    time: new Date(2025, 8, 7, 13, 0), // September 7, 1:00 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Pittsburgh Steelers",
    road_team: "Cleveland Browns",
    stadium: "Acrisure Stadium",
    time: new Date(2025, 8, 7, 13, 0), // September 7, 1:00 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Tennessee Titans",
    road_team: "Indianapolis Colts",
    stadium: "Nissan Stadium",
    time: new Date(2025, 8, 7, 13, 0), // September 7, 1:00 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Jacksonville Jaguars",
    road_team: "Houston Texans",
    stadium: "TIAA Bank Field",
    time: new Date(2025, 8, 7, 13, 0), // September 7, 1:00 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Denver Broncos",
    road_team: "Las Vegas Raiders",
    stadium: "Empower Field at Mile High",
    time: new Date(2025, 8, 7, 16, 5), // September 7, 4:05 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Los Angeles Chargers",
    road_team: "Arizona Cardinals",
    stadium: "SoFi Stadium",
    time: new Date(2025, 8, 7, 16, 5), // September 7, 4:05 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "New York Giants",
    road_team: "Washington Commanders",
    stadium: "MetLife Stadium",
    time: new Date(2025, 8, 7, 13, 0), // September 7, 1:00 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Chicago Bears",
    road_team: "Detroit Lions",
    stadium: "Soldier Field",
    time: new Date(2025, 8, 7, 13, 0), // September 7, 1:00 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Tampa Bay Buccaneers",
    road_team: "Atlanta Falcons",
    stadium: "Raymond James Stadium",
    time: new Date(2025, 8, 7, 13, 0), // September 7, 1:00 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "New Orleans Saints",
    road_team: "Carolina Panthers",
    stadium: "Caesars Superdome",
    time: new Date(2025, 8, 7, 13, 0), // September 7, 1:00 PM
    year: 2025
  },
  {
    week: 1,
    home_team: "Los Angeles Rams",
    road_team: "New York Jets",
    stadium: "SoFi Stadium",
    time: new Date(2025, 8, 8, 20, 15), // September 8, 8:15 PM
    year: 2025
  },

  // Week 2 (September 11-15, 2025)
  {
    week: 2,
    home_team: "Baltimore Ravens",
    road_team: "Kansas City Chiefs",
    stadium: "M&T Bank Stadium",
    time: new Date(2025, 8, 11, 20, 15), // September 11, 8:15 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Cincinnati Bengals",
    road_team: "Buffalo Bills",
    stadium: "Paycor Stadium",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Dallas Cowboys",
    road_team: "Philadelphia Eagles",
    stadium: "AT&T Stadium",
    time: new Date(2025, 8, 14, 16, 25), // September 14, 4:25 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Minnesota Vikings",
    road_team: "Green Bay Packers",
    stadium: "U.S. Bank Stadium",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Seattle Seahawks",
    road_team: "San Francisco 49ers",
    stadium: "Lumen Field",
    time: new Date(2025, 8, 14, 16, 5), // September 14, 4:05 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Miami Dolphins",
    road_team: "New England Patriots",
    stadium: "Hard Rock Stadium",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Cleveland Browns",
    road_team: "Pittsburgh Steelers",
    stadium: "FirstEnergy Stadium",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Indianapolis Colts",
    road_team: "Tennessee Titans",
    stadium: "Lucas Oil Stadium",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Houston Texans",
    road_team: "Jacksonville Jaguars",
    stadium: "NRG Stadium",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Las Vegas Raiders",
    road_team: "Denver Broncos",
    stadium: "Allegiant Stadium",
    time: new Date(2025, 8, 14, 16, 5), // September 14, 4:05 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Arizona Cardinals",
    road_team: "Los Angeles Chargers",
    stadium: "State Farm Stadium",
    time: new Date(2025, 8, 14, 16, 5), // September 14, 4:05 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Washington Commanders",
    road_team: "New York Giants",
    stadium: "FedExField",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Detroit Lions",
    road_team: "Chicago Bears",
    stadium: "Ford Field",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Atlanta Falcons",
    road_team: "Tampa Bay Buccaneers",
    stadium: "Mercedes-Benz Stadium",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "Carolina Panthers",
    road_team: "New Orleans Saints",
    stadium: "Bank of America Stadium",
    time: new Date(2025, 8, 14, 13, 0), // September 14, 1:00 PM
    year: 2025
  },
  {
    week: 2,
    home_team: "New York Jets",
    road_team: "Los Angeles Rams",
    stadium: "MetLife Stadium",
    time: new Date(2025, 8, 15, 20, 20), // September 15, 8:20 PM
    year: 2025
  },

  // Week 3 (September 18-22, 2025)
  {
    week: 3,
    home_team: "Kansas City Chiefs",
    road_team: "Buffalo Bills",
    stadium: "Arrowhead Stadium",
    time: new Date(2025, 8, 18, 20, 15), // September 18, 8:15 PM
    year: 2025
  },
  {
    week: 3,
    home_team: "Baltimore Ravens",
    road_team: "Cincinnati Bengals",
    stadium: "M&T Bank Stadium",
    time: new Date(2025, 8, 21, 13, 0), // September 21, 1:00 PM
    year: 2025
  },
  {
    week: 3,
    home_team: "Philadelphia Eagles",
    road_team: "Dallas Cowboys",
    stadium: "Lincoln Financial Field",
    time: new Date(2025, 8, 21, 16, 25), // September 21, 4:25 PM
    year: 2025
  },
  {
    week: 3,
    home_team: "Green Bay Packers",
    road_team: "Minnesota Vikings",
    stadium: "Lambeau Field",
    time: new Date(2025, 8, 21, 13, 0), // September 21, 1:00 PM
    year: 2025
  },
  {
    week: 3,
    home_team: "San Francisco 49ers",
    road_team: "Seattle Seahawks",
    stadium: "Levi's Stadium",
    time: new Date(2025, 8, 21, 16, 5), // September 21, 4:05 PM
    year: 2025
  },

  // Week 4 (September 25-29, 2025)
  {
    week: 4,
    home_team: "Buffalo Bills",
    road_team: "Kansas City Chiefs",
    stadium: "Highmark Stadium",
    time: new Date(2025, 8, 25, 20, 15), // September 25, 8:15 PM
    year: 2025
  },
  {
    week: 4,
    home_team: "Cincinnati Bengals",
    road_team: "Baltimore Ravens",
    stadium: "Paycor Stadium",
    time: new Date(2025, 8, 28, 13, 0), // September 28, 1:00 PM
    year: 2025
  },
  {
    week: 4,
    home_team: "Dallas Cowboys",
    road_team: "Philadelphia Eagles",
    stadium: "AT&T Stadium",
    time: new Date(2025, 8, 28, 16, 25), // September 28, 4:25 PM
    year: 2025
  },
  {
    week: 4,
    home_team: "Minnesota Vikings",
    road_team: "Green Bay Packers",
    stadium: "U.S. Bank Stadium",
    time: new Date(2025, 8, 28, 13, 0), // September 28, 1:00 PM
    year: 2025
  },
  {
    week: 4,
    home_team: "Seattle Seahawks",
    road_team: "San Francisco 49ers",
    stadium: "Lumen Field",
    time: new Date(2025, 8, 28, 16, 5), // September 28, 4:05 PM
    year: 2025
  },

  // Week 5 (October 2-6, 2025)
  {
    week: 5,
    home_team: "Kansas City Chiefs",
    road_team: "Baltimore Ravens",
    stadium: "Arrowhead Stadium",
    time: new Date(2025, 9, 2, 20, 15), // October 2, 8:15 PM
    year: 2025
  },
  {
    week: 5,
    home_team: "Buffalo Bills",
    road_team: "Cincinnati Bengals",
    stadium: "Highmark Stadium",
    time: new Date(2025, 9, 5, 13, 0), // October 5, 1:00 PM
    year: 2025
  },
  {
    week: 5,
    home_team: "Philadelphia Eagles",
    road_team: "Dallas Cowboys",
    stadium: "Lincoln Financial Field",
    time: new Date(2025, 9, 5, 16, 25), // October 5, 4:25 PM
    year: 2025
  },
  {
    week: 5,
    home_team: "Green Bay Packers",
    road_team: "Minnesota Vikings",
    stadium: "Lambeau Field",
    time: new Date(2025, 9, 5, 13, 0), // October 5, 1:00 PM
    year: 2025
  },
  {
    week: 5,
    home_team: "San Francisco 49ers",
    road_team: "Seattle Seahawks",
    stadium: "Levi's Stadium",
    time: new Date(2025, 9, 5, 16, 5), // October 5, 4:05 PM
    year: 2025
  },

  // Week 6 (October 9-13, 2025)
  {
    week: 6,
    home_team: "Baltimore Ravens",
    road_team: "Kansas City Chiefs",
    stadium: "M&T Bank Stadium",
    time: new Date(2025, 9, 9, 20, 15), // October 9, 8:15 PM
    year: 2025
  },
  {
    week: 6,
    home_team: "Cincinnati Bengals",
    road_team: "Buffalo Bills",
    stadium: "Paycor Stadium",
    time: new Date(2025, 9, 12, 13, 0), // October 12, 1:00 PM
    year: 2025
  },
  {
    week: 6,
    home_team: "Dallas Cowboys",
    road_team: "Philadelphia Eagles",
    stadium: "AT&T Stadium",
    time: new Date(2025, 9, 12, 16, 25), // October 12, 4:25 PM
    year: 2025
  },
  {
    week: 6,
    home_team: "Minnesota Vikings",
    road_team: "Green Bay Packers",
    stadium: "U.S. Bank Stadium",
    time: new Date(2025, 9, 12, 13, 0), // October 12, 1:00 PM
    year: 2025
  },
  {
    week: 6,
    home_team: "Seattle Seahawks",
    road_team: "San Francisco 49ers",
    stadium: "Lumen Field",
    time: new Date(2025, 9, 12, 16, 5), // October 12, 4:05 PM
    year: 2025
  },

  // Week 7 (October 16-20, 2025)
  {
    week: 7,
    home_team: "Kansas City Chiefs",
    road_team: "Buffalo Bills",
    stadium: "Arrowhead Stadium",
    time: new Date(2025, 9, 16, 20, 15), // October 16, 8:15 PM
    year: 2025
  },
  {
    week: 7,
    home_team: "Baltimore Ravens",
    road_team: "Cincinnati Bengals",
    stadium: "M&T Bank Stadium",
    time: new Date(2025, 9, 19, 13, 0), // October 19, 1:00 PM
    year: 2025
  },
  {
    week: 7,
    home_team: "Philadelphia Eagles",
    road_team: "Dallas Cowboys",
    stadium: "Lincoln Financial Field",
    time: new Date(2025, 9, 19, 16, 25), // October 19, 4:25 PM
    year: 2025
  },
  {
    week: 7,
    home_team: "Green Bay Packers",
    road_team: "Minnesota Vikings",
    stadium: "Lambeau Field",
    time: new Date(2025, 9, 19, 13, 0), // October 19, 1:00 PM
    year: 2025
  },
  {
    week: 7,
    home_team: "San Francisco 49ers",
    road_team: "Seattle Seahawks",
    stadium: "Levi's Stadium",
    time: new Date(2025, 9, 19, 16, 5), // October 19, 4:05 PM
    year: 2025
  },

  // Week 8 (October 23-27, 2025)
  {
    week: 8,
    home_team: "Buffalo Bills",
    road_team: "Kansas City Chiefs",
    stadium: "Highmark Stadium",
    time: new Date(2025, 9, 23, 20, 15), // October 23, 8:15 PM
    year: 2025
  },
  {
    week: 8,
    home_team: "Cincinnati Bengals",
    road_team: "Baltimore Ravens",
    stadium: "Paycor Stadium",
    time: new Date(2025, 9, 26, 13, 0), // October 26, 1:00 PM
    year: 2025
  },
  {
    week: 8,
    home_team: "Dallas Cowboys",
    road_team: "Philadelphia Eagles",
    stadium: "AT&T Stadium",
    time: new Date(2025, 9, 26, 16, 25), // October 26, 4:25 PM
    year: 2025
  },
  {
    week: 8,
    home_team: "Minnesota Vikings",
    road_team: "Green Bay Packers",
    stadium: "U.S. Bank Stadium",
    time: new Date(2025, 9, 26, 13, 0), // October 26, 1:00 PM
    year: 2025
  },
  {
    week: 8,
    home_team: "Seattle Seahawks",
    road_team: "San Francisco 49ers",
    stadium: "Lumen Field",
    time: new Date(2025, 9, 26, 16, 5), // October 26, 4:05 PM
    year: 2025
  },

  // Week 9 (October 30 - November 3, 2025)
  {
    week: 9,
    home_team: "Kansas City Chiefs",
    road_team: "Baltimore Ravens",
    stadium: "Arrowhead Stadium",
    time: new Date(2025, 9, 30, 20, 15), // October 30, 8:15 PM
    year: 2025
  },
  {
    week: 9,
    home_team: "Buffalo Bills",
    road_team: "Cincinnati Bengals",
    stadium: "Highmark Stadium",
    time: new Date(2025, 10, 2, 13, 0), // November 2, 1:00 PM
    year: 2025
  },
  {
    week: 9,
    home_team: "Philadelphia Eagles",
    road_team: "Dallas Cowboys",
    stadium: "Lincoln Financial Field",
    time: new Date(2025, 10, 2, 16, 25), // November 2, 4:25 PM
    year: 2025
  },
  {
    week: 9,
    home_team: "Green Bay Packers",
    road_team: "Minnesota Vikings",
    stadium: "Lambeau Field",
    time: new Date(2025, 10, 2, 13, 0), // November 2, 1:00 PM
    year: 2025
  },
  {
    week: 9,
    home_team: "San Francisco 49ers",
    road_team: "Seattle Seahawks",
    stadium: "Levi's Stadium",
    time: new Date(2025, 10, 2, 16, 5), // November 2, 4:05 PM
    year: 2025
  },

  // Week 10 (November 6-10, 2025)
  {
    week: 10,
    home_team: "Baltimore Ravens",
    road_team: "Kansas City Chiefs",
    stadium: "M&T Bank Stadium",
    time: new Date(2025, 10, 6, 20, 15), // November 6, 8:15 PM
    year: 2025
  },
  {
    week: 10,
    home_team: "Cincinnati Bengals",
    road_team: "Buffalo Bills",
    stadium: "Paycor Stadium",
    time: new Date(2025, 10, 9, 13, 0), // November 9, 1:00 PM
    year: 2025
  },
  {
    week: 10,
    home_team: "Dallas Cowboys",
    road_team: "Philadelphia Eagles",
    stadium: "AT&T Stadium",
    time: new Date(2025, 10, 9, 16, 25), // November 9, 4:25 PM
    year: 2025
  },
  {
    week: 10,
    home_team: "Minnesota Vikings",
    road_team: "Green Bay Packers",
    stadium: "U.S. Bank Stadium",
    time: new Date(2025, 10, 9, 13, 0), // November 9, 1:00 PM
    year: 2025
  },
  {
    week: 10,
    home_team: "Seattle Seahawks",
    road_team: "San Francisco 49ers",
    stadium: "Lumen Field",
    time: new Date(2025, 10, 9, 16, 5), // November 9, 4:05 PM
    year: 2025
  },

  // Week 11 (November 13-17, 2025)
  {
    week: 11,
    home_team: "Kansas City Chiefs",
    road_team: "Buffalo Bills",
    stadium: "Arrowhead Stadium",
    time: new Date(2025, 10, 13, 20, 15), // November 13, 8:15 PM
    year: 2025
  },
  {
    week: 11,
    home_team: "Baltimore Ravens",
    road_team: "Cincinnati Bengals",
    stadium: "M&T Bank Stadium",
    time: new Date(2025, 10, 16, 13, 0), // November 16, 1:00 PM
    year: 2025
  },
  {
    week: 11,
    home_team: "Philadelphia Eagles",
    road_team: "Dallas Cowboys",
    stadium: "Lincoln Financial Field",
    time: new Date(2025, 10, 16, 16, 25), // November 16, 4:25 PM
    year: 2025
  },
  {
    week: 11,
    home_team: "Green Bay Packers",
    road_team: "Minnesota Vikings",
    stadium: "Lambeau Field",
    time: new Date(2025, 10, 16, 13, 0), // November 16, 1:00 PM
    year: 2025
  },
  {
    week: 11,
    home_team: "San Francisco 49ers",
    road_team: "Seattle Seahawks",
    stadium: "Levi's Stadium",
    time: new Date(2025, 10, 16, 16, 5), // November 16, 4:05 PM
    year: 2025
  },

  // Week 12 (November 20-24, 2025)
  {
    week: 12,
    home_team: "Buffalo Bills",
    road_team: "Kansas City Chiefs",
    stadium: "Highmark Stadium",
    time: new Date(2025, 10, 20, 20, 15), // November 20, 8:15 PM
    year: 2025
  },
  {
    week: 12,
    home_team: "Cincinnati Bengals",
    road_team: "Baltimore Ravens",
    stadium: "Paycor Stadium",
    time: new Date(2025, 10, 23, 13, 0), // November 23, 1:00 PM
    year: 2025
  },
  {
    week: 12,
    home_team: "Dallas Cowboys",
    road_team: "Philadelphia Eagles",
    stadium: "AT&T Stadium",
    time: new Date(2025, 10, 23, 16, 25), // November 23, 4:25 PM
    year: 2025
  },
  {
    week: 12,
    home_team: "Minnesota Vikings",
    road_team: "Green Bay Packers",
    stadium: "U.S. Bank Stadium",
    time: new Date(2025, 10, 23, 13, 0), // November 23, 1:00 PM
    year: 2025
  },
  {
    week: 12,
    home_team: "Seattle Seahawks",
    road_team: "San Francisco 49ers",
    stadium: "Lumen Field",
    time: new Date(2025, 10, 23, 16, 5), // November 23, 4:05 PM
    year: 2025
  },

  // Week 13 (November 27 - December 1, 2025)
  {
    week: 13,
    home_team: "Kansas City Chiefs",
    road_team: "Baltimore Ravens",
    stadium: "Arrowhead Stadium",
    time: new Date(2025, 10, 27, 20, 15), // November 27, 8:15 PM
    year: 2025
  },
  {
    week: 13,
    home_team: "Buffalo Bills",
    road_team: "Cincinnati Bengals",
    stadium: "Highmark Stadium",
    time: new Date(2025, 10, 30, 13, 0), // November 30, 1:00 PM
    year: 2025
  },
  {
    week: 13,
    home_team: "Philadelphia Eagles",
    road_team: "Dallas Cowboys",
    stadium: "Lincoln Financial Field",
    time: new Date(2025, 10, 30, 16, 25), // November 30, 4:25 PM
    year: 2025
  },
  {
    week: 13,
    home_team: "Green Bay Packers",
    road_team: "Minnesota Vikings",
    stadium: "Lambeau Field",
    time: new Date(2025, 10, 30, 13, 0), // November 30, 1:00 PM
    year: 2025
  },
  {
    week: 13,
    home_team: "San Francisco 49ers",
    road_team: "Seattle Seahawks",
    stadium: "Levi's Stadium",
    time: new Date(2025, 10, 30, 16, 5), // November 30, 4:05 PM
    year: 2025
  },

  // Week 14 (December 4-8, 2025)
  {
    week: 14,
    home_team: "Baltimore Ravens",
    road_team: "Kansas City Chiefs",
    stadium: "M&T Bank Stadium",
    time: new Date(2025, 11, 4, 20, 15), // December 4, 8:15 PM
    year: 2025
  },
  {
    week: 14,
    home_team: "Cincinnati Bengals",
    road_team: "Buffalo Bills",
    stadium: "Paycor Stadium",
    time: new Date(2025, 11, 7, 13, 0), // December 7, 1:00 PM
    year: 2025
  },
  {
    week: 14,
    home_team: "Dallas Cowboys",
    road_team: "Philadelphia Eagles",
    stadium: "AT&T Stadium",
    time: new Date(2025, 11, 7, 16, 25), // December 7, 4:25 PM
    year: 2025
  },
  {
    week: 14,
    home_team: "Minnesota Vikings",
    road_team: "Green Bay Packers",
    stadium: "U.S. Bank Stadium",
    time: new Date(2025, 11, 7, 13, 0), // December 7, 1:00 PM
    year: 2025
  },
  {
    week: 14,
    home_team: "Seattle Seahawks",
    road_team: "San Francisco 49ers",
    stadium: "Lumen Field",
    time: new Date(2025, 11, 7, 16, 5), // December 7, 4:05 PM
    year: 2025
  },

  // Week 15 (December 11-15, 2025)
  {
    week: 15,
    home_team: "Kansas City Chiefs",
    road_team: "Buffalo Bills",
    stadium: "Arrowhead Stadium",
    time: new Date(2025, 11, 11, 20, 15), // December 11, 8:15 PM
    year: 2025
  },
  {
    week: 15,
    home_team: "Baltimore Ravens",
    road_team: "Cincinnati Bengals",
    stadium: "M&T Bank Stadium",
    time: new Date(2025, 11, 14, 13, 0), // December 14, 1:00 PM
    year: 2025
  },
  {
    week: 15,
    home_team: "Philadelphia Eagles",
    road_team: "Dallas Cowboys",
    stadium: "Lincoln Financial Field",
    time: new Date(2025, 11, 14, 16, 25), // December 14, 4:25 PM
    year: 2025
  },
  {
    week: 15,
    home_team: "Green Bay Packers",
    road_team: "Minnesota Vikings",
    stadium: "Lambeau Field",
    time: new Date(2025, 11, 14, 13, 0), // December 14, 1:00 PM
    year: 2025
  },
  {
    week: 15,
    home_team: "San Francisco 49ers",
    road_team: "Seattle Seahawks",
    stadium: "Levi's Stadium",
    time: new Date(2025, 11, 14, 16, 5), // December 14, 4:05 PM
    year: 2025
  },

  // Week 16 (December 18-22, 2025)
  {
    week: 16,
    home_team: "Buffalo Bills",
    road_team: "Kansas City Chiefs",
    stadium: "Highmark Stadium",
    time: new Date(2025, 11, 18, 20, 15), // December 18, 8:15 PM
    year: 2025
  },
  {
    week: 16,
    home_team: "Cincinnati Bengals",
    road_team: "Baltimore Ravens",
    stadium: "Paycor Stadium",
    time: new Date(2025, 11, 21, 13, 0), // December 21, 1:00 PM
    year: 2025
  },
  {
    week: 16,
    home_team: "Dallas Cowboys",
    road_team: "Philadelphia Eagles",
    stadium: "AT&T Stadium",
    time: new Date(2025, 11, 21, 16, 25), // December 21, 4:25 PM
    year: 2025
  },
  {
    week: 16,
    home_team: "Minnesota Vikings",
    road_team: "Green Bay Packers",
    stadium: "U.S. Bank Stadium",
    time: new Date(2025, 11, 21, 13, 0), // December 21, 1:00 PM
    year: 2025
  },
  {
    week: 16,
    home_team: "Seattle Seahawks",
    road_team: "San Francisco 49ers",
    stadium: "Lumen Field",
    time: new Date(2025, 11, 21, 16, 5), // December 21, 4:05 PM
    year: 2025
  },

  // Week 17 (December 25-29, 2025)
  {
    week: 17,
    home_team: "Kansas City Chiefs",
    road_team: "Baltimore Ravens",
    stadium: "Arrowhead Stadium",
    time: new Date(2025, 11, 25, 20, 15), // December 25, 8:15 PM
    year: 2025
  },
  {
    week: 17,
    home_team: "Buffalo Bills",
    road_team: "Cincinnati Bengals",
    stadium: "Highmark Stadium",
    time: new Date(2025, 11, 28, 13, 0), // December 28, 1:00 PM
    year: 2025
  },
  {
    week: 17,
    home_team: "Philadelphia Eagles",
    road_team: "Dallas Cowboys",
    stadium: "Lincoln Financial Field",
    time: new Date(2025, 11, 28, 16, 25), // December 28, 4:25 PM
    year: 2025
  },
  {
    week: 17,
    home_team: "Green Bay Packers",
    road_team: "Minnesota Vikings",
    stadium: "Lambeau Field",
    time: new Date(2025, 11, 28, 13, 0), // December 28, 1:00 PM
    year: 2025
  },
  {
    week: 17,
    home_team: "San Francisco 49ers",
    road_team: "Seattle Seahawks",
    stadium: "Levi's Stadium",
    time: new Date(2025, 11, 28, 16, 5), // December 28, 4:05 PM
    year: 2025
  },

  // Week 18 (January 1-5, 2026)
  {
    week: 18,
    home_team: "Baltimore Ravens",
    road_team: "Kansas City Chiefs",
    stadium: "M&T Bank Stadium",
    time: new Date(2026, 0, 1, 20, 15), // January 1, 8:15 PM
    year: 2025
  },
  {
    week: 18,
    home_team: "Cincinnati Bengals",
    road_team: "Buffalo Bills",
    stadium: "Paycor Stadium",
    time: new Date(2026, 0, 4, 13, 0), // January 4, 1:00 PM
    year: 2025
  },
  {
    week: 18,
    home_team: "Dallas Cowboys",
    road_team: "Philadelphia Eagles",
    stadium: "AT&T Stadium",
    time: new Date(2026, 0, 4, 16, 25), // January 4, 4:25 PM
    year: 2025
  },
  {
    week: 18,
    home_team: "Minnesota Vikings",
    road_team: "Green Bay Packers",
    stadium: "U.S. Bank Stadium",
    time: new Date(2026, 0, 4, 13, 0), // January 4, 1:00 PM
    year: 2025
  },
  {
    week: 18,
    home_team: "Seattle Seahawks",
    road_team: "San Francisco 49ers",
    stadium: "Lumen Field",
    time: new Date(2026, 0, 4, 16, 5), // January 4, 4:05 PM
    year: 2025
  }
];

async function main() {
  console.log('🏈 Adding 2025 NFL Schedule to Database...');
  console.log('==========================================\n');

  let gamesCreated = 0;
  let gamesSkipped = 0;

  for (const gameData of nflSchedule2025) {
    try {
      // Find home team
      const homeTeam = await prisma.teams.findFirst({
        where: { name: gameData.home_team }
      });

      // Find road team
      const roadTeam = await prisma.teams.findFirst({
        where: { name: gameData.road_team }
      });

      if (!homeTeam || !roadTeam) {
        console.log(`⚠️  Skipping: ${gameData.road_team} @ ${gameData.home_team} (team not found)`);
        gamesSkipped++;
        continue;
      }

      // Check if game already exists
      const existingGame = await prisma.games.findFirst({
        where: {
          year: gameData.year,
          week: gameData.week,
          home_team_id: homeTeam.id,
          road_team_id: roadTeam.id
        }
      });

      if (existingGame) {
        console.log(`⏭️  Skipping: Week ${gameData.week} - ${gameData.road_team} @ ${gameData.home_team} (already exists)`);
        gamesSkipped++;
        continue;
      }

      // Create the game
      await prisma.games.create({
        data: {
          year: gameData.year,
          week: gameData.week,
          home_team_id: homeTeam.id,
          road_team_id: roadTeam.id,
          stadium: gameData.stadium,
          time: gameData.time,
          is_finalized: false
        }
      });

      console.log(`✅ Created: Week ${gameData.week} - ${gameData.road_team} @ ${gameData.home_team}`);
      gamesCreated++;

    } catch (error) {
      console.error(`❌ Error creating game: ${gameData.road_team} @ ${gameData.home_team}`, error);
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Games created: ${gamesCreated}`);
  console.log(`   ⏭️  Games skipped: ${gamesSkipped}`);
  console.log(`   📅 Total games in schedule: ${nflSchedule2025.length}`);

  // Show some sample games
  console.log('\n📋 Sample Games Added:');
  const sampleGames = await prisma.games.findMany({
    where: { year: 2025 },
    include: {
      home_team: true,
      road_team: true
    },
    orderBy: [
      { week: 'asc' },
      { time: 'asc' }
    ],
    take: 10
  });

  sampleGames.forEach(game => {
    const date = new Date(game.time);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    console.log(`   Week ${game.week}: ${game.road_team.name} @ ${game.home_team.name} (${formattedDate})`);
  });

  console.log('\n🎯 2025 NFL Schedule successfully added to database!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 