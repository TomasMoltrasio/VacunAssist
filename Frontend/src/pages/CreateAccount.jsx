import React from "react";
import "@styles/CreateAccount.scss";
import { useState } from "react";

const CreateAccount = () => {
  const [dni, setDNI] = useState(null);
  const [password, setPassword] = useState(null);
  const [sexo, setSexo] = useState(null);

  const handle = (e) => {
    e.target.name === "dni"
      ? setDNI(e.target.value)
      : setPassword(e.target.value);
  };

  const handleSexo = (e) => {
    e.target.id === "hombreForm" ? setSexo("M") : setSexo("F");
  };

  const confirmarDatos = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="CreateAccount">
      <div className="CreateAccount-container">
        <h1 className="title">Mi cuenta</h1>
        <form className="form" action="/complete-register">
          <div>
            <label for="dni" className="label">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              placeholder="35645789"
              className="input input-name"
              name="dni"
              value={dni}
              onChange={handle}
              required
            />
            <label for="password" className="label">
              Numero de tramite
            </label>
            <input
              type="password"
              id="numeroTramite"
              placeholder="*********"
              className="input input-password"
              name="password"
              value={password}
              onChange={handle}
              required
            />
            <label for="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="fernando@example.com"
              className="input input-email"
              required
            />
          </div>
          <div className="infoPersonalCreate">
            <form className="formPersonalCreate">
              <input
                className="boxSexoCreate"
                type="radio"
                name="sexo"
                defaultValue="Mujer"
                id="mujerForm"
                required
                onChange={handleSexo}
              />
              <label className="labelsexCreate activo" htmlFor="mujerForm">
                Mujer
              </label>
              <input
                className="boxSexoCreate"
                type="radio"
                name="sexo"
                defaultValue="Hombre"
                id="hombreForm"
                required
                onChange={handleSexo}
              />
              <label className="labelsexCreate" htmlFor="hombreForm">
                Hombre
              </label>
            </form>
          </div>
          <input
            type="submit"
            value="Crear usuario"
            className="primary-button login-button-account"
            onClick={confirmarDatos}
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
