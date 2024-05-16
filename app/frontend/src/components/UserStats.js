import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserStats = () => {
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/users/stats');
        setStats(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchStats();
  }, []);

  const getMedals = () => {
    const medals = [];
    if (stats.panelsPosted >= 50) medals.push('Gold');
    else if (stats.panelsPosted >= 20) medals.push('Silver');
    else if (stats.panelsPosted >= 10) medals.push('Bronze');
    return medals;
  };

  return (
    <div>
      <h1>Statistiques Personnelles</h1>
      {error && <p>{error}</p>}
      <p>Nombre de panneaux collés: {stats.panelsPosted}</p>
      <p>Nombre de KM parcourus: {stats.kmTravelled}</p>
      <p>Nombre de points couverts: {stats.coveredPoints}</p>
      <h2>Médailles</h2>
      <ul>
        {getMedals().map((medal, index) => (
          <li key={index}>{medal}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserStats;
