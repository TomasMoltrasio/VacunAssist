import React from "react";
import { useState } from "react";
import "@styles/MyAccount.scss";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "universal-cookie";

const MyAccount = () => {
  const cookie = new Cookies();
  const user = cookie.get("user");
  const espera = cookie.get("espera");

  const auth = useAuth();
  const [dis, setDis] = useState(false);
  const [email, setEmail] = useState(false);
  const [covid, setCovid] = useState(espera.covid);
  const [mod, setMod] = useState(false);
  const [startdateCovid, setStartDateCovid] = useState(new Date());

  const handleToggle = (e) => {
    e.preventDefault();
    if (!dis) {
      setDis(true);
    } else {
      setDis(false);
      swal({
        title: "Editar email",
        text: "¿Estas seguro de que deseas modificar tu email?",
        icon: "info",
        buttons: ["NO", "SI"],
      }).then(async (r) => {
        if (r) {
          setEmail(user.email);
          if (validarEmail(email) === 1) {
            const res = await axios.patch(
              `http://localhost:3000/api/v1/users/${user.dni}`,
              {
                email: email,
              }
            );
            auth.login(res.data);
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
    }
  };

  const fetchData = () => {
    setEmail(user.email);
    setCovid(espera.covid);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const confirmarDatos = async (e) => {
    e.preventDefault();
    swal({
      title: "Ingresar dosis",
      text: "¿Estas seguro de que deseas ingresar la dosis correspondiente?",
      icon: "info",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        await fetch(`http://localhost:3000/api/v1/turns/${user.dni}`, {
          method: "POST", // or 'PUT'
          body: JSON.stringify({
            marca: "Covid",
            dosis: covid,
            fecha: Date.parse(startdateCovid),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = await axios.patch(
          `http://localhost:3000/api/v1/list/${user.dni}`,
          {
            covid: covid + 1,
          }
        );
        auth.setearEspera(res.data);
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/turns/${user.dni}`
        );
        const turnoFiltro = data
          .filter((turno) => turno.marca === "Covid")
          .filter((turno) => turno.dosis < covid)
          .filter((turno) => turno.presente === "activo");
        turnoFiltro.map(
          async (turno) =>
            await axios.delete(
              `http://localhost:3000/api/v1/turns/${turno._id}`
            )
        );

        swal({
          title: "Dosis ingresada con exito",
          icon: "success",
        });
      } else {
        null;
      }
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
                defaultValue={user.email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!dis}
              ></input>
              <button
                className="secondary-button login-button edit-button"
                onClick={handleToggle}
              >
                {!dis ? "Editar" : "OK"}
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
                disabled={Math.abs(espera.covid) > 1}
                onChange={() => {
                  setCovid(1);
                  setMod(true);
                }}
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
                disabled={Math.abs(espera.covid) > 2}
                onChange={() => {
                  setCovid(2);
                  setMod(true);
                }}
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
                disabled={Math.abs(espera.covid) > 3}
                onChange={() => {
                  setCovid(3);
                  setMod(true);
                }}
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
