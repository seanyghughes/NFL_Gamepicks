import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import './Games.css';

// Import all team logos
import ArizonaCardinals from '../images/Arizona Cardinals.svg';
import AtlantaFalcons from '../images/Atalanta Falcons.svg';
import BaltimoreRavens from '../images/Baltimore Ravens.svg';
import BuffaloBills from '../images/Buffalo Bills.svg';
import CarolinaPanthers from '../images/Caroline Panthers.svg';
import ChicagoBears from '../images/Chicago Bears.svg';
import CincinnatiBengals from '../images/Cincinnati Bengals.svg';
import ClevelandBrowns from '../images/Cleveland Browns.svg';
import DallasCowboys from '../images/Dallas Cowboys.svg';
import DenverBroncos from '../images/Denver Broncos.svg';
import DetroitLions from '../images/Detroit Lions.svg';
import GreenBayPackers from '../images/Green Bay Packers.svg';
import HoustonTexans from '../images/Houston Texans.svg';
import IndianapolisColts from '../images/Indianapolis Colts.svg';
import JacksonvilleJaguars from '../images/Jacksonville Jaguars.svg';
import KansasCityChiefs from '../images/Kansas City Chiefs.svg';
import LasVegasRaiders from '../images/Las Vegas Raiders.svg';
import LosAngelesChargers from '../images/Los Angeles Chargers.svg';
import LosAngelesRams from '../images/Los Angeles Rams.svg';
import MiamiDolphins from '../images/Miami Dolphins.svg';
import MinnesotaVikings from '../images/Minnesota Vikings.svg';
import NewEnglandPatriots from '../images/New England Patriots.svg';
import NewOrleansSaints from '../images/New Orleans Saints.svg';
import NewYorkGiants from '../images/New York Giants.svg';
import NewYorkJets from '../images/New York Jets.svg';
import PhiladelphiaEagles from '../images/Philadelphia Eagles.svg';
import PittsburghSteelers from '../images/Pittsburgh Steelers.svg';
import SanFrancisco49ers from '../images/San Francisco 49ers.svg';
import SeattleSeahawks from '../images/Seattle Seahawks.svg';
import TampaBayBuccaneers from '../images/Tampa Bay Buccaneers.svg';
import TennesseeTitans from '../images/Tennessee Titans.svg';
import WashingtonCommanders from '../images/Washington Commanders.svg';

// Team logo mapping
const teamLogos = {
  "Arizona Cardinals": ArizonaCardinals,
  "Atlanta Falcons": AtlantaFalcons,
  "Baltimore Ravens": BaltimoreRavens,
  "Buffalo Bills": BuffaloBills,
  "Carolina Panthers": CarolinaPanthers,
  "Chicago Bears": ChicagoBears,
  "Cincinnati Bengals": CincinnatiBengals,
  "Cleveland Browns": ClevelandBrowns,
  "Dallas Cowboys": DallasCowboys,
  "Denver Broncos": DenverBroncos,
  "Detroit Lions": DetroitLions,
  "Green Bay Packers": GreenBayPackers,
  "Houston Texans": HoustonTexans,
  "Indianapolis Colts": IndianapolisColts,
  "Jacksonville Jaguars": JacksonvilleJaguars,
  "Kansas City Chiefs": KansasCityChiefs,
  "Las Vegas Raiders": LasVegasRaiders,
  "Los Angeles Chargers": LosAngelesChargers,
  "Los Angeles Rams": LosAngelesRams,
  "Miami Dolphins": MiamiDolphins,
  "Minnesota Vikings": MinnesotaVikings,
  "New England Patriots": NewEnglandPatriots,
  "New Orleans Saints": NewOrleansSaints,
  "New York Giants": NewYorkGiants,
  "New York Jets": NewYorkJets,
  "Philadelphia Eagles": PhiladelphiaEagles,
  "Pittsburgh Steelers": PittsburghSteelers,
  "San Francisco 49ers": SanFrancisco49ers,
  "Seattle Seahawks": SeattleSeahawks,
  "Tampa Bay Buccaneers": TampaBayBuccaneers,
  "Tennessee Titans": TennesseeTitans,
  "Washington Commanders": WashingtonCommanders
};

const GET_GAMES = gql`
  query GetGames($week: Int) {
    games(week: $week) {
      id
      week
      time
      stadium
      home_score
      road_score
      is_finalized
      road_team {
        id
        name
        logo_url
      }
      home_team {
        id
        name
        logo_url
      }
      winning_team {
        id
        name
      }
      picks {
        id
        team_id
        user {
          id
          name
        }
      }
    }
  }
`;

