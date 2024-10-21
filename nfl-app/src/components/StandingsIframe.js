// src/components/StandingsIframe.js
import React from 'react';

const StandingsIframe = () => {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="https://www.nfl.com/standings/"
        title="NFL Standings"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      ></iframe>
    </div>
  );
};

export default StandingsIframe;
