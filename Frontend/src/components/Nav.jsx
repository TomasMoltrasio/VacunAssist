import React from "react";
import "@styles/Nav.scss";
import logoMain from "@logos/Logo_VacunAssist.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <div className="navbar-left">
        <div className="logo-container-nav">
          <Link to="/">
            <img src={logoMain} alt="logo" className="nav-logo" />
          </Link>
          <span className="nombre-logo-nav">VacunAssist</span>
        </div>

        <ul>
          <Link to="/campaign" className="Link">
            Inscribirme
          </Link>
          <Link to="/turns" className="Link">
            Turnos
          </Link>
          <Link to="/account" className="Link">
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