const CREATE_PICK = gql`
  mutation CreatePick($team_id: Int!, $user_id: Int!, $game_id: Int!) {
    pickCreate(team_id: $team_id, user_id: $user_id, game_id: $game_id) {
      userErrors {
        message
      }
      pick {
        id
        team_id
        game_id
        user_id
      }
    }
  }
`;

const UPDATE_PICK = gql`
  mutation UpdatePick($pick_id: ID!, $team_id: Int!) {
    pickUpdate(pick_id: $pick_id, team_id: $team_id) {
      userErrors {
        message
      }
      pick {
        id
        team_id
        game_id
        user_id
      }
    }
  }
`;

// Debug: Log the mutation
console.log('🔍 CREATE_PICK mutation:', CREATE_PICK.loc?.source.body);

function Game({ game, onPick, currentUser, hasGameStarted, currentWeek }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [error, setError] = useState('');

  const userPick = game.picks.find(pick => pick.user.id === currentUser?.id);
  const isGameFinalized = game.is_finalized;
  const hasStarted = hasGameStarted(game.time);
  const isPreviousWeek = game.week < currentWeek;
  const isCurrentWeek = game.week === currentWeek;
  
  // Can only make picks on current week games that haven't started and aren't finalized
  const canMakePick = currentUser && isCurrentWeek && !isGameFinalized && !hasStarted && !userPick;
  // Can only change picks on current week games that haven't started and aren't finalized
  const canChangePick = currentUser && isCurrentWeek && !isGameFinalized && !hasStarted && userPick;

  const date = new Date(parseInt(game.time, 10));
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handlePick = () => {
    console.log('🎯 Game component handlePick called');
    console.log('   selectedTeam:', selectedTeam);
    console.log('   game.id:', game.id);
    
    if (!selectedTeam) {
      setError('Please select a team');
      return;
    }
    setError('');
    
    if (userPick) {
      // Update existing pick
      console.log('   Calling onPick with existing pick:', game.id, selectedTeam, userPick.id);
      onPick(game.id, selectedTeam, userPick.id);
    } else {
      // Create new pick
      console.log('   Calling onPick with new pick:', game.id, selectedTeam);
      onPick(game.id, selectedTeam);
    }
  };

  const getPickStatus = () => {
    if (isGameFinalized) {
      if (userPick) {
        const isCorrect = userPick.team_id === game.winning_team?.id;
        return (
          <div className={`pick-status ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
          </div>
        );
      }
      return <div className="pick-status">Game Finalized</div>;
    }
    if (userPick) {
      const pickedTeam = userPick.team_id === game.home_team.id ? game.home_team : game.road_team;
      const statusText = isPreviousWeek ? `Picked: ${pickedTeam.name} (Week ${game.week})` : `Picked: ${pickedTeam.name}`;
      return <div className="pick-status">{statusText}</div>;
    }
    return null;
  };

  // Get team logos
  const roadTeamLogo = teamLogos[game.road_team.name] || null;
  const homeTeamLogo = teamLogos[game.home_team.name] || null;

  return (
    <div className="game-card">
      <div className="game-header">
        <h3>Week {game.week}</h3>
        <p className="game-time">{formattedDate} at {formattedTime}</p>
        <p className="game-stadium">{game.stadium}</p>
      </div>
      
      <div className="teams-container">
        <div className="team road-team">
          {roadTeamLogo && (
            <img src={roadTeamLogo} alt={`${game.road_team.name} logo`} className="team-logo" />
          )}
          <span className="team-name">{game.road_team.name}</span>
          {game.home_score !== null && game.road_score !== null && (
            <span className="score">{game.road_score}</span>
          )}
        </div>
        
        <div className="vs">@</div>
        
        <div className="team home-team">
          {homeTeamLogo && (
            <img src={homeTeamLogo} alt={`${game.home_team.name} logo`} className="team-logo" />
          )}
          <span className="team-name">{game.home_team.name}</span>
          {game.home_score !== null && game.road_score !== null && (
            <span className="score">{game.home_score}</span>
          )}
        </div>
      </div>

      {getPickStatus()}

      {/* Show game status */}
      {hasStarted && !isGameFinalized && (
        <div className="game-status">Game in Progress</div>
      )}
      
      {isGameFinalized && (
        <div className="game-status">Game Finalized</div>
      )}

      {/* Show message for previous week games */}
      {isPreviousWeek && !userPick && (
        <div className="game-status previous-week">
          <p>⚠️ Game from Week {game.week} - Picks closed</p>
          <p className="previous-week-note">This game was from a previous week and can no longer be picked.</p>
        </div>
      )}

      {/* Show message for previous week games that were picked */}
      {isPreviousWeek && userPick && (
        <div className="game-status previous-week-picked">
          <p>📅 Game from Week {game.week} - Picks locked</p>
          <p className="previous-week-note">This game was from a previous week and picks can no longer be changed.</p>
        </div>
      )}

      {/* Pick section for new picks */}
      {canMakePick && (
        <div className="pick-section">
          <p>Make your pick:</p>
          <div className="pick-buttons">
            <button
              className={`pick-button ${selectedTeam === game.road_team.id ? 'selected' : ''}`}
              onClick={() => setSelectedTeam(game.road_team.id)}
            >
              {roadTeamLogo && (
                <img src={roadTeamLogo} alt={`${game.road_team.name} logo`} className="pick-button-logo" />
              )}
              {game.road_team.name}
            </button>
            <button
              className={`pick-button ${selectedTeam === game.home_team.id ? 'selected' : ''}`}
              onClick={() => setSelectedTeam(game.home_team.id)}
            >
              {homeTeamLogo && (
                <img src={homeTeamLogo} alt={`${game.home_team.name} logo`} className="pick-button-logo" />
              )}
              {game.home_team.name}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="submit-pick" onClick={handlePick}>
            Submit Pick
          </button>
        </div>
      )}

      {/* Change pick section */}
      {canChangePick && (
        <div className="pick-section">
          <p>Change your pick:</p>
          <div className="pick-buttons">
            <button
              className={`pick-button ${selectedTeam === game.road_team.id ? 'selected' : ''}`}
              onClick={() => setSelectedTeam(game.road_team.id)}
            >
              {roadTeamLogo && (
                <img src={roadTeamLogo} alt={`${game.road_team.name} logo`} className="pick-button-logo" />
              )}
              {game.road_team.name}
            </button>
            <button
              className={`pick-button ${selectedTeam === game.home_team.id ? 'selected' : ''}`}
              onClick={() => setSelectedTeam(game.home_team.id)}
            >
              {homeTeamLogo && (
                <img src={homeTeamLogo} alt={`${game.home_team.name} logo`} className="pick-button-logo" />
              )}
              {game.home_team.name}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="submit-pick" onClick={handlePick}>
            Update Pick
          </button>
        </div>
      )}
    </div>
  );
}

function Games() {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const [selectedWeek, setSelectedWeek] = useState(1); // For testing, start with Week 1

  // Function to determine current week
  const getCurrentWeek = () => {
    // For testing, use selected week
    return selectedWeek;
    
    // Production logic would be something like:
    // const now = new Date();
    // const seasonStart = new Date('2025-09-04'); // NFL 2025 season start
    // const weeksSinceStart = Math.floor((now - seasonStart) / (7 * 24 * 60 * 60 * 1000));
    // return Math.max(1, Math.min(18, weeksSinceStart + 1)); // Between Week 1-18
  };

  // Function to check if game has started
  const hasGameStarted = (gameTime) => {
    const gameStartTime = new Date(parseInt(gameTime, 10));
    const now = new Date();
    return now >= gameStartTime;
  };

  const { data, error, loading, refetch } = useQuery(GET_GAMES, {
    variables: { week: getCurrentWeek() },
    onError: (error) => {
      console.error('❌ GraphQL Query Error:', error);
      console.error('   Network Error:', error.networkError);
      console.error('   GraphQL Errors:', error.graphQLErrors);
    }
  });
  
  const [createPick, { loading: pickLoading }] = useMutation(CREATE_PICK, {
    onError: (error) => {
      console.error('❌ GraphQL Mutation Error:', error);
      console.error('   Network Error:', error.networkError);
      console.error('   GraphQL Errors:', error.graphQLErrors);
    }
  });

  const [updatePick, { loading: updateLoading }] = useMutation(UPDATE_PICK, {
    onError: (error) => {
      console.error('❌ GraphQL Update Mutation Error:', error);
      console.error('   Network Error:', error.networkError);
      console.error('   GraphQL Errors:', error.graphQLErrors);
    }
  });

  // Debug: Log current user info
  console.log('🔍 Current User Debug:', {
    user: currentUser,
    userId: currentUser?.id,
    userIdType: typeof currentUser?.id,
    parsedUserId: currentUser ? parseInt(currentUser.id) : null,
    token: localStorage.getItem('token')
  });

  // Test function to verify authentication
  const testAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    console.log('🔐 Auth Debug:', {
      token: token ? 'Present' : 'Missing',
      user: user ? JSON.parse(user) : 'Missing',
      tokenLength: token?.length
    });
  };

  // Call test function on component mount
  React.useEffect(() => {
    testAuth();
  }, []);

  const handlePick = async (gameId, teamId, existingPickId = null) => {
    console.log('🎯 Games component handlePick called');
    console.log('   gameId:', gameId);
    console.log('   teamId:', teamId);
    console.log('   existingPickId:', existingPickId);
    
    if (!currentUser) {
      alert('Please log in to make picks');
      return;
    }

    console.log('🎯 Attempting to make pick...');
    console.log('   Current User:', currentUser);
    console.log('   Game ID:', gameId);
    console.log('   Team ID:', teamId);
    console.log('   User ID (parsed):', parseInt(currentUser.id));

    try {
      let result;
      
      if (existingPickId) {
        // Update existing pick
        console.log('🔄 Updating existing pick...');
        result = await updatePick({
          variables: {
            pick_id: existingPickId,
            team_id: parseInt(teamId)
          }
        });
        
        console.log('✅ Pick update result:', result);
        
        if (result.data?.pickUpdate?.userErrors?.length > 0) {
          console.log('⚠️  User errors:', result.data.pickUpdate.userErrors);
          alert(`Error: ${result.data.pickUpdate.userErrors[0].message}`);
          return;
        }
        
        if (result.data?.pickUpdate?.pick) {
          console.log('✅ Pick updated successfully:', result.data.pickUpdate.pick);
        }
      } else {
        // Create new pick
        console.log('🆕 Creating new pick...');
        result = await createPick({
          variables: {
            team_id: parseInt(teamId),
            user_id: parseInt(currentUser.id),
            game_id: parseInt(gameId)
          }
        });
        
        console.log('✅ Pick creation result:', result);
        
        if (result.data?.pickCreate?.userErrors?.length > 0) {
          console.log('⚠️  User errors:', result.data.pickCreate.userErrors);
          alert(`Error: ${result.data.pickCreate.userErrors[0].message}`);
          return;
        }
        
        if (result.data?.pickCreate?.pick) {
          console.log('✅ Pick created successfully:', result.data.pickCreate.pick);
        }
      }
      
      refetch(); // Refresh the games data
    } catch (error) {
      console.error('❌ Error making pick:', error);
      console.error('   Error details:', {
        message: error.message,
        networkError: error.networkError,
        graphQLErrors: error.graphQLErrors
      });
      alert(`Error making pick: ${error.message}`);
    }
  };

  if (error) {
    console.error('❌ Games Query Error:', error);
    return (
      <div className="error">
        <h2>Error loading games</h2>
        <p>Network Error: {error.networkError?.message || 'Unknown error'}</p>
        <p>GraphQL Errors: {error.graphQLErrors?.map(e => e.message).join(', ') || 'None'}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  
  if (loading) return <div className="loading">Loading...</div>;

  const { games } = data;

  return (
    <div className="games-container">
              <div className="games-header">
          <h1>NFL Schedule & Picks</h1>
          
          {/* Week Selector */}
          <div className="week-selector">
            <label htmlFor="week-select">Viewing Week: </label>
            <select
              id="week-select"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
            >
              {Array.from({length: 18}, (_, i) => i + 1).map(week => (
                <option key={week} value={week}>Week {week}</option>
              ))}
            </select>
            <span className="week-note">
              {selectedWeek < getCurrentWeek() ? '📅 Previous week - Picks are locked' : 
               selectedWeek === getCurrentWeek() ? '🎯 Current week - Make your picks!' : 
               '⏰ Future week - Games not yet available'}
            </span>
          </div>

          {currentUser ? (
            <div>
              <p className="welcome">Welcome, {currentUser.name}!</p>
              <p className="debug-info">User ID: {currentUser.id} (Type: {typeof currentUser.id})</p>
              <button onClick={testAuth} style={{margin: '10px', padding: '5px'}}>Test Auth</button>
              <button onClick={() => refetch()} style={{margin: '10px', padding: '5px'}}>Refresh Games</button>
            </div>
          ) : (
            <p className="login-prompt">Please <a href="/login">log in</a> to make picks</p>
          )}
        </div>
      
      <div className="games-list">
        {games.map((game) => (
          <Game
            key={game.id}
            game={game}
            onPick={handlePick}
            currentUser={currentUser}
            hasGameStarted={hasGameStarted}
            currentWeek={getCurrentWeek()}
          />
        ))}
      </div>
    </div>
  );
}

export default Games;
