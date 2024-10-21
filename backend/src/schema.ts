import { gql } from "apollo-server";

export const typeDefs = gql`
    # Queries
    type Query {
        users: [User!]!
        picks: [Picks!]!
        teams: [Teams!]!
        games: [Games!]!
    }

    # Mutations
    type Mutation {
        createUser(name: String!, email: String!, password: String!): User!
        createPick(team_id: String!, user_id: Int!, game_id: Int!): Picks!
        createTeam(name: String!, location: String!, division: String!, conference: String!): Teams!
        createGame(home_team_id: Int!, road_team_id: Int!, stadium: String!, time: String!): Games!
    }

    # User Type
    type User {
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
        team_id: String!
        user_id: Int!
        user: User!
        game_id: Int!
        created_at: String!
        updated_at: String!
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
        home_games: [Games!]!
        road_games: [Games!]!
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
`;
