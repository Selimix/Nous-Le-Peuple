import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OptimizeRoute from './OptimizeRoute';
import UploadPhoto from './UploadPhoto';
import Map from './Map';

const Dashboard = () => {
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPanels = async () => {
      try {
        const { data } = await axios.get('/api/panels');
        setPanels(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPanels();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {panels.map(panel => (
          <li key={panel._id}>
            {panel.location}
            <UploadPhoto panelId={panel._id} />
          </li>
        ))}
      </ul>
      <OptimizeRoute panels={panels} />
    </div>
  );
};

export default Dashboard;
