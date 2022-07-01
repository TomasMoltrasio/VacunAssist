import React from "react";
import "@styles/Register.scss";
import RegisterAdmin from "../components/RegisterAdmin";
import RegisterVacunator from "../components/RegisterVacunator";

const Register = () => {
  return (
    <div className="register-container">
      <h1 className="titulo-register">Registro</h1>
      <RegisterVacunator />
      <RegisterAdmin />
    </div>
  );
};

export default Register;
