import DataLoader from "dataloader";
import { prisma } from "..";
import { Games } from ".prisma/client"

type BatchGames = (ids: number[]) => Promise<Games[]>

const batchGames: BatchGames = async (ids) => {
    const games = await prisma.games.findMany({
        where: {
            id: {
                in: ids
            }
        }
    })
}