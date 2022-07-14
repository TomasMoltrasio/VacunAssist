import React, { useState } from "react";
import "@styles/Login.scss";
import logo from "@logos/Logo_VacunAssist.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import swal from "sweetalert";
import axios from "axios";
import Cookies from "universal-cookie";

const Login = () => {
  const [dni, setDNI] = useState(null);
  const [tramite, setTramite] = useState(null);
  const [sexo, setSexo] = useState(null);
  const auth = useAuth();
  const cookie = new Cookies();

  const navigate = useNavigate();

  const choiseRol = (data) => {
    switch (data.rol) {
      case 1: // Administrador
        swal({
          title: "Bienvenido",
          text: "¿Con que rol desea ingresar?",
          buttons: ["Ciudadano", "Administrador"],
        }).then(async (r) => {
          if (r) {
            data.rol = 1;
            await auth.login(data);
            navigate("/register");
          } else {
            data.rol = 3;
            await auth.login(data);
            navigate("/campaign");
          }
        });
        break;
      case 2: // Vacunador
        swal({
          title: "Bienvenido",
          text: "¿Con que rol desea ingresar?",
          buttons: ["Ciudadano", "Vacunador"],
        }).then(async (r) => {
          if (r) {
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
      case 3: // Ciudadano
        data.rol = 3;
        auth.login(data);
        navigate("/campaign");
        break;
      case 4: // Administrador y Vacunador
        swal({
          title: "Bienvenido",
          text: "¿Con que rol desea ingresar?",
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
          } else if (r === "administrador") {
            data.rol = 1;
            await auth.login(data);
            navigate("/register");
          }
        });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (dni === null || tramite === null || sexo === null) {
      swal("Error", "Todos los campos son obligatorios", "error");
    } else {
      const data = {
        tramite,
        sexo,
      };
      try {
        const response = await axios.post(
          `http://localhost:3000/api/v1/users/${dni}`,
          data
        );
        const usuario = await response.data;
        const turno = await axios.get(
          `http://localhost:3000/api/v1/turns/${dni}`
        );
        auth.setearTurno(turno.data);
        const res = await axios.get(`http://localhost:3000/api/v1/list/${dni}`);
        auth.setearEspera(res.data);
        choiseRol(usuario);
      } catch (error) {
        swal({
          title: "Inicio de sesion fallido",
          text: error.request.response,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <img src={logo} alt="logo" className="logo" />
        <form action="/" className="form">
          <label htmlFor="email" className="label">
            DNI
          </label>
          <input
            type="text"
            name="dni"
            placeholder="23456789"
            className="input input-email"
            value={dni}
            onChange={(e) => setDNI(e.target.value)}
          />
          <label htmlFor="password" className="label">
            Numero de tramite
          </label>
          <input
            type="password"
            name="numeroTramite"
            placeholder="*********"
            className="input input-password"
            value={tramite}
            onChange={(e) => setTramite(e.target.value)}
          />
          <div className="infoPersonalLogin">
            <form className="formPersonalLogin">
              <input
                className="boxSexoLogin"
                type="radio"
                name="sexo"
                defaultValue="Mujer"
                id="mujerFormLogin"
                onChange={() => setSexo("F")}
              />
              <label className="labelsexLogin activo" htmlFor="mujerFormLogin">
                Mujer
              </label>
              <input
                className="boxSexoLogin"
                type="radio"
                name="sexo"
                defaultValue="Hombre"
                id="hombreFormLogin"
                onChange={() => setSexo("M")}
              />
              <label className="labelsexLogin" htmlFor="hombreFormLogin">
                Hombre
              </label>
            </form>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="primary-button login-button"
          >
            Iniciar sesión
          </button>
        </form>
        <Link to="/create-account">
          <button className="secondary-button signup-button">
            Registrarse
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
