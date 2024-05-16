import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('/api/admin/stats');
        setStats(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1>Statistiques</h1>
      {error && <p>{error}</p>}
      <p>Nombre total d'utilisateurs: {stats.totalUsers}</p>
      <p>Nombre total de panneaux: {stats.totalPanels}</p>
      <p>Nombre de panneaux couverts: {stats.coveredPanels}</p>
    </div>
  );
};

export default Stats;
