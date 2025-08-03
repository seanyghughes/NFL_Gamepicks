import { Context } from "../index.js";

export const Query = {
    hello: () => {
        return "World!";
    },

    teams: async (_: any, __: any, { prisma }: Context) => {
        const teams = await prisma.teams.findMany({
            orderBy: [{
                id: "asc"
            }]
        });
        return teams;
    },

    games: async (_: any, { week }: { week?: number }, { prisma }: Context) => {
        const whereClause = week ? { week: week } : {};
        
        const games = await prisma.games.findMany({
            where: whereClause,
            include: {
                home_team: true,
                road_team: true,
                winning_team: true,
                picks: {
                    include: {
                        user: true,
                        team: true
                    }
                }
            },
            orderBy: [{
                time: "asc"
            }]
        });
        return games;
    },

    gameResults: async (_: any, { week }: { week?: number }, { prisma }: Context) => {
        const whereClause = week ? { week: week } : {};
        
        const games = await prisma.games.findMany({
            where: whereClause,
            include: {
                home_team: true,
                road_team: true,
                winning_team: true,
                picks: {
                    include: {
                        user: true,
                        team: true
                    }
                }
            },
            orderBy: [{
                time: "asc"
            }]
        });
        return games;
    },

    users: async (_: any, __: any, { prisma }: Context) => {
        const users = await prisma.users.findMany({
            include: {
                picks: true,
                userLeagues: {
                    include: {
                        league: true
                    }
                },
                weeklyScores: true
            },
            orderBy: [{
                created_at: "desc"
            }]
        });
        return users;
    },

    picks: async (_: any, __: any, { prisma }: Context) => {
        const picks = await prisma.picks.findMany({
            include: {
                user: true,
                team: true,
                game: true
            },
            orderBy: [{
                id: "desc"
            }]
        });
        return picks;
    },

    leagues: async (_: any, __: any, { prisma }: Context) => {
        const leagues = await prisma.leagues.findMany({
            include: {
                createdByUser: true,
                userLeagues: {
                    include: {
                        user: true
                    }
                }
            },
            orderBy: [{
                created_at: "desc"
            }]
        });
        return leagues;
    },

    userPicks: async (_: any, { userId }: { userId: string }, { prisma }: Context) => {
        const picks = await prisma.picks.findMany({
            where: {
                user_id: parseInt(userId)
            },
            include: {
                user: true,
                team: true,
                game: {
                    include: {
                        home_team: true,
                        road_team: true,
                        winning_team: true
                    }
                }
            },
            orderBy: [{
                created_at: "desc"
            }]
        });
        return picks;
    },

    weeklyScores: async (_: any, { year, week }: { year: number; week: number }, { prisma }: Context) => {
        // Get total games available for this week
        const totalGamesThisWeek = await prisma.games.count({
            where: {
                year,
                week,
                is_finalized: true
            }
        });

        const scores = await prisma.weeklyScores.findMany({
            where: {
                year,
                week
            },
            include: {
                user: true
            },
            orderBy: [{
                correct_picks: "desc"
            }]
        });

        // Add calculated win percentage based on total games available
        return scores.map(score => ({
            ...score,
            winPercentage: totalGamesThisWeek > 0 ? (score.correct_picks / totalGamesThisWeek) * 100 : 0,
            totalGamesAvailable: totalGamesThisWeek
        }));
    },

    leagueStandings: async (_: any, { leagueId }: { leagueId: string }, { prisma }: Context) => {
        // Get all users in the league
        const leagueMembers = await prisma.userLeagues.findMany({
            where: {
                league_id: parseInt(leagueId)
            },
            include: {
                user: {
                    include: {
                        weeklyScores: true
                    }
                }
            }
        });

        // Calculate standings
        const standings = leagueMembers.map(member => {
            const totalCorrect = member.user.weeklyScores.reduce((sum, score) => sum + score.correct_picks, 0);
            const totalPicks = member.user.weeklyScores.reduce((sum, score) => sum + score.total_picks, 0);
            const winPercentage = totalPicks > 0 ? (totalCorrect / totalPicks) * 100 : 0;

            return {
                user: member.user,
                totalCorrect,
                totalPicks,
                winPercentage
            };
        });

        // Sort by win percentage, then by total correct picks
        return standings.sort((a, b) => {
            if (b.winPercentage !== a.winPercentage) {
                return b.winPercentage - a.winPercentage;
            }
            return b.totalCorrect - a.totalCorrect;
        });
    },

    currentUser: async (_: any, __: any, { prisma, user }: Context) => {
        if (!user) {
            return null;
        }

        return await prisma.users.findUnique({
            where: { id: user.id },
            include: {
                picks: true,
                userLeagues: {
                    include: {
                        league: true
                    }
                },
                weeklyScores: true
            }
        });
    },

    seasonLeaderboard: async (_: any, { year }: { year: number }, { prisma }: Context) => {
        // Get all finalized games for the season
        const allFinalizedGames = await prisma.games.findMany({
            where: {
                year: year,
                is_finalized: true
            }
        });

        const totalGamesAvailable = allFinalizedGames.length;

        // Get all users with their picks for the season
        const users = await prisma.users.findMany({
            include: {
                picks: {
                    include: {
                        game: {
                            include: {
                                winning_team: true
                            }
                        },
                        team: true
                    }
                }
            }
        });

        // Calculate season stats for each user
        const leaderboard = users.map(user => {
            const finalizedPicks = user.picks.filter(pick => pick.game && pick.game.is_finalized);
            const correctPicks = finalizedPicks.filter(pick => 
                pick.team_id === pick.game.winning_team_id
            ).length;
            
            // Use total games available as denominator, not just picked games
            const winPercentage = totalGamesAvailable > 0 ? (correctPicks / totalGamesAvailable) * 100 : 0;

            return {
                user,
                totalCorrect: correctPicks,
                totalPicks: finalizedPicks.length,
                totalGamesAvailable,
                winPercentage
            };
        });

        // Sort by win percentage, then by total correct picks
        return leaderboard
            .filter(entry => entry.totalPicks > 0)
            .sort((a, b) => {
                if (b.winPercentage !== a.winPercentage) {
                    return b.winPercentage - a.winPercentage;
                }
                return b.totalCorrect - a.totalCorrect;
            });
    },

    userTeamAnalysis: async (_: any, { userId }: { userId: string }, { prisma }: Context) => {
        const userPicks = await prisma.picks.findMany({
            where: {
                user_id: parseInt(userId)
            },
            include: {
                team: true,
                game: {
                    include: {
                        winning_team: true
                    }
                }
            }
        });

        // Filter picks for finalized games only
        const finalizedPicks = userPicks.filter(pick => pick.game && pick.game.is_finalized);

        // Group picks by team
        const teamStats: { [key: number]: any } = {};
        finalizedPicks.forEach(pick => {
            const teamId = pick.team_id;
            const teamName = pick.team.name;
            const isCorrect = pick.team_id === pick.game.winning_team_id;

            if (!teamStats[teamId]) {
                teamStats[teamId] = {
                    teamId,
                    teamName,
                    totalPicks: 0,
                    correctPicks: 0
                };
            }

            teamStats[teamId].totalPicks++;
            if (isCorrect) {
                teamStats[teamId].correctPicks++;
            }
        });

        // Convert to array and calculate percentages
        const teamAnalysis = Object.values(teamStats).map((team: any) => ({
            ...team,
            winPercentage: team.totalPicks > 0 ? (team.correctPicks / team.totalPicks) * 100 : 0
        }));

        // Find hero team (most picked with highest win rate)
        const heroTeam = teamAnalysis
            .filter((team: any) => team.totalPicks >= 2) // At least 2 picks to be considered
            .sort((a: any, b: any) => {
                if (b.winPercentage !== a.winPercentage) {
                    return b.winPercentage - a.winPercentage;
                }
                return b.totalPicks - a.totalPicks;
            })[0];

        // Find jinx team (most picked with lowest win rate)
        const jinxTeam = teamAnalysis
            .filter((team: any) => team.totalPicks >= 2) // At least 2 picks to be considered
            .sort((a: any, b: any) => {
                if (a.winPercentage !== b.winPercentage) {
                    return a.winPercentage - b.winPercentage;
                }
                return b.totalPicks - a.totalPicks;
            })[0];

        return {
            teamAnalysis,
            heroTeam,
            jinxTeam
        };
    }
};