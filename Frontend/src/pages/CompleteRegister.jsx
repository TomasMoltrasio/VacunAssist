import React from "react";
import "@styles/CompleteRegister.scss";
import { Link } from "react-router-dom";

const CompleteRegister = () => {
  return (
    <div className="CompleteRegister">
      <div className="CompleteRegister-container">
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
        <Link to="/account">
          <button className="secondary-button login-button-my-account">
            Confirmar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CompleteRegister;
