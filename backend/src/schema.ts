import { gql } from "apollo-server";

export const typeDefs = gql`
    # Queries
    type Query {
        hello: String
        users: [Users!]!
        picks: [Picks!]!
        teams: [Teams!]!
        games: [Games!]!
    }

    # Mutations
    type Mutation {
        userCreate(name: String!, email: String!, password: String!): UserPayload!
        pickCreate(team_id: Int!, user_id: Int!, game_id: Int!): PickPayload!
        teamCreate(name: String!, location: String!, division: String!, conference: String!): Teams!
        gameCreate(home_team_id: Int!, road_team_id: Int!, stadium: String!, time: String!): Games!
    }

    # User Type
    type Users {
        id: ID!
        name: String!
        email: String!
        created_at: String!
        updated_at: String!
        picks: [Picks!]!
    }

    # Picks Type
    type Picks {
        id: ID!
        team_id: Int!
        user_id: Int!
        user: Users!
        game_id: Int!
        created_at: String!
        updated_at: String!
        teams: Teams!
    }

    # Teams Type
    type Teams {
        id: ID!
        name: String!
        location: String!
        division: String!
        conference: String!
        created_at: String!
        updated_at: String!
        home_games: [Games]
        road_games: [Games]
    }

    # Games Type
    type Games {
        id: ID!
        year: Int!
        week: Int!
        home_team_id: Int!
        road_team_id: Int!
        stadium: String!
        time: String!
        home_team: Teams!
        road_team: Teams!
    }

    type UserError {
        message: String!
    }

    type PickPayload {
        userErrors: [UserError!]!
        pick: Picks
    }

    type UserPayload {
        userErrors: [UserError!]!
        user: Users
    }
`;
