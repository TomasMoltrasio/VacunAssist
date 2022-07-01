import React from "react";
import "@styles/CreateAccount.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreateAccount = () => {
  const [dni, setDNI] = useState(null);
  const [password, setPassword] = useState(null);
  const [sexo, setSexo] = useState(null);
  const [email, setEmail] = useState(null);
  const [vacunatorio, setVacunatorio] = useState(null);
  const [riesgo, setRiesgo] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  const handle = (e) => {
    e.target.name === "dni"
      ? setDNI(e.target.value)
      : setPassword(e.target.value);
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
    if (
      dni === null ||
      password === null ||
      email === null ||
      vacunatorio === null ||
      riesgo === null ||
      sexo === null
    ) {
      swal("Error", "Todos los campos son obligatorios", "error");
    } else {
      const data = {
        dni,
        tramite: password,
        sexo,
        email,
        vacunatorio,
        riesgo,
        rol: "3",
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/users",
          data
        );
        const usuario = await response.data;
        await auth.login(usuario);

        await axios.post("http://localhost:3000/api/v1/list", {
          dni: dni,
          riesgo: riesgo,
          vacunatorio: vacunatorio,
        });
        swal({
          title: "Registro exitoso",
          text: "Volveras a la pantalla de inicio de sesion",
          icon: "success",
        }).then(() => navigate("/"));
      } catch (error) {
        swal({
          title: "Registro fallido",
          text: error.request.response,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="CreateAccount">
      <div className="CreateAccount-container">
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
                onChange={() => {
                  setSexo("F");
                }}
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
                onChange={() => {
                  setSexo("M");
                }}
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
            <option value="" selected></option>
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
