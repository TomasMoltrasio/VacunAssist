import React from "react";
import { useState } from "react";
import "@styles/MyAccount.scss";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

const MyAccount = () => {
  const auth = useAuth();
  const [email, setEmail] = useState(false);
  const [covid, setCovid] = useState(false);
  const [mod, setMod] = useState(false);
  const [startdateCovid, setStartDateCovid] = useState(new Date());

  const handleToggle = (e) => {
    e.preventDefault();
    swal({
      title: "Editar email",
      text: "¿Estas seguro de que deseas modificar tu email?",
      icon: "info",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        setEmail(auth.user.email);
        if (validarEmail(email) === 1) {
          await axios.patch(
            `http://localhost:3000/api/v1/users/${auth.user.dni}`,
            {
              email: email,
            }
          );
          swal({
            title: "Datos actualizados",
            text: "Los datos han sido actualizados con exito",
            icon: "success",
          });
        } else {
          swal({
            title: "Email invalido",
            text: "El email ingresado no es valido",
            icon: "error",
          });
        }
      }
    });
  };

  const fetchData = () => {
    setEmail(auth.user.email);
    setCovid(auth.espera.covid);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function validarEmail(valor) {
    console.log(valor);
    const expReg =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const esValido = expReg.test(valor);
    if (esValido === true) {
      return 1;
    } else {
      return 2;
    }
  }

  const confirmarDatos = async (e) => {
    e.preventDefault();
    swal({
      title: "Ingresar dosis",
      text: "¿Estas seguro de que deseas ingresar la dosis correspondiente?",
      icon: "info",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        await fetch(`http://localhost:3000/api/v1/turns/${auth.user.dni}`, {
          method: "POST", // or 'PUT'
          body: JSON.stringify({
            marca: "Covid",
            dosis: covid - 1,
            fecha: Date.parse(startdateCovid),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await axios.patch(
          `http://localhost:3000/api/v1/list/${auth.user.dni}`,
          {
            covid: covid,
          }
        );
        console.log(res);
      }
      swal({
        title: "Dosis ingresada con exito",
        icon: "success",
      });
    });
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
                placeholder={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
              <button
                className="secondary-button login-button edit-button"
                onClick={handleToggle}
              >
                Editar
              </button>
            </div>
            <span className="spanDosis">
              <b>
                Si te diste una dosis de COVID en otro lugar, registrala aca:
              </b>
            </span>
            <form className="formPersonalAccount">
              <input
                className="boxDecision"
                type="radio"
                name="decision"
                defaultValue="1"
                id="primera"
                disabled={covid > 2}
                onChange={() => {
                  setCovid(2);
                  setMod(true);
                }}
                checked={covid === 2}
              />
              <label className="labelDecision activo" htmlFor="primera">
                1°
              </label>
              <input
                className="boxDecision"
                type="radio"
                name="decision"
                defaultValue="2"
                id="segunda"
                disabled={covid > 3}
                onChange={() => {
                  setCovid(3);
                  setMod(true);
                }}
                checked={covid === 3}
              />
              <label className="labelDecision" htmlFor="segunda">
                2°
              </label>
              <input
                className="boxDecision"
                type="radio"
                name="decision"
                defaultValue="3"
                id="tercera"
                disabled={covid > 4}
                onChange={() => {
                  setCovid(4);
                  setMod(true);
                }}
                checked={covid === 4}
              />
              <label className="labelDecision" htmlFor="tercera">
                3°
              </label>
            </form>
            {mod ? (
              <input
                className="calendario-covid"
                type="date"
                id="start"
                name="trip-start"
                max={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setStartDateCovid(e.target.value)}
              />
            ) : null}
          </div>
          <input
            type="submit"
            value="Confirmar"
            className="secondary-button login-button-my-account"
            onClick={(e) => confirmarDatos(e)}
          />
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
