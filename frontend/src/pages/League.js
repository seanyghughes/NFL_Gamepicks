import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import './League.css';

const GET_LEAGUES = gql`
  query {
    leagues {
      id
      name
      description
      created_at
      createdByUser {
        id
        name
      }
      userLeagues {
        user {
          id
          name
        }
      }
    }
  }
`;

const CREATE_LEAGUE = gql`
  mutation CreateLeague($name: String!, $description: String) {
    leagueCreate(name: $name, description: $description) {
      userErrors {
        message
      }
      league {
        id
        name
        description
      }
    }
  }
`;

const JOIN_LEAGUE = gql`
  mutation JoinLeague($leagueId: ID!) {
    leagueJoin(leagueId: $leagueId) {
      userErrors {
        message
      }
      league {
        id
        name
      }
    }
  }
`;

const GET_LEAGUE_STANDINGS = gql`
  query GetLeagueStandings($leagueId: ID!) {
    leagueStandings(leagueId: $leagueId) {
      user {
        id
        name
      }
      totalCorrect
      totalPicks
      winPercentage
    }
  }
`;

function League() {
  const [currentUser] = useState(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [leagueName, setLeagueName] = useState('');
  const [leagueDescription, setLeagueDescription] = useState('');
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { data: leaguesData, loading: leaguesLoading, refetch: refetchLeagues } = useQuery(GET_LEAGUES);
  const { data: standingsData, loading: standingsLoading } = useQuery(GET_LEAGUE_STANDINGS, {
    variables: { leagueId: selectedLeague?.id },
    skip: !selectedLeague
  });

  const [createLeague, { loading: createLoading }] = useMutation(CREATE_LEAGUE);
  const [joinLeague, { loading: joinLoading }] = useMutation(JOIN_LEAGUE);

  const handleCreateLeague = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentUser) {
      setError('Please log in to create a league');
      return;
    }

    try {
      const result = await createLeague({
        variables: {
          name: leagueName,
          description: leagueDescription
        }
      });

      if (result.data.leagueCreate.userErrors.length > 0) {
        setError(result.data.leagueCreate.userErrors[0].message);
      } else {
        setSuccess('League created successfully!');
        setLeagueName('');
        setLeagueDescription('');
        setShowCreateForm(false);
        refetchLeagues();
      }
    } catch (error) {
      setError('An error occurred while creating the league');
    }
  };

  const handleJoinLeague = async (leagueId) => {
    if (!currentUser) {
      setError('Please log in to join a league');
      return;
    }

    try {
      const result = await joinLeague({
        variables: { leagueId: leagueId.toString() }
      });

      if (result.data.leagueJoin.userErrors.length > 0) {
        setError(result.data.leagueJoin.userErrors[0].message);
      } else {
        setSuccess('Successfully joined the league!');
        refetchLeagues();
      }
    } catch (error) {
      setError('An error occurred while joining the league');
    }
  };

  const isUserInLeague = (league) => {
    return league.userLeagues.some(member => member.user.id === currentUser?.id);
  };

  if (leaguesLoading) return <div className="loading">Loading leagues...</div>;

  return (
    <div className="league-container">
      <div className="league-header">
        <h1>NFL Pick'em Leagues</h1>
        {currentUser ? (
          <button 
            className="create-league-btn"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel' : 'Create New League'}
          </button>
        ) : (
          <p className="login-prompt">Please <a href="/login">log in</a> to create or join leagues</p>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {showCreateForm && (
        <div className="create-league-form">
          <h3>Create New League</h3>
          <form onSubmit={handleCreateLeague}>
            <div className="form-group">
              <label htmlFor="leagueName">League Name:</label>
              <input
                type="text"
                id="leagueName"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="leagueDescription">Description (optional):</label>
              <textarea
                id="leagueDescription"
                value={leagueDescription}
                onChange={(e) => setLeagueDescription(e.target.value)}
                rows="3"
              />
            </div>
            <button type="submit" disabled={createLoading}>
              {createLoading ? 'Creating...' : 'Create League'}
            </button>
          </form>
        </div>
      )}

      <div className="leagues-section">
        <h2>Available Leagues</h2>
        <div className="leagues-grid">
          {leaguesData?.leagues.map((league) => (
            <div key={league.id} className="league-card">
              <div className="league-info">
                <h3>{league.name}</h3>
                {league.description && <p className="league-description">{league.description}</p>}
                <p className="league-creator">Created by: {league.createdByUser.name}</p>
                <p className="league-members">
                  Members: {league.userLeagues.length}
                </p>
              </div>
              
              <div className="league-actions">
                {currentUser && !isUserInLeague(league) && (
                  <button
                    className="join-btn"
                    onClick={() => handleJoinLeague(league.id)}
                    disabled={joinLoading}
                  >
                    {joinLoading ? 'Joining...' : 'Join League'}
                  </button>
                )}
                {currentUser && isUserInLeague(league) && (
                  <button
                    className="view-standings-btn"
                    onClick={() => setSelectedLeague(league)}
                  >
                    View Standings
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedLeague && (
        <div className="standings-section">
          <h2>{selectedLeague.name} - Standings</h2>
          {standingsLoading ? (
            <div className="loading">Loading standings...</div>
          ) : (
            <div className="standings-table">
              <table>
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
                  {standingsData?.leagueStandings.map((standing, index) => (
                    <tr key={standing.user.id}>
                      <td>{index + 1}</td>
                      <td>{standing.user.name}</td>
                      <td>{standing.totalCorrect}</td>
                      <td>{standing.totalPicks}</td>
                      <td>{standing.winPercentage.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button 
            className="close-standings-btn"
            onClick={() => setSelectedLeague(null)}
          >
            Close Standings
          </button>
        </div>
      )}
    </div>
  );
}

export default League;
