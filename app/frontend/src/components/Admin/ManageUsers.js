import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/users');
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError(error.message);
    }
  };

  const limitUser = async (userId) => {
    try {
      await axios.put(`/api/admin/limit/${userId}`);
      setUsers(users.map(user => user._id === userId ? { ...user, role: 'limited' } : user));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Gérer les utilisateurs</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email} - Rôle: {user.role}
            <button onClick={() => deleteUser(user._id)}>Supprimer</button>
            <button onClick={() => limitUser(user._id)}>Limiter</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
