import { Picks, Users, Leagues, Games, WeeklyScores } from "@prisma/client";
import { Context } from "../../index.js";
import { authResolvers } from "./auth.js";

interface PickCreateArgs {
    team_id: number;
    user_id: number;
    game_id: number;
}

interface PickPayloadType {
    userErrors: {
        message: string;
    }[];
    pick: Picks | null;
}

interface LeaguePayloadType {
    userErrors: {
        message: string;
    }[];
    league: Leagues | null;
}

interface GamePayloadType {
    userErrors: {
        message: string;
    }[];
    game: Games | null;
}

export const Mutation = {
    // Authentication
    ...authResolvers,

    // Pick Management
    pickCreate: async (
        _: any,
        { team_id, user_id, game_id }: PickCreateArgs,
        { prisma }: Context
    ): Promise<PickPayloadType> => {
        if (!team_id) {
            return {
                userErrors: [{
                    message: "You must make a pick to proceed"
                }],
                pick: null
            };
        }

        // Check if user already made a pick for this game
        const existingPick = await prisma.picks.findUnique({
            where: {
                user_id_game_id: {
                    user_id,
                    game_id
                }
            }
        });

        if (existingPick) {
            return {
                userErrors: [{
                    message: "You have already made a pick for this game"
                }],
                pick: null
            };
        }

        const pick = await prisma.picks.create({
            data: {
                team_id,
                user_id,
                game_id
            },
            include: {
                user: true,
                team: true,
                game: true
            }
        });

        return {
            userErrors: [],
            pick
        };
    },

    pickUpdate: async (
        _: any,
        { pick_id, team_id }: { pick_id: string; team_id: number },
        { prisma }: Context
    ): Promise<PickPayloadType> => {
        const pick = await prisma.picks.update({
            where: { id: parseInt(pick_id) },
            data: { team_id },
            include: {
                user: true,
                team: true,
                game: true
            }
        });

        return {
            userErrors: [],
            pick
        };
    },

    // League Management
    leagueCreate: async (
        _: any,
        { name, description }: { name: string; description?: string },
        { prisma, user }: Context
    ): Promise<LeaguePayloadType> => {
        if (!user) {
            return {
                userErrors: [{
                    message: "You must be logged in to create a league"
                }],
                league: null
            };
        }

        if (!name) {
            return {
                userErrors: [{
                    message: "League name is required"
                }],
                league: null
            };
        }

        const league = await prisma.leagues.create({
            data: {
                name,
                description,
                created_by: user.id
            },
            include: {
                createdByUser: true,
                userLeagues: {
                    include: {
                        user: true
                    }
                }
            }
        });

        // Automatically add creator to league
        await prisma.userLeagues.create({
            data: {
                user_id: user.id,
                league_id: league.id
            }
        });

        return {
            userErrors: [],
            league
        };
    },

    leagueJoin: async (
        _: any,
        { leagueId }: { leagueId: string },
        { prisma, user }: Context
    ): Promise<LeaguePayloadType> => {
        if (!user) {
            return {
                userErrors: [{
                    message: "You must be logged in to join a league"
                }],
                league: null
            };
        }

        const league = await prisma.leagues.findUnique({
            where: { id: parseInt(leagueId) }
        });

        if (!league) {
            return {
                userErrors: [{
                    message: "League not found"
                }],
                league: null
            };
        }

        // Check if user is already in the league
        const existingMembership = await prisma.userLeagues.findUnique({
            where: {
                user_id_league_id: {
                    user_id: user.id,
                    league_id: parseInt(leagueId)
                }
            }
        });

        if (existingMembership) {
            return {
                userErrors: [{
                    message: "You are already a member of this league"
                }],
                league: null
            };
        }

        await prisma.userLeagues.create({
            data: {
                user_id: user.id,
                league_id: parseInt(leagueId)
            }
        });

        return {
            userErrors: [],
            league
        };
    },

    // Game Management
    finalizeGame: async (
        _: any,
        { gameId, winningTeamId }: { gameId: string; winningTeamId: string },
        { prisma }: Context
    ): Promise<GamePayloadType> => {
        const game = await prisma.games.update({
            where: { id: parseInt(gameId) },
            data: {
                winning_team_id: parseInt(winningTeamId),
                is_finalized: true
            },
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
            }
        });

        // Calculate weekly scores for all users who made picks for this game
        const picks = await prisma.picks.findMany({
            where: { game_id: parseInt(gameId) },
            include: {
                user: true,
                team: true
            }
        });

        for (const pick of picks) {
            const isCorrect = pick.team_id === parseInt(winningTeamId);
            
            // Update or create weekly score
            await prisma.weeklyScores.upsert({
                where: {
                    user_id_year_week: {
                        user_id: pick.user_id,
                        year: game.year,
                        week: game.week
                    }
                },
                update: {
                    correct_picks: {
                        increment: isCorrect ? 1 : 0
                    },
                    total_picks: {
                        increment: 1
                    }
                },
                create: {
                    user_id: pick.user_id,
                    year: game.year,
                    week: game.week,
                    correct_picks: isCorrect ? 1 : 0,
                    total_picks: 1
                }
            });
        }

        return {
            userErrors: [],
            game
        };
    }
};