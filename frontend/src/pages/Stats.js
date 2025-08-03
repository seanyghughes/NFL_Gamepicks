import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './Stats.css';

const GET_WEEKLY_SCORES = gql`
  query GetWeeklyScores($year: Int!, $week: Int!) {
    weeklyScores(year: $year, week: $week) {
      user {
        id
        name
      }
      correct_picks
      total_picks
      winPercentage
      totalGamesAvailable
    }
  }
`;

const GET_USER_PICKS = gql`
  query GetUserPicks($userId: ID!) {
    userPicks(userId: $userId) {
      id
      team {
        name
      }
      game {
        id
        week
        home_team {
          name
        }
        road_team {
          name
        }
        winning_team {
          name
        }
        is_finalized
      }
    }
  }
`;

const GET_SEASON_LEADERBOARD = gql`
  query GetSeasonLeaderboard($year: Int!) {
    seasonLeaderboard(year: $year) {
      user {
        id
        name
      }
      totalCorrect
      totalPicks
      totalGamesAvailable
      winPercentage
    }
  }
`;

const GET_USER_TEAM_ANALYSIS = gql`
  query GetUserTeamAnalysis($userId: ID!) {
    userTeamAnalysis(userId: $userId) {
      teamAnalysis {
        teamId
        teamName
        totalPicks
        correctPicks
        winPercentage
      }
      heroTeam {
        teamId
        teamName
        totalPicks
        correctPicks
        winPercentage
      }
      jinxTeam {
        teamId
        teamName
        totalPicks
        correctPicks
        winPercentage
      }
    }
  }
`;

