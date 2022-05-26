import React, { useState } from "react";
import "@styles/Login.scss";
import logo from "@logos/Logo_VacunAssist.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import swal from "sweetalert";
import axios from "axios";

const Login = () => {
  const [dni, setDNI] = useState(null);
  const [tramite, setTramite] = useState(null);
  const [sexo, setSexo] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      tramite,
      sexo,
    };
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/users/${dni}`,
        {
          method: "POST", // or 'PUT'
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const usuario = await response.json();
      await auth.login(usuario);
      navigate("/campaign");
    } catch (error) {
      swal({ title: "Inicio de sesion fallido", icon: "error" });
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
