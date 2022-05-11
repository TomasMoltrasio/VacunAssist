import React, { useRef } from "react";
import "@styles/Login.scss";
import logo from "@logos/Logo_VacunAssist_1.png";
import { Link } from "react-router-dom";

const Login = () => {
  const form = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const data = {
      username: formData.get("email"),
      password: formData.get("password"),
    };
    console.log(data);
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <img src={logo} alt="logo" className="logo" />
        <form action="/" className="form" ref={form}>
          <label htmlFor="email" className="label">
            DNI
          </label>
          <input
            type="text"
            name="dni"
            placeholder="23456789"
            className="input input-email"
          />
          <label htmlFor="password" className="label">
            Numero de tramite
          </label>
          <input
            type="password"
            name="numeroTramite"
            placeholder="*********"
            className="input input-password"
          />
          <div className="infoPersonalLogin">
            <form className="formPersonalLogin">
              <input
                className="boxSexoLogin"
                type="radio"
                name="sexo"
                defaultValue="Mujer"
                id="mujerFormLogin"
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
