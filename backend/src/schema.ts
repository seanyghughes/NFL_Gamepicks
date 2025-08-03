import { gql } from "apollo-server";

export const typeDefs = gql`
    # Queries
    type Query {
        hello: String
        users: [Users!]!
        picks: [Picks!]!
        teams: [Teams!]!
        games(week: Int): [Games!]!
        leagues: [Leagues!]!
        userPicks(userId: ID!): [Picks!]!
            weeklyScores(year: Int!, week: Int!): [WeeklyScores!]!
    leagueStandings(leagueId: ID!): [LeagueStanding!]!
    seasonLeaderboard(year: Int!): [SeasonStanding!]!
    userTeamAnalysis(userId: ID!): TeamAnalysis!
    currentUser: Users
    }

    # Mutations
    type Mutation {
        userCreate(user: UserInput! ): UserPayload!
        userLogin(email: String!, password: String!): AuthPayload!
        userUpdate(user_id: ID!, user: UserInput): UserPayload!
        pickCreate(team_id: Int!, user_id: Int!, game_id: Int!): PickPayload!
        pickUpdate(pick_id: ID!, team_id: Int!): PickPayload!
        teamCreate(name: String!, location: String!, division: String!, conference: String!): Teams!
        leagueCreate(name: String!, description: String): LeaguePayload!
        leagueJoin(leagueId: ID!): LeaguePayload!
        finalizeGame(gameId: ID!, winningTeamId: ID!): GamePayload!
    }

    # User Type
    type Users {
        id: ID!
        name: String!
        email: String!
        created_at: String!
        updated_at: String!
        picks: [Picks!]!
        userLeagues: [UserLeagues!]!
        weeklyScores: [WeeklyScores!]!
        createdLeagues: [Leagues!]!
    }

    # Picks Type
    type Picks {
        id: ID!
        team_id: Int!
        user_id: Int!
        user: Users!
        game_id: Int!
        game: Games!
        team: Teams!
        created_at: String!
        updated_at: String!
    }

    # Teams Type
    type Teams {
        id: ID!
        name: String!
        geo: String!
        division: String!
        conference: String!
        logo_url: String
        created_at: String!
        updated_at: String!
        home_games: [Games]
        road_games: [Games]
        winning_games: [Games]
        picks: [Picks]
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
        winning_team_id: Int
        is_finalized: Boolean!
        home_team: Teams
        road_team: Teams
        winning_team: Teams
        picks: [Picks]
    }

    # Leagues Type
    type Leagues {
        id: ID!
        name: String!
        description: String
        created_by: Int!
        created_at: String!
        updated_at: String!
        userLeagues: [UserLeagues!]!
        createdByUser: Users!
    }

    # UserLeagues Type
    type UserLeagues {
        id: ID!
        user_id: Int!
        league_id: Int!
        joined_at: String!
        user: Users!
        league: Leagues!
    }

    # WeeklyScores Type
    type WeeklyScores {
        id: ID!
        user_id: Int!
        year: Int!
        week: Int!
        correct_picks: Int!
        total_picks: Int!
        winPercentage: Float!
        totalGamesAvailable: Int!
        created_at: String!
        updated_at: String!
        user: Users!
    }

    # LeagueStanding Type
    type LeagueStanding {
        user: Users!
        totalCorrect: Int!
        totalPicks: Int!
        winPercentage: Float!
    }

    # SeasonStanding Type
    type SeasonStanding {
        user: Users!
        totalCorrect: Int!
        totalPicks: Int!
        totalGamesAvailable: Int!
        winPercentage: Float!
    }

    # TeamAnalysis Type
    type TeamAnalysis {
        teamAnalysis: [TeamStats!]!
        heroTeam: TeamStats
        jinxTeam: TeamStats
    }

    # TeamStats Type
    type TeamStats {
        teamId: Int!
        teamName: String!
        totalPicks: Int!
        correctPicks: Int!
        winPercentage: Float!
    }

    # Auth Payload
    type AuthPayload {
        userErrors: [UserError!]!
        user: Users
        token: String
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

    type LeaguePayload {
        userErrors: [UserError!]!
        league: Leagues
    }

    type GamePayload {
        userErrors: [UserError!]!
        game: Games
    }

    input UserInput {
        name: String
        email: String
        password: String
    }
`;
