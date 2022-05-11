import React from "react";
import "@styles/Nav.scss";
import logoMain from "@logos/Logo.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="navbar-left">
        <Link to="/">
          <img src={logoMain} alt="logo" className="nav-logo" />
        </Link>
        <ul>
          <Link to="/" className="Link">
            Home
          </Link>
          <Link to="/" className="Link">
            Usuarios
          </Link>
          <Link to="/" className="Link">
            Vacunas
          </Link>
          <Link to="/" className="Link">
            Editar perfil
          </Link>
        </ul>
      </div>
      <div className="navbar-right">
        <ul>
          <li className="navbar-email">Aministrador</li>
          <li className="navbar-shopping-cart">Tomas Moltrasio</li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
