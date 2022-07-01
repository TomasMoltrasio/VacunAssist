import React from "react";
import "@styles/Register.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const RegisterAdmin = () => {
  const [dni, setDni] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
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

  const confirmarDatos = async (e) => {
    e.preventDefault();

    if (validarEmail(email) !== 1) {
      swal("Error", "Email no valido", "error");
      return;
    } else if (mod === true) {
      try {
        await axios.patch(`http://localhost:3000/api/v1/users/${dni}`, {
          rol: 1,
        });
        swal("Registro exitoso", "", "success").then(() => {
          location.reload();
        });
      } catch (error) {
        swal("Error", "No se pudo registrar", "error");
      }
    } else if (dni !== null && password !== null && email !== null) {
      try {
        await axios.post(`http://localhost:3000/api/v1/users`, {
          dni,
          tramite: password,
          email,
          rol: 1,
          riesgo: true,
          vacunatorio: 1,
          sexo: "M",
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

  useEffect(() => {
    verificarDni();
  }, [dni]);

  return (
    <div className="register-admin-container">
      <h1>Administrador</h1>
      <form className="form-register-admin">
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
        <button
          className="btn-register-admin"
          onClick={(e) => confirmarDatos(e)}
          disabled={error === true}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
