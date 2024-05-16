import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ValidateUsers = () => {
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

  const validateUser = async (userId) => {
    try {
      await axios.put(`/api/admin/validate/${userId}`);
      setUsers(users.map(user => user._id === userId ? { ...user, isValidated: true } : user));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Valider les utilisateurs</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email}
            {!user.isValidated && (
              <button onClick={() => validateUser(user._id)}>Valider</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValidateUsers;
