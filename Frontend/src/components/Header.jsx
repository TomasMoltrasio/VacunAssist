import React from "react";
import "@styles/Header.scss";
import logoMain from "@logos/Logo_VacunAssist.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="navbar-left-header">
        <Link to="/" className="logo-container-header">
          <img src={logoMain} alt="logo" className="nav-logo-header" />
        </Link>
        <span className="nombre-logo-header">VacunAssist</span>
      </div>
    </nav>
  );
};

export default Header;
