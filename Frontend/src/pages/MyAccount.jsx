import React from "react";
import { useState } from "react";
import "@styles/MyAccount.scss";
import { useAuth } from "../context/useAuth";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import Cookies from "universal-cookie";
import jsPDF from "jspdf";
import firma from "../assets/iconos/firma.png";
import logobn from "../assets/logos/LogoBN.png";

const MyAccount = () => {
  const cookie = new Cookies();
  const user = cookie.get("user");
  const espera = cookie.get("espera");
  const turnos = cookie.get("turno");

  const auth = useAuth();
  const [dis, setDis] = useState(false);
  const [email, setEmail] = useState(false);
  const [dosis, setDosis] = useState(espera.covid);
  const [gripe, setGripe] = useState(false);
  const [fiebre, setFiebre] = useState(false);
  const [mod, setMod] = useState(false);
  const [riesgo, setRiesgo] = useState(espera.riesgo);
  const [startdateCovid, setStartDateCovid] = useState(new Date());
  const [startdateGripe, setStartDateGripe] = useState(new Date());
  const [startdateFiebre, setStartDateFiebre] = useState(new Date());

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
    setDosis(espera.covid);
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

  const confirmarDatosGripe = async (e) => {
    e.preventDefault();
    swal({
      title: "Ingresar vacuna de gripe",
      text: "¿Estas seguro de que deseas ingresar la vacuna de gripe?",
      icon: "info",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        await axios.post(`http://localhost:3000/api/v1/turns/${user.dni}`, {
          marca: "Gripe",
          fecha: Date.parse(startdateGripe),
          presente: "aplicada",
        });
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/turns/${user.dni}`
        );
        const turnoFiltro = data
          .filter((turno) => turno.marca === "Gripe")
          .filter((turno) => turno.presente === "activo");
        turnoFiltro.map(
          async (turno) =>
            await axios.delete(
              `http://localhost:3000/api/v1/turns/${turno._id}`
            )
        );
        await axios.post("http://localhost:3000/api/v1/turns/", {
          dni: user.dni,
        });
        swal({
          title: "Dosis ingresada con exito",
          icon: "success",
        });
      }
    });
  };
  const confirmarDatosFiebre = async (e) => {
    e.preventDefault();
    swal({
      title: "Ingresar vacuna de fiebre",
      text: "¿Estas seguro de que deseas ingresar la vacuna de fiebre?",
      icon: "info",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        await axios.post(`http://localhost:3000/api/v1/turns/${user.dni}`, {
          marca: "Fiebre",
          fecha: Date.parse(startdateFiebre),
          presente: "aplicada",
        });
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/turns/${user.dni}`
        );
        const turnoFiltro = data
          .filter((turno) => turno.marca === "Fiebre")
          .filter((turno) => turno.presente === "activo");
        turnoFiltro.map(
          async (turno) =>
            await axios.delete(
              `http://localhost:3000/api/v1/turns/${turno._id}`
            )
        );
        await axios.post("http://localhost:3000/api/v1/turns/", {
          dni: user.dni,
        });
        swal({
          title: "Dosis ingresada con exito",
          icon: "success",
        });
      }
    });
  };

  const handleRiesgo = (e) => {
    e.preventDefault();
    swal({
      title: "Situacion de riesgo",
      text: "¿Estas seguro de que deseas modificar tu situacion de riesgo?",
      icon: "info",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        e.target.id === "noForm" ? setRiesgo(false) : setRiesgo(true);
        const res = await axios.patch(
          `http://localhost:3000/api/v1/users/${user.dni}`,
          {
            riesgo: riesgo,
          }
        );
        auth.login(res.data);
        const { data } = await axios.patch(
          `http://localhost:3000/api/v1/list/${user.dni}`,
          {
            riesgo: riesgo,
          }
        );
        auth.setearEspera(data);
        swal({
          title: "Datos actualizados",
          text: "Los datos han sido actualizados con exito",
          icon: "success",
        });
      }
    });
  };

  const confirmarDatosCovid = async (e) => {
    e.preventDefault();
    console.log(startdateCovid, dosis);
    swal({
      title: "Ingresar dosis",
      text: "¿Estas seguro de que deseas ingresar la dosis correspondiente?",
      icon: "info",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        await axios.post(`http://localhost:3000/api/v1/turns/${user.dni}`, {
          marca: "Covid",
          dosis: dosis,
          fecha: Date.parse(startdateCovid),
          presente: "aplicada",
        });
        const res = await axios.patch(
          `http://localhost:3000/api/v1/list/${user.dni}`,
          {
            covid: dosis + 1,
          }
        );
        auth.setearEspera(res.data);
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/turns/${user.dni}`
        );
        const turnoFiltro = data
          .filter((turno) => turno.marca === "Covid")
          .filter((turno) => turno.dosis <= dosis)
          .filter((turno) => turno.presente === "activo");
        turnoFiltro.map(
          async (turno) =>
            await axios.delete(
              `http://localhost:3000/api/v1/turns/${turno._id}`
            )
        );
        await axios.post("http://localhost:3000/api/v1/turns/", {
          dni: user.dni,
        });
        swal({
          title: "Dosis ingresada con exito",
          icon: "success",
        });
      }
    });
  };

  const elegirVacunatorio = (vacunatorio) => {
    switch (vacunatorio) {
      case 1:
        return "Hospital 9 de Julio";
      case 2:
        return "Corralón municipal";
      case 3:
        return "Polideportivo";
      case 4:
        return "Otro";
    }
  };

  const generatePDF = () => {
    const res = turnos
      .filter((turno) => turno.marca === "Fiebre")
      .filter((turno) => turno.presente === "aplicada")
      .filter((turno) => turno.vacunatorio <= 3);
    const doc = new jsPDF();
    const width = doc.internal.pageSize.getWidth();
    doc.setFillColor(255, 255, 0);
    doc.setDrawColor(0, 0, 0);
    doc.roundedRect(10, 10, 190, 110, 3, 3, "FD");
    doc.setFontSize(30);
    doc.setFillColor(255, 0, 0);
    doc.text(width / 2, 25, "Certificado Fiebre Amarilla", "center");
    doc.setFontSize(15);
    doc.text(
      width / 2,
      50,
      "Certificamos que " +
        user.nombre +
        " " +
        user.apellido +
        " con DNI " +
        user.dni,
      "center"
    );
    doc.text(
      width / 2,
      60,
      "se ha aplicado la vacuna " +
        res[0].fabricante +
        " contra la fiebre amarilla con lote " +
        res[0].lote,
      "center"
    );
    doc.text(
      width / 2,
      70,
      "el dia " +
        res[0].fecha.split("T")[0].split("-")[2] +
        "/" +
        res[0].fecha.split("-")[1] +
        "/" +
        res[0].fecha.split("-")[0] +
        " en el vacunatorio " +
        elegirVacunatorio(res[0].vacunatorio),
      "center"
    );
    doc.line(100, 110, 145, 110);
    doc.setFontSize(8);
    doc.text(width / 2, 115, `Dr. ${res[0].vacunador}`, "left");
    doc.addImage(logobn, "PNG", 40, 93, 40, 23);
    doc.setFont("courier", "bolditalic");
    doc.setFontSize(10);
    doc.text(width / 2, 105, `${res[0].vacunador}`, "left");
    doc.save("certificado.pdf");
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
          </div>
        </form>
        {turnos
          .filter((turno) => turno.marca === "Fiebre")
          .filter((turno) => turno.presente === "aplicada")
          .filter((turno) => turno.vacunatorio <= 3).length > 0 && (
          <button onClick={() => generatePDF()}>
            Descargar certificado fiebre amarilla
          </button>
        )}
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
            checked={riesgo === false}
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
            checked={riesgo === true}
          />
          <label className="labelDecision" htmlFor="siForm">
            Si
          </label>
        </form>
      </div>
      <div className="vacunas-container">
        <div className="card-myaccount">
          <div className="card-content-myaccount">
            <h1>Si ya te has vacunado ingresa la fecha</h1>
            <div className="container-fecha">
              <h4 className="titulo-container-fecha-account">Covid</h4>
              <div>
                <form className="formPersonalAccount">
                  <input
                    className="boxDecision"
                    type="radio"
                    name="decision"
                    defaultValue="1"
                    id="primera"
                    onChange={() => {
                      setDosis(1);
                      setMod(true);
                    }}
                    disabled={dosis > 1 || dosis < -1 || espera.edad < 18}
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
                    onChange={() => {
                      setDosis(2);
                      setMod(true);
                    }}
                    disabled={dosis > 2 || dosis < -2 || espera.edad < 18}
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
                    onChange={() => {
                      setDosis(3);
                      setMod(true);
                    }}
                    disabled={dosis > 3 || dosis < -3 || espera.edad < 18}
                  />
                  <label className="labelDecision" htmlFor="tercera">
                    3°
                  </label>
                </form>
                {mod ? (
                  <>
                    <input
                      type={"date"}
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setStartDateCovid(e.target.value)}
                    ></input>
                    <button onClick={(e) => confirmarDatosCovid(e)}>
                      Confirmar
                    </button>
                  </>
                ) : null}
              </div>
            </div>
            <div className="container-fecha">
              <h4 className="titulo-container-fecha-account">Gripe</h4>
              <form className="formPersonalAccount">
                <input
                  className="boxDecision"
                  type="radio"
                  name="decision"
                  defaultValue="No"
                  id="noGripe"
                  onChange={() => {
                    setGripe(false);
                  }}
                />
                <label className="labelDecision activo" htmlFor="noGripe">
                  No
                </label>
                <input
                  className="boxDecision"
                  type="radio"
                  name="decision"
                  defaultValue="Si"
                  id="siGripe"
                  onChange={() => {
                    setGripe(true);
                  }}
                />
                <label className="labelDecision" htmlFor="siGripe">
                  Si
                </label>
              </form>
              {gripe ? (
                <>
                  <input
                    type={"date"}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStartDateGripe(e.target.value)}
                  ></input>
                  <button onClick={(e) => confirmarDatosGripe(e)}>
                    Confirmar
                  </button>
                </>
              ) : null}
            </div>
            <div className="container-fecha">
              <h4 className="titulo-container-fecha-account">Fiebre</h4>
              <form className="formPersonalAccount">
                <input
                  className="boxDecision"
                  type="radio"
                  name="decision"
                  defaultValue="No"
                  id="noFiebre"
                  onChange={() => {
                    setFiebre(false);
                  }}
                  disabled={espera.edad > 60}
                />
                <label className="labelDecision activo" htmlFor="noFiebre">
                  No
                </label>
                <input
                  className="boxDecision"
                  type="radio"
                  name="decision"
                  defaultValue="Si"
                  id="siFiebre"
                  onChange={() => {
                    setFiebre(true);
                  }}
                  disabled={espera.edad > 60}
                />
                <label className="labelDecision" htmlFor="siFiebre">
                  Si
                </label>
              </form>
              {fiebre ? (
                <>
                  <input
                    type={"date"}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStartDateFiebre(e.target.value)}
                  ></input>
                  <button onClick={(e) => confirmarDatosFiebre(e)}>
                    Confirmar
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
