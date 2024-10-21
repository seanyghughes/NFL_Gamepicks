import { Context } from "../index"

export const Query = {
    teams: async (_: any, __: any, {prisma}: Context) => {
        const teams = await prisma.teams.findMany({
            orderBy: [{
                id: "asc"
            }]
        })
    }
}