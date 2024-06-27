import React from 'react'
import NFLlogo from '../NFLlogo.svg';

function Home() {
  return (
    <div>
        <h1>Welcome to NFL Gamepicks</h1>
        <p>
            <img src={NFLlogo} className="NFLlogo" alt="NFLlogo" />
        </p>
    </div>
  )
}

export default Home
