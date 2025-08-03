# NFL Game Picks Frontend

A React-based web application for NFL game pick'em contests with user authentication, league management, and real-time statistics.

## Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Game Picks**: Make picks for NFL games with real-time validation
- **League System**: Create and join leagues to compete with friends
- **Statistics Dashboard**: Track performance with detailed analytics
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live score tracking and standings

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see backend README)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Endpoint

Update the GraphQL endpoint in your Apollo Client configuration if needed. The default assumes the backend is running on `http://localhost:4000`.

### 3. Start Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── images/
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation with auth
│   │   └── BottomNavbar.js    # Mobile navigation
│   ├── pages/
│   │   ├── Home.js            # Landing page
│   │   ├── Login.js           # Authentication
│   │   ├── Signup.js          # User registration
│   │   ├── Games.js           # Game picks interface
│   │   ├── Stats.js           # Statistics dashboard
│   │   └── League.js          # League management
│   ├── images/                # Team logos and assets
│   ├── App.js                 # Main app component
│   └── index.js               # Entry point
└── package.json
```

## Key Components

### Authentication
- **Login Page**: User authentication with email/password
- **Signup Page**: New user registration with validation
- **JWT Token Management**: Automatic token storage and refresh

### Game Picks
- **Games Page**: Display all NFL games with pick interface
- **Pick Validation**: Prevent duplicate picks and enforce deadlines
- **Real-time Status**: Show pick results after games are finalized

### League System
- **League Creation**: Create private leagues with custom settings
- **League Joining**: Browse and join existing leagues
- **Standings**: Real-time league rankings and statistics

### Statistics
- **Personal Stats**: Individual performance metrics
- **Weekly Leaderboards**: Compare performance with other users
- **Pick History**: Track all past picks and results

## Styling

The application uses:
- **CSS Modules**: Component-specific styling
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional interface
- **NFL Branding**: Official colors and styling

## State Management

- **Local Storage**: User authentication tokens
- **Apollo Client**: GraphQL state management
- **React Hooks**: Component state management

## API Integration

The frontend communicates with the backend through GraphQL queries and mutations:

### Authentication
```graphql
mutation Login($email: String!, $password: String!) {
  userLogin(email: $email, password: $password) {
    user { id name email }
    token
  }
}
```

### Game Picks
```graphql
mutation CreatePick($team_id: Int!, $user_id: Int!, $game_id: Int!) {
  pickCreate(team_id: $team_id, user_id: $user_id, game_id: $game_id) {
    pick { id team_id game_id }
  }
}
```

### Leagues
```graphql
query GetLeagues {
  leagues {
    id name description
    userLeagues { user { name } }
  }
}
```

## Development

### Adding New Features

1. **Create Components**: Add new React components in `src/components/`
2. **Add Pages**: Create new pages in `src/pages/`
3. **Update Routes**: Add routes in `App.js`
4. **Style Components**: Create corresponding CSS files
5. **Test Integration**: Ensure GraphQL queries work correctly

### Code Style

- Use functional components with hooks
- Implement proper error handling
- Add loading states for better UX
- Follow responsive design principles
- Use semantic HTML elements

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables

Create a `.env` file for production settings:

```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_ENVIRONMENT=production
```

### Deployment Options

1. **Netlify**: Connect GitHub repository for automatic deployment
2. **AWS S3**: Static hosting with CloudFront
3. **Firebase Hosting**: Google's hosting solution
4. **GitHub Pages**: Free static hosting

## Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify backend server is running
   - Check GraphQL endpoint configuration
   - Ensure CORS is properly configured

2. **Authentication Issues**
   - Clear localStorage and re-login
   - Check JWT token expiration
   - Verify token format in requests

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check for syntax errors in components
   - Verify all imports are correct

### Performance Optimization

1. **Code Splitting**: Use React.lazy() for route-based splitting
2. **Image Optimization**: Compress and optimize team logos
3. **Bundle Analysis**: Use webpack-bundle-analyzer
4. **Caching**: Implement proper cache headers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