function Stats() {
  const [currentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedWeek, setSelectedWeek] = useState(1);

  const { data: weeklyScoresData, loading: weeklyLoading } = useQuery(GET_WEEKLY_SCORES, {
    variables: { year: selectedYear, week: selectedWeek }
  });

  const { data: userPicksData, loading: picksLoading } = useQuery(GET_USER_PICKS, {
    variables: { userId: currentUser?.id },
    skip: !currentUser
  });

  const { data: seasonLeaderboardData, loading: seasonLoading } = useQuery(GET_SEASON_LEADERBOARD, {
    variables: { year: selectedYear }
  });

  const { data: teamAnalysisData, loading: teamAnalysisLoading } = useQuery(GET_USER_TEAM_ANALYSIS, {
    variables: { userId: currentUser?.id },
    skip: !currentUser
  });

  const generateWeekOptions = () => {
    const weeks = [];
    for (let i = 1; i <= 18; i++) {
      weeks.push(i);
    }
    return weeks;
  };

  const generateYearOptions = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= currentYear - 2; i--) {
      years.push(i);
    }
    return years;
  };

  const calculateUserStats = () => {
    if (!userPicksData?.userPicks) return null;

    const picks = userPicksData.userPicks;
    const finalizedPicks = picks.filter(pick => pick.game.is_finalized);
    const correctPicks = finalizedPicks.filter(pick => 
      pick.team.name === pick.game.winning_team?.name
    );

    return {
      totalPicks: picks.length,
      finalizedPicks: finalizedPicks.length,
      correctPicks: correctPicks.length,
      winPercentage: finalizedPicks.length > 0 
        ? ((correctPicks.length / finalizedPicks.length) * 100).toFixed(1)
        : 0
    };
  };

  const userStats = calculateUserStats();

  if (!currentUser) {
    return (
      <div className="stats-container">
        <div className="login-prompt">
          <h1>Statistics</h1>
          <p>Please <a href="/login">log in</a> to view your statistics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h1>Statistics</h1>
        <p className="welcome">Welcome, {currentUser.name}!</p>
      </div>

      <div className="stats-grid">
        {/* User Stats Section */}
        <div className="stats-section">
          <h2>Your Performance</h2>
          {userStats ? (
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Total Picks</h3>
                <p className="stat-number">{userStats.totalPicks}</p>
              </div>
              <div className="stat-card">
                <h3>Finalized Games</h3>
                <p className="stat-number">{userStats.finalizedPicks}</p>
              </div>
              <div className="stat-card">
                <h3>Correct Picks</h3>
                <p className="stat-number">{userStats.correctPicks}</p>
              </div>
              <div className="stat-card">
                <h3>Win Percentage</h3>
                <p className="stat-number">{userStats.winPercentage}%</p>
              </div>
            </div>
          ) : (
            <p className="no-stats">No picks made yet. Start making picks to see your statistics!</p>
          )}
        </div>

        {/* Weekly Leaderboard Section */}
        <div className="stats-section">
          <h2>Weekly Leaderboard</h2>
          <div className="week-selector">
            <div className="selector-group">
              <label htmlFor="year">Year:</label>
              <select 
                id="year" 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {generateYearOptions().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div className="selector-group">
              <label htmlFor="week">Week:</label>
              <select 
                id="week" 
                value={selectedWeek} 
                onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
              >
                {generateWeekOptions().map(week => (
                  <option key={week} value={week}>Week {week}</option>
                ))}
              </select>
            </div>
          </div>

          {weeklyLoading ? (
            <div className="loading">Loading weekly scores...</div>
          ) : (
            <div className="leaderboard">
              {weeklyScoresData?.weeklyScores.length > 0 ? (
                <>
                  <div className="season-info">
                    <p>Based on {weeklyScoresData.weeklyScores[0]?.totalGamesAvailable || 0} total games available this week</p>
                  </div>
                  <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Player</th>
                      <th>Correct Picks</th>
                      <th>Total Picks</th>
                      <th>Win %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklyScoresData.weeklyScores.map((score, index) => (
                      <tr key={score.user.id} className={score.user.id === currentUser.id ? 'current-user' : ''}>
                        <td>{index + 1}</td>
                        <td>{score.user.name}</td>
                        <td>{score.correct_picks}</td>
                        <td>{score.total_picks}</td>
                        <td>{score.winPercentage.toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </>
              ) : (
                <p className="no-data">No scores available for this week</p>
              )}
            </div>
          )}
        </div>

        {/* Season Leaderboard Section */}
        <div className="stats-section">
          <h2>Season Leaderboard</h2>
          {seasonLoading ? (
            <div className="loading">Loading season leaderboard...</div>
          ) : (
            <div className="leaderboard">
              {seasonLeaderboardData?.seasonLeaderboard.length > 0 ? (
                <>
                  <div className="season-info">
                    <p>Based on {seasonLeaderboardData.seasonLeaderboard[0]?.totalGamesAvailable || 0} total games available</p>
                  </div>
                  <table className="leaderboard-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Correct Picks</th>
                        <th>Picks Made</th>
                        <th>Win %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {seasonLeaderboardData.seasonLeaderboard.map((score, index) => (
                        <tr key={score.user.id} className={score.user.id === currentUser.id ? 'current-user' : ''}>
                          <td>{index + 1}</td>
                          <td>{score.user.name}</td>
                          <td>{score.totalCorrect}</td>
                          <td>{score.totalPicks}</td>
                          <td>{score.winPercentage.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <p className="no-data">No season data available</p>
              )}
            </div>
          )}
        </div>

        {/* Team Analysis Section */}
        <div className="stats-section">
          <h2>Your Team Analysis</h2>
          {teamAnalysisLoading ? (
            <div className="loading">Loading team analysis...</div>
          ) : (
            <div className="team-analysis">
              {teamAnalysisData?.userTeamAnalysis ? (
                <div className="analysis-cards">
                  {teamAnalysisData.userTeamAnalysis.heroTeam && (
                    <div className="analysis-card hero">
                      <h3>🏆 Your Hero Team</h3>
                      <div className="team-info">
                        <h4>{teamAnalysisData.userTeamAnalysis.heroTeam.teamName}</h4>
                        <p>Picks: {teamAnalysisData.userTeamAnalysis.heroTeam.totalPicks}</p>
                        <p>Correct: {teamAnalysisData.userTeamAnalysis.heroTeam.correctPicks}</p>
                        <p>Win Rate: {teamAnalysisData.userTeamAnalysis.heroTeam.winPercentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  )}
                  
                  {teamAnalysisData.userTeamAnalysis.jinxTeam && (
                    <div className="analysis-card jinx">
                      <h3>💀 Your Jinx Team</h3>
                      <div className="team-info">
                        <h4>{teamAnalysisData.userTeamAnalysis.jinxTeam.teamName}</h4>
                        <p>Picks: {teamAnalysisData.userTeamAnalysis.jinxTeam.totalPicks}</p>
                        <p>Correct: {teamAnalysisData.userTeamAnalysis.jinxTeam.correctPicks}</p>
                        <p>Win Rate: {teamAnalysisData.userTeamAnalysis.jinxTeam.winPercentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="no-data">Not enough data for team analysis</p>
              )}
            </div>
          )}
        </div>

        {/* Recent Picks Section */}
        <div className="stats-section">
          <h2>Your Recent Picks</h2>
          {picksLoading ? (
            <div className="loading">Loading your picks...</div>
          ) : (
            <div className="recent-picks">
              {userPicksData?.userPicks.length > 0 ? (
                <div className="picks-list">
                  {userPicksData.userPicks.slice(0, 10).map((pick) => (
                    <div key={pick.id} className="pick-item">
                      <div className="pick-game">
                        <span className="pick-week">Week {pick.game.week}</span>
                        <span className="pick-matchup">
                          {pick.game.road_team.name} @ {pick.game.home_team.name}
                        </span>
                      </div>
                      <div className="pick-details">
                        <span className="pick-team">Picked: {pick.team.name}</span>
                        {pick.game.is_finalized ? (
                          <span className={`pick-result ${
                            pick.team.name === pick.game.winning_team?.name ? 'correct' : 'incorrect'
                          }`}>
                            {pick.team.name === pick.game.winning_team?.name ? '✓' : '✗'}
                          </span>
                        ) : (
                          <span className="pick-pending">Pending</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data">No picks made yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stats;
