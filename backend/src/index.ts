import { ApolloServer, gql } from "apollo-server";
import { typeDefs } from "./schema.js";
import { Query } from "./resolvers/Query.js";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient;
}

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
    },
    
    context: () => ({ prisma })
});

server.listen().then(({url}) => {
    console.log(`Server ready on ${url}`);
});
