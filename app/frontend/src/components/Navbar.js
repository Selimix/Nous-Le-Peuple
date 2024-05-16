import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/signup">Inscription</Link>
        </li>
        <li>
          <Link to="/login">Connexion</Link>
        </li>
        <li>
          <Link to="/user/stats">Statistiques Personnelles</Link>
        </li>
        <li>
          <Link to="/user/ranking">Classement</Link>
        </li>
        <li>
          <Link to="/admin/validate-users">Valider Utilisateurs</Link>
        </li>
        <li>
          <Link to="/admin/stats">Statistiques Globales</Link>
        </li>
        <li>
          <Link to="/admin/manage-users">Gérer Utilisateurs</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
