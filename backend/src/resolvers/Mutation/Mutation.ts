import { Picks, Users } from "@prisma/client"
import { Context } from "../../index"

interface PickCreateArgs {
    team_id: number
    user_id: number
    game_id: number
}

interface PickPayloadType {
    userErrors: {
        message: string
    }[],
    pick: Picks | null
}

interface UserArgs {
    name: string
    email: string
    password: string 
}

interface UserPayloadType {
    userErrors: {
        message: string
    }[],
    user: Users | null
}

export const Mutation = {
    pickCreate: async (
        _: any, 
        { team_id, user_id, game_id }: PickCreateArgs, 
        { prisma } : Context
    ): Promise<PickPayloadType> => {

        if(!team_id){
            return {
                userErrors: [{
                    message: "You must make a pick to proceed"
                }],
                pick: null 
            }
        }
        
        const pick = await prisma.picks.create({
            data: {
                team_id,
                user_id,
                game_id
           },
        });

        return {
            userErrors: [],
            pick
        }
    },

    userCreate: async (
        _: any, 
        { user }: { user: UserArgs }, 
        { prisma } : Context
    ): Promise<UserPayloadType> => {

        const { name, email, password } = user

        if(!name || !email || !password){
            return {
                userErrors: [{
                    message: "You must provide a name, email and password to create an account"
                }],
                user: null 
            }
        }
        
        const createdUser = await prisma.users.create({
            data: {
                name,
                email,
                password
           },
        });

        return {
            userErrors: [],
            user: createdUser
            
        }
    },
};