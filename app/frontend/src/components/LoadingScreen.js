import React from 'react';
import './LoadingScreen.css';
import logo from '../assets/logo.svg';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <img src={logo} alt="Logo" className="logo" />
      <p>Chargement en cours...</p>
    </div>
  );
};

export default LoadingScreen;
