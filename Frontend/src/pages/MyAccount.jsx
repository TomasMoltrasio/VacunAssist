import React from "react";
import { useState } from "react";
import "@styles/MyAccount.scss";

const MyAccount = () => {
  const [editar, setEditar] = useState(false);
  const [email, setEmail] = useState(null);

  const handleToggle = (e) => {
    e.preventDefault();
    setEditar(!editar);
  };

  const handleEmail = () => {
    setEmail(e.target.value);
  };

  return (
    <div className="MyAccount">
      <div className="MyAccount-container">
        <h1 className="title">Mis datos</h1>
        <form className="form">
          <div>
            <label for="email" className="label">
              Email
            </label>
            <div className="div-email">
              <input
                type="email"
                className="value"
                value={email}
                disabled={!editar}
                onChange={handleEmail}
              ></input>
              <button
                className="secondary-button login-button edit-button"
                onClick={handleToggle}
              >
                Editar
              </button>
            </div>
            <label for="password" className="label">
              Elegir vacunatorio
            </label>
            <select name="vacunatorio" id="">
              <option value="">Hospital 9 de Julio</option>
              <option value="">Corralón municipal</option>
              <option value="">Polideportivo</option>
            </select>
            <span className="spanEdad">
              <b>¿Padece alguna de las siguientes condiciones?</b>
            </span>
            <ul className="lista">
              <li>Embarazo</li>
              <li>Problemas cardiacos</li>
              <li>Obesidad</li>
              <li>Problemas respiratorios</li>
            </ul>
            <form className="formPersonalAccount">
              <input
                className="boxDecision"
                type="radio"
                name="decision"
                defaultValue="No"
                id="noForm"
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
              />
              <label className="labelDecision" htmlFor="siForm">
                Si
              </label>
            </form>
          </div>
          <input
            type="submit"
            value="Confirmar"
            className="secondary-button login-button-my-account"
          />
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
