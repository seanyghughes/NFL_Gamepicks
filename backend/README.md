# NFL Game Picks Backend

A GraphQL API for the NFL Game Picks application built with Apollo Server, Prisma, and MySQL.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Game Management**: Track NFL games, teams, and results
- **Pick System**: Users can make picks for games and track accuracy
- **League System**: Create and join leagues to compete with friends
- **Statistics**: Track user performance and weekly leaderboards
- **Real-time Updates**: GraphQL subscriptions for live updates

## Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
DATABASE_URL="mysql://username:password@localhost:3306/nfl_gamepicks"
JWT_SECRET="your-secret-key-here"
```

### 3. Database Setup

#### Option A: Local MySQL Database

1. Install MySQL on your system
2. Create a database:
   ```sql
   CREATE DATABASE nfl_gamepicks;
   ```
3. Update your `.env` file with local database credentials

#### Option B: Use SQLite for Development

1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "sqlite"
     url      = "file:./dev.db"
   }
   ```

### 4. Database Migration

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Run migrations if using migrations
npx prisma migrate dev
```

### 5. Seed Data (Optional)

Create a seed script to populate initial data:

```bash
# Create seed file
touch prisma/seed.js
```

Add sample data for teams, games, etc.

### 6. Start the Server

```bash
npm start
```

The server will start on `http://localhost:4000`

## API Documentation

### Authentication

- `userCreate`: Register a new user
- `userLogin`: Login and receive JWT token

### Games

- `games`: Get all games
- `finalizeGame`: Mark game as complete with winner

### Picks

- `pickCreate`: Make a pick for a game
- `pickUpdate`: Update an existing pick
- `userPicks`: Get picks for a specific user

### Leagues

- `leagueCreate`: Create a new league
- `leagueJoin`: Join an existing league
- `leagueStandings`: Get league standings

### Statistics

- `weeklyScores`: Get weekly leaderboard
- `currentUser`: Get current user data

## GraphQL Playground

Visit `http://localhost:4000` to access the GraphQL Playground for testing queries and mutations.

## Development

### Project Structure

```
backend/
├── src/
│   ├── index.ts              # Server entry point
│   ├── schema.ts             # GraphQL schema
│   └── resolvers/
│       ├── index.ts          # Resolver exports
│       ├── Query.ts          # Query resolvers
│       └── Mutation/
│           ├── Mutation.ts   # Mutation resolvers
│           └── auth.ts       # Authentication resolvers
├── prisma/
│   └── schema.prisma         # Database schema
└── package.json
```

### Adding New Features

1. Update the Prisma schema in `prisma/schema.prisma`
2. Add GraphQL types in `src/schema.ts`
3. Implement resolvers in the appropriate files
4. Test with GraphQL Playground

### Database Schema

The application uses the following main entities:

- **Users**: User accounts with authentication
- **Teams**: NFL teams with logos and metadata
- **Games**: NFL games with home/away teams and results
- **Picks**: User selections for games
- **Leagues**: User-created leagues for competition
- **WeeklyScores**: Aggregated weekly performance data

## Troubleshooting

### Database Connection Issues

1. Verify your `.env` file has correct database credentials
2. Ensure MySQL server is running
3. Check database permissions for the user

### JWT Issues

1. Ensure `JWT_SECRET` is set in `.env`
2. Check token expiration settings

### Prisma Issues

1. Run `npx prisma generate` after schema changes
2. Use `npx prisma studio` to view database data
3. Reset database with `npx prisma db push --force-reset`

## Production Deployment

1. Set up a production MySQL database
2. Configure environment variables
3. Use PM2 or similar for process management
4. Set up reverse proxy (nginx) if needed
5. Configure SSL certificates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request 