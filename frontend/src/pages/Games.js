import React from 'react';
import { gql, useQuery } from '@apollo/client'

// import StandingsIframe from '../components/StandingsIframe';

const GET_POSTS = gql`
  query {
  games{
    week
    time
    stadium
    
    road_team {
      name
    }
    home_team {
      name
    }
  }
}
`

function Games() {
  const { data, error, loading } = useQuery(GET_POSTS);

  console.log({
    data, 
    error, 
    loading,
  });

  if(error) return <div>Error Page</div>

  if(loading) return <div>Loading...</div>

  const { games } = data

  return (
  
    <div>
      {games.map(game => {
        return (
          <Games 
            week={game.week} 
            stadium={game.stadium}
            time={game.time}
          />
        );
      })}
    </div>
  )
}

export default Games
