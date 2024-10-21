import { Context } from "../../index"

interface UserCreateArgs {
    name: string
    email: string
    password: string
    id: number
}

export const Mutation = {
    createUser: async (_: any, { name, email, password, id }: UserCreateArgs, { prisma }: Context) => {
        prisma.users.create({
            data: {
                name,
                email,
                password,
                id: 1
            }
        })
    }
}