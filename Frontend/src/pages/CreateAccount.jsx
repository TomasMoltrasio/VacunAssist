import React from "react";
import "@styles/CreateAccount.scss";

const CreateAccount = () => {
  return (
    <div className="CreateAccount">
      <div className="CreateAccount-container">
        <h1 className="title">Mi cuenta</h1>
        <form className="form" action="/account">
          <div>
            <label for="dni" className="label">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              placeholder="35645789"
              className="input input-name"
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
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
