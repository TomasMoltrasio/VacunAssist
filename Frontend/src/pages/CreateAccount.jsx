import React from "react";
import "@styles/CreateAccount.scss";
import { useState } from "react";

const CreateAccount = () => {
  const [dni, setDNI] = useState(null);
  const [password, setPassword] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [email, setEmail] = useState(null);
  const [vacunatorio, setVacunatorio] = useState(null);
  const [riesgo, setRiesgo] = useState(null);

  const handle = (e) => {
    e.target.name === "dni"
      ? setDNI(e.target.value)
      : setPassword(e.target.value);
  };

  const handleSexo = (e) => {
    e.target.id === "hombreForm" ? setSexo("M") : setSexo("F");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleVacunatorio = (e) => {
    setVacunatorio(e.target.value);
  };

  const handleRiesgo = (e) => {
    e.target.id === "noForm" ? setRiesgo(false) : setRiesgo(true);
  };

  const confirmarDatos = async (e) => {
    e.preventDefault();
    const data = {
      dni,
      tramite: password,
      sexo,
      email,
      vacunatorio,
      riesgo,
      rol: "3",
    };
    console.log(data);
    try {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const usuario = await response.json();
      console.log(usuario);
    } catch (error) {
      console.log(error);
    }
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
              value={email}
              onChange={handleEmail}
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
          <label for="password" className="label">
            Elegir vacunatorio
          </label>
          <select name="vacunatorio" onChange={handleVacunatorio}>
            <option value="1">Hospital 9 de Julio</option>
            <option value="2">Corralón municipal</option>
            <option value="3">Polideportivo</option>
          </select>
          <span className="spanEdad">
            <b>¿Padece alguna de las siguientes condiciones?</b>
          </span>
          <ul className="lista">
            <li>Problemas cardiacos</li>
            <li>Problemas respiratorios</li>
            <li>Embarazo</li>
            <li>Obesidad</li>
          </ul>
          <form className="formPersonalAccount">
            <input
              className="boxDecision"
              type="radio"
              name="decision"
              defaultValue="No"
              id="noForm"
              onChange={handleRiesgo}
            />
            <label className="labelDecision activo" htmlFor="noForm">
              No
            </label>
            <input
              className="boxDecision"
              type="radio"
              name="decision"
              defaultValue="Si"
              id="siForm"
              onChange={handleRiesgo}
            />
            <label className="labelDecision" htmlFor="siForm">
              Si
            </label>
          </form>
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
