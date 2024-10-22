import { Context } from "../index"

export const Query = {

    hello: () => {
        return "World!"
    },

    teams: async (_: any, __: any, { prisma } : Context) => {
        const teams = await prisma.teams.findMany({
            orderBy: [{
                id: "asc"
            }]
        });
        return teams;
    },

    games: async (_: any, __: any, { prisma } : Context) => {
        const games = await prisma.games.findMany({
            orderBy: [{
                time: "asc"
            }]
        });
        return games;
    },

    users : async (_: any, __: any, { prisma } : Context) => {
        const users = await prisma.users.findMany({
            orderBy: [{
                created_at: "desc"
            }]
        });
        return users;
    }, 

    picks: async (_: any, __: any, { prisma } : Context) => {
        const picks = await prisma.picks.findMany({
            orderBy: [{
                id: "desc"
            }]
        });
        return picks;
    }

    //teams: async (_: any, __: any, {prisma}: Context) => {
      //  const teams = await prisma.teams.findMany({
        //    orderBy: [{
          //      id: "asc"
            //}]
        //})
    //}
}