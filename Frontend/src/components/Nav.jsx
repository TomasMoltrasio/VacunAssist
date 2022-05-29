import React from "react";
import "@styles/Nav.scss";
import logoMain from "@logos/Logo_VacunAssist.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Cookies from "universal-cookie";
import { FaShareSquare } from "react-icons/fa";
import swal from "sweetalert";

const Nav = () => {
  const cookie = new Cookies();
  const user = cookie.get("user");
  const auth = useAuth();
  const navigate = useNavigate();
  const handle = () => {
    switch (user.rol) {
      case 1:
        return "Administrador";
      case 2:
        return "Vacunador";
      case 3:
        return "Ciudadano";
    }
  };

  const cerrarSesion = () => {
    swal({
      title: "Cerrar sesión",
      text: "¿Estas seguro de que deseas cerrar sesión?",
      icon: "warning",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        auth.logout();
        navigate("/");
      }
    });
  };

  return (
    <nav>
      <div className="navbar-left">
        <div className="logo-container-nav">
          <Link to="/campaign">
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
          {user.rol === 2 ? (
            <Link to="/turns-vacunador" className="Link">
              Turnos vacunador
            </Link>
          ) : null}
          <Link to="/account" className="Link">
            Editar perfil
          </Link>
        </ul>
      </div>
      <div className="navbar-right">
        <ul>
          <li className="navbar-email">{`${handle()}`}</li>
          <li className="navbar-shopping-cart">{`${user.nombre} ${user.apellido}`}</li>
        </ul>
        <FaShareSquare
          className="cerrar-sesion"
          onClick={() => {
            cerrarSesion();
          }}
        />
      </div>
    </nav>
  );
};

export default Nav;
