import React from 'react';

// import StandingsIframe from '../components/StandingsIframe';

function Games() {
  return (
    <div>
      <h1>Games</h1>
      <div className='Game-Selection'>
            <form> Game 1:
              <img src='nfl-app/src/images/new-england-patriots-logo-transparent.png' alt='New England Patriots'/>
              <button>New England Patriots</button>
              <img src='/Users/seanhughes/Desktop/GitHub/NFL_Gamepicks/nfl-app/buffalo-bills-logo-transparent.png' alt='Buffalo Bills'/>
              <button>Buffalo Bills</button>
            </form>
            <form> Game 2: 
              <button>Green Bay Packers</button>
              <button>Kansas City Chiefs</button>
            </form>
        </div>
    </div>
    
  )
}

export default Games
