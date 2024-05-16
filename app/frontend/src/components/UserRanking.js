import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserRanking = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users');
        setUsers(data.sort((a, b) => b.stats.panelsPosted - a.stats.panelsPosted));
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Classement des Utilisateurs</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - Panneaux collés: {user.stats.panelsPosted}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRanking;
