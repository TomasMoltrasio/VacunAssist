import React from "react";
import "@styles/Register.scss";
import axios from "axios";
import swal from "sweetalert";
import { useState, useEffect } from "react";

const RegisterVacunator = () => {
  const [dni, setDni] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [vacunatorio, setVacunatorio] = useState(null);
  const [mod, setMod] = useState(null);
  const [error, setError] = useState(null);

  function validarEmail(valor) {
    const expReg =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const esValido = expReg.test(valor);
    if (esValido === true) {
      return 1;
    } else {
      return 2;
    }
  }

  const verificarDni = async (e) => {
    if (dni.length === 8) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/users/${dni}`
        );
        if (res.data !== undefined) {
          setName(res.data.nombre + " " + res.data.apellido);
          setEmail(res.data.email);
          setMod(true);
          setError(null);
        }
        console.log(name);
      } catch (error) {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/api/v1/users/no-register/${dni}`
          );
          if (data !== undefined) {
            if (data.nombre !== undefined) {
              setName(data.nombre + " " + data.apellido);
              setMod(null);
              setError(null);
            } else {
              setName(data.apellido);
              setMod(null);
              setError(null);
            }
          }
        } catch (error) {
          setName("No existe");
          setError(true);
          setMod(null);
        }
      }
    } else {
      setName("");
      setEmail("");
      setMod(null);
      setError(null);
    }
  };

  useEffect(() => {
    verificarDni();
  }, [dni]);

  const confirmarDatos = async (e) => {
    e.preventDefault();
    console.log(name, email, dni, password, vacunatorio);
    if (validarEmail(email) !== 1) {
      swal("Error", "Email no valido", "error");
      return;
    } else if (mod === true) {
      try {
        await axios.patch(`http://localhost:3000/api/v1/users/${dni}`, {
          rol: 2,
          vacunatorioTrabajo: vacunatorio,
        });
        swal("Registro exitoso", "", "success").then(() => {
          location.reload();
        });
      } catch (error) {
        swal("Error", "No se pudo registrar", "error");
      }
    } else if (
      dni !== null &&
      password !== null &&
      email !== null &&
      vacunatorio !== null
    ) {
      try {
        await axios.post(`http://localhost:3000/api/v1/users`, {
          dni,
          tramite: password,
          email,
          rol: 2,
          riesgo: true,
          vacunatorio: 1,
          sexo: "M",
          vacunatorioTrabajo: vacunatorio,
        });
        swal("Registro exitoso", "", "success").then(() => {
          location.reload();
        });
      } catch (error) {
        swal("Error", error.request.response, "error");
      }
    } else {
      swal("Error", "Hay que ingresar todos los datos", "error");
    }
  };

  return (
    <div className="register-vacunator-container">
      <h1>Vacunador</h1>
      <form className="form-register-vacunator">
        <label htmlFor="nombre">Nombre</label>
        <input type="text" id="nombre" value={name} disabled />
        <label htmlFor="dni">DNI</label>
        <input type="text" id="dni" onChange={(e) => setDni(e.target.value)} />
        <label htmlFor="tramite">Numero de tramite</label>
        <input
          type="password"
          id="tramite"
          disabled={mod === true}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          disabled={mod === true}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="vacunatorio">Vacunatorio</label>
        <select
          name="vacunatorio"
          id="vacunatorio"
          onChange={(e) => setVacunatorio(e.target.value)}
        >
          <option value=""></option>
          <option value="1">Hospital 9 de Julio</option>
          <option value="2">Corralon municipal</option>
          <option value="3">Polideportivo</option>
        </select>
        <button
          className="btn-register-vacunator"
          onClick={(e) => confirmarDatos(e)}
          disabled={error === true}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterVacunator;
