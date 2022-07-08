import React from "react";
import "@styles/Nav.scss";
import logoMain from "@logos/Logo_VacunAssist.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import Cookies from "universal-cookie";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

const Nav = () => {
  const cookie = new Cookies();
  const user = cookie.get("user");
  const auth = useAuth();
  const [menu, setMenu] = useState(false);
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
          <Link to="/history" className="Link">
            Historial
          </Link>
          {user.rol === 2 ? (
            <Link to="/turns-vacunador" className="Link">
              Turnos vacunador
            </Link>
          ) : null}
          {user.rol === 1 ? (
            <>
              <Link to="/stock" className="Link">
                Stock
              </Link>
              <Link to="/register" className="Link">
                Registro
              </Link>
              <Link to="/turns-admin" className="Link">
                Turnos Admin
              </Link>
            </>
          ) : null}
        </ul>
      </div>
      <div className="navbar-right">
        <ul>
          <li className="navbar-email">{`${handle()}`}</li>
          <li
            className="navbar-shopping-cart"
            onClick={() => setMenu(!menu)}
          >{`${user.nombre} ${user.apellido}`}</li>
          {menu ? (
            <div className="menu-container">
              <ul>
                <li>
                  <FaUserEdit className="editar"></FaUserEdit>
                  <b onClick={() => navigate("/account")}>Mis datos</b>
                </li>
                <li>
                  <MdOutlineLogout className="cerrar-sesion"></MdOutlineLogout>
                  <b onClick={() => cerrarSesion()}>Cerrar sesion</b>
                </li>
              </ul>
            </div>
          ) : null}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
