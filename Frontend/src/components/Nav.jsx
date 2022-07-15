import React from "react";
import "@styles/Nav.scss";
import logoMain from "@logos/Logo_VacunAssist.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { FaUserEdit, FaUserTie } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import axios from "axios";

const Nav = () => {
  const cookie = new Cookies();
  const user = cookie.get("user");
  const auth = useAuth();
  const [menu, setMenu] = useState(false);
  const [disabled, setDisabled] = useState(false);
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

  const choiseRol = (data) => {
    switch (data.rol) {
      case 1: // Administrador
        swal({
          title: "Cambio de rol",
          buttons: {
            ciudadano: "Ciudadano",
            administrador: "Administrador",
          },
        }).then(async (r) => {
          if (r === "ciudadano") {
            data.rol = 3;
            await auth.login(data);
            navigate("/campaign");
          } else {
            data.rol = 1;
            await auth.login(data);
            navigate("/register");
          }
        });
        break;
      case 2: // Vacunador
        swal({
          title: "Cambio de rol",
          buttons: {
            vacunador: "Vacunador",
            ciudadano: "Ciudadano",
          },
        }).then(async (r) => {
          if (r === "vacunador") {
            data.rol = 2;
            await auth.login(data);
            navigate("/turns-vacunador");
          } else {
            data.rol = 3;
            await auth.login(data);
            navigate("/campaign");
          }
        });
        break;
      case 4: // Administrador y Vacunador
        swal({
          title: "Cambio de rol",
          buttons: {
            ciudadano: "Ciudadano",
            vacunador: "Vacunador",
            administrador: "Administrador",
          },
        }).then(async (r) => {
          if (r === "ciudadano") {
            data.rol = 3;
            await auth.login(data);
            navigate("/campaign");
          } else if (r === "vacunador") {
            data.rol = 2;
            await auth.login(data);
            navigate("/turns-vacunador");
          } else {
            data.rol = 1;
            await auth.login(data);
            navigate("/register");
          }
        });
        break;
    }
  };

  const cambiarRol = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/users/${user.dni}`
    );
    if (data.rol === 3) {
      setDisabled(true);
    }
    choiseRol(data);
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
          {user.rol === 3 ? (
            <>
              <Link to="/campaign" className="Link">
                Inscribirme
              </Link>
              <Link to="/turns" className="Link">
                Turnos
              </Link>
              <Link to="/history" className="Link">
                Historial
              </Link>
            </>
          ) : null}
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
              <Link to="/assign-shift" className="Link">
                Asignar turnos
              </Link>
              <Link to="/turns-admin" className="Link">
                Ver Turnos
              </Link>
              <Link to="/average-day" className="Link">
                Promedio
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
                  <FaUserTie className="editar-rol"></FaUserTie>
                  <b onClick={() => cambiarRol()} disabled={disabled}>
                    Cambiar rol
                  </b>
                </li>

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
