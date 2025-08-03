import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import './Results.css';

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

const GET_GAME_RESULTS = gql`
  query GetGameResults($week: Int) {
    gameResults(week: $week) {
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

const UPDATE_GAME_SCORE = gql`
  mutation UpdateGameScore($gameId: ID!, $homeScore: Int!, $roadScore: Int!) {
    updateGameScore(gameId: $gameId, homeScore: $homeScore, roadScore: $roadScore) {
      userErrors {
        message
      }
      game {
        id
        home_score
        road_score
        is_finalized
        winning_team {
          id
          name
        }
      }
    }
  }
`;

function GameResult({ game, onUpdateScore, currentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [homeScore, setHomeScore] = useState(game.home_score || '');
  const [roadScore, setRoadScore] = useState(game.road_score || '');
  const [error, setError] = useState('');

  const date = new Date(parseInt(game.time, 10));
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Get team logos
  const roadTeamLogo = teamLogos[game.road_team.name] || null;
  const homeTeamLogo = teamLogos[game.home_team.name] || null;

  const handleUpdateScore = async () => {
    if (homeScore === '' || roadScore === '') {
      setError('Please enter both scores');
      return;
    }

    const homeScoreNum = parseInt(homeScore);
    const roadScoreNum = parseInt(roadScore);

    if (isNaN(homeScoreNum) || isNaN(roadScoreNum)) {
      setError('Please enter valid numbers');
      return;
    }

    setError('');
    await onUpdateScore(game.id, homeScoreNum, roadScoreNum);
    setIsEditing(false);
  };

  const getResultDisplay = () => {
    if (!game.is_finalized || game.home_score === null || game.road_score === null) {
      return <div className="game-status">No Score Available</div>;
    }

    const homeWon = game.home_score > game.road_score;
    const roadWon = game.road_score > game.home_score;
    const isTie = game.home_score === game.road_score;

    return (
      <div className="score-display">
        <div className="score-row">
          <div className="team-score">
            {roadTeamLogo && (
              <img src={roadTeamLogo} alt={`${game.road_team.name} logo`} className="team-logo-small" />
            )}
            <span className="team-name">{game.road_team.name}</span>
            <span className={`score ${roadWon ? 'winner' : ''}`}>{game.road_score}</span>
          </div>
        </div>
        <div className="score-row">
          <div className="team-score">
            {homeTeamLogo && (
              <img src={homeTeamLogo} alt={`${game.home_team.name} logo`} className="team-logo-small" />
            )}
            <span className="team-name">{game.home_team.name}</span>
            <span className={`score ${homeWon ? 'winner' : ''}`}>{game.home_score}</span>
          </div>
        </div>
        {isTie && <div className="game-result">TIE</div>}
        {!isTie && game.winning_team && (
          <div className="game-result">
            Winner: {game.winning_team.name}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="game-result-card">
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
        </div>
        
        <div className="vs">@</div>
        
        <div className="team home-team">
          {homeTeamLogo && (
            <img src={homeTeamLogo} alt={`${game.home_team.name} logo`} className="team-logo" />
          )}
          <span className="team-name">{game.home_team.name}</span>
        </div>
      </div>

      {getResultDisplay()}

      {/* Admin score update section */}
      {currentUser && currentUser.id === 1 && !isEditing && (
        <div className="admin-section">
          <button 
            className="edit-score-btn"
            onClick={() => setIsEditing(true)}
          >
            Update Score
          </button>
        </div>
      )}

      {isEditing && (
        <div className="score-edit-section">
          <h4>Update Score</h4>
          <div className="score-inputs">
            <div className="score-input">
              <label>{game.road_team.name}:</label>
              <input
                type="number"
                value={roadScore}
                onChange={(e) => setRoadScore(e.target.value)}
                placeholder="Score"
              />
            </div>
            <div className="score-input">
              <label>{game.home_team.name}:</label>
              <input
                type="number"
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
                placeholder="Score"
              />
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="edit-buttons">
            <button className="save-score-btn" onClick={handleUpdateScore}>
              Save Score
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Results() {
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const [selectedWeek, setSelectedWeek] = useState(1);

  const { data, error, loading, refetch } = useQuery(GET_GAME_RESULTS, {
    variables: { week: selectedWeek },
    onError: (error) => {
      console.error('❌ GraphQL Query Error:', error);
    }
  });
  
  const [updateGameScore, { loading: scoreLoading }] = useMutation(UPDATE_GAME_SCORE, {
    onError: (error) => {
      console.error('❌ GraphQL Mutation Error:', error);
    }
  });

  const handleUpdateScore = async (gameId, homeScore, roadScore) => {
    try {
      const result = await updateGameScore({
        variables: {
          gameId: gameId.toString(),
          homeScore,
          roadScore
        }
      });
      
      if (result.data?.updateGameScore?.userErrors?.length > 0) {
        alert(`Error: ${result.data.updateGameScore.userErrors[0].message}`);
        return;
      }
      
      refetch(); // Refresh the data
    } catch (error) {
      console.error('❌ Error updating score:', error);
      alert(`Error updating score: ${error.message}`);
    }
  };

  if (error) {
    return (
      <div className="error">
        <h2>Error loading results</h2>
        <p>{error.message}</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  
  if (loading) return <div className="loading">Loading...</div>;

  const { gameResults } = data;

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>NFL Game Results</h1>
        
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
        </div>

        {currentUser && (
          <div className="user-info">
            <p>Welcome, {currentUser.name}!</p>
            {currentUser.id === 1 && (
              <p className="admin-note">👑 Admin: You can update scores</p>
            )}
          </div>
        )}
      </div>
      
      <div className="results-list">
        {gameResults.length === 0 ? (
          <div className="no-results">
            <p>No games found for Week {selectedWeek}</p>
          </div>
        ) : (
          gameResults.map((game) => (
            <GameResult
              key={game.id}
              game={game}
              onUpdateScore={handleUpdateScore}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Results; 