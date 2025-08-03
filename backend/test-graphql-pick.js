import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Import your schema and resolvers
import { typeDefs } from '../src/schema.js';
import { Query } from '../src/resolvers/Query.js';
import { Mutation } from '../src/resolvers/Mutation/Mutation.js';

const resolvers = {
  Query,
  Mutation
};

async function testGraphQLPick() {
  console.log('🧪 Testing GraphQL Pick Creation...');
  console.log('==================================\n');

  try {
    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (token) {
          try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as any;
            const user = await prisma.users.findUnique({
              where: { id: decoded.userId }
            });
            if (user) {
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
        return { prisma };
      }
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4001 }
    });

    console.log(`🚀 Server ready at ${url}`);

    // Test the mutation
    const CREATE_PICK = gql`
      mutation CreatePick($team_id: Int!, $user_id: Int!, $game_id: Int!) {
        pickCreate(team_id: $team_id, user_id: $user_id, game_id: $game_id) {
          userErrors {
            message
          }
          pick {
            id
            team_id
            user_id
            game_id
          }
        }
      }
    `;

    // Get test data
    const user = await prisma.users.findFirst();
    const game = await prisma.games.findFirst();
    const team = await prisma.teams.findFirst();

    if (!user || !game || !team) {
      console.log('❌ Missing test data');
      return;
    }

    console.log(`📋 Test Data:`);
    console.log(`   User: ${user.name} (ID: ${user.id})`);
    console.log(`   Game: ${game.id} (Week ${game.week})`);
    console.log(`   Team: ${team.name} (ID: ${team.id})`);

    // Test the mutation
    const result = await server.executeOperation({
      query: CREATE_PICK,
      variables: {
        team_id: team.id,
        user_id: user.id,
        game_id: game.id
      }
    });

    console.log('\n📊 GraphQL Result:');
    console.log(JSON.stringify(result, null, 2));

    if (result.body.singleResult.errors) {
      console.log('\n❌ GraphQL Errors:');
      result.body.singleResult.errors.forEach(error => {
        console.log(`   ${error.message}`);
      });
    }

    if (result.body.singleResult.data?.pickCreate?.userErrors?.length > 0) {
      console.log('\n⚠️  User Errors:');
      result.body.singleResult.data.pickCreate.userErrors.forEach(error => {
        console.log(`   ${error.message}`);
      });
    }

    if (result.body.singleResult.data?.pickCreate?.pick) {
      console.log('\n✅ Pick created successfully!');
      console.log(`   Pick ID: ${result.body.singleResult.data.pickCreate.pick.id}`);
    }

  } catch (error) {
    console.error('❌ Error testing GraphQL:', error);
  }

  // Clean up
  await prisma.$disconnect();
  process.exit(0);
}

testGraphQLPick(); 