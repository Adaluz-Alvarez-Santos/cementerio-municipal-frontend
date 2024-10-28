import React from 'react';
import logo from '../assets/logo.png'; // Asegúrate de que esta ruta apunte a tu logo
import  '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="Logo" className="header-logo" /> 
      </div>
      <br/> 
    </header>
  );
}
export default Header;
