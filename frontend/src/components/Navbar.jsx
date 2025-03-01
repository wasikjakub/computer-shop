import React from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-items">
          <li className="nav-item">
            <a href="/" className="nav-link">
              <span className="nav-icon">
                <i className="fas fa-home"></i> 
              </span>Główna
            </a>
          </li>
          <li className="nav-item">
            <a href="/configurator" className="nav-link">
              <span className="nav-icon"><i className="fas fa-tools"></i> </span> Konfigurator
            </a>
          </li>
          <li className="nav-item">
            <a href="/products" className="nav-link">
              <span className="nav-icon"><i className="fas fa-box"></i> </span> Produkty
            </a>
          </li>
          <li className="nav-item">
            <a href="/guide" className="nav-link">
              <span className="nav-icon"><i className="fas fa-book"></i> </span> Poradniki
            </a>
          </li>
          <li className="nav-item">
            <a href="/sets" className="nav-link">
              <span className="nav-icon"><i className="fas fa-desktop"></i> </span> Zrealizowane zestawy
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
