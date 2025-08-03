import { ApolloServer, gql } from "apollo-server";
import { typeDefs } from "./schema.js";
import { Query } from "./resolvers/Query.js";
import { PrismaClient, Prisma } from "@prisma/client";
import { Mutation } from "./resolvers/Mutation/Mutation.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient;
    user?: {
        id: number;
        email: string;
    };
}

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Mutation
    },
    
    context: async ({ req }) => {
        console.log('🔍 Backend Request Debug:', {
            method: req.method,
            url: req.url,
            headers: req.headers,
            authorization: req.headers.authorization ? 'Present' : 'Missing'
        });
        
        const token = req.headers.authorization?.replace("Bearer ", "");
        
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any;
                const user = await prisma.users.findUnique({
                    where: { id: decoded.userId }
                });
                
                if (user) {
                    console.log('✅ User authenticated:', user.email);
                    return {
                        prisma,
                        user: {
                            id: user.id,
                            email: user.email
                        }
                    };
                }
            } catch (error) {
                console.error("Token verification failed:", error);
            }
        }
        
        console.log('⚠️  No user authenticated');
        return { prisma };
    },
    
    cors: {
        origin: true, // Allow all origins
        credentials: true
    }
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready on ${url}`);
});
