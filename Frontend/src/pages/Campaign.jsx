import React from "react";
import { useState, useEffect } from "react";
import "@styles/Checkout.scss";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import swal from "sweetalert";
import Cookies from "universal-cookie";
import jsPDF from "jspdf";
import logobn from "../assets/logos/LogoBN.png";

const Campaign = () => {
  const [covid, setCovid] = useState(false);
  const [gripe, setGripe] = useState(false);
  const [fiebre, setFiebre] = useState(false);
  const [disCovid, setDisCovid] = useState(false);
  const [disFiebre, setDisFiebre] = useState(false);
  const auth = useAuth();
  const cookie = new Cookies();
  const user = cookie.get("user");
  const espera = cookie.get("espera");
  const turnos = cookie.get("turno");

  const btnCovid = () => {
    !covid
      ? swal({
          title: "Inscripcion a campaña de vacunacion COVID",
          text: "¿Estas seguro de que deseas inscribirte?",
          icon: "info",
          buttons: ["NO", "SI"],
        }).then(async (r) => {
          if (r) {
            setCovid(!covid);
            const res = await axios.patch(
              `http://localhost:3000/api/v1/list/${user.dni}`,
              { covid: espera.covid * -1 }
            );
            auth.setearEspera(res.data);
            turnoAutomatico(user.dni);
            fetchData();
          }
        })
      : swal({
          title: "Baja a campaña de vacunacion COVID",
          text: "¿Estas seguro de que deseas bajarte de la campaña?",
          icon: "warning",
          buttons: ["NO", "SI"],
        }).then(async (r) => {
          if (r) {
            setCovid(!covid);
            const res = await axios.patch(
              `http://localhost:3000/api/v1/list/${user.dni}`,
              { covid: espera.covid * -1 }
            );
            const { data } = await axios.get(
              `http://localhost:3000/api/v1/turns/${user.dni}`
            );
            const turno = data.filter((t) => t.marca === "Covid");
            await axios.delete(
              `http://localhost:3000/api/v1/turns/${turno[0]._id}`
            );
            auth.setearEspera(res.data);
          }
        });

    fetchData();
  };

  const btnGripe = () => {
    !gripe
      ? swal({
          title: "Inscripcion a campaña de vacunacion Gripe",
          text: "¿Estas seguro de que deseas inscribirte?",
          icon: "info",
          buttons: ["NO", "SI"],
        }).then(async (r) => {
          if (r) {
            setGripe(!gripe);
            await axios.patch(`http://localhost:3000/api/v1/list/${user.dni}`, {
              gripe: true,
            });
            turnoAutomatico(user.dni);
            fetchData();
          }
        })
      : swal({
          title: "Baja a campaña de vacunacion Gripe",
          text: "¿Estas seguro de que deseas bajarte de la campaña?",
          icon: "warning",
          buttons: ["NO", "SI"],
        }).then(async (r) => {
          if (r) {
            setGripe(!gripe);
            await axios.patch(`http://localhost:3000/api/v1/list/${user.dni}`, {
              gripe: false,
            });
            const { data } = await axios.get(
              `http://localhost:3000/api/v1/turns/${user.dni}`
            );
            const turno = data.filter((t) => t.marca === "Gripe");
            await axios.delete(
              `http://localhost:3000/api/v1/turns/${turno[0]._id}`
            );
          }
        });

    fetchData();
  };

  const btnFiebre = () => {
    !fiebre
      ? swal({
          title: "Inscripcion a campaña de vacunacion Fiebre amarilla",
          text: "La vacuna de la fiebre amarilla es una sola vez en la vida, si ya te las has dado no te inscribas a la campaña ¿Estas seguro de que deseas inscribirte?",
          icon: "info",
          buttons: ["NO", "SI"],
        }).then(async (r) => {
          if (r) {
            setFiebre(!fiebre);
            await axios.patch(`http://localhost:3000/api/v1/list/${user.dni}`, {
              fiebre: true,
            });
            turnoAutomatico(user.dni);
            fetchData();
          }
        })
      : swal({
          title: "Baja a campaña de vacunacion Fiebre amarilla",
          text: "¿Estas seguro de que deseas bajarte de la campaña?",
          icon: "warning",
          buttons: ["NO", "SI"],
        }).then(async (r) => {
          if (r) {
            setFiebre(!fiebre);
            await axios.patch(`http://localhost:3000/api/v1/list/${user.dni}`, {
              fiebre: false,
            });
            const { data } = await axios.get(
              `http://localhost:3000/api/v1/turns/${user.dni}`
            );
            const turno = data.filter((t) => t.marca === "Fiebre");
            await axios.delete(
              `http://localhost:3000/api/v1/turns/${turno[0]._id}`
            );
          }
        });
    fetchData();
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

  const turnoAutomatico = async (dni) => {
    await axios.post("http://localhost:3000/api/v1/turns/", { dni: dni });
  };

  const fetchData = async () => {
    const options = {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios(
      `http://localhost:3000/api/v1/list/${user.dni}`,
      options
    );
    await auth.setearEspera(data);
    const dataTurn = await axios(
      `http://localhost:3000/api/v1/turns/${user.dni}`,
      options
    );
    await auth.setearTurno(dataTurn.data);
    disabledData(data, dataTurn.data);
  };

  const disabledData = async (data, dataTurn) => {
    data.covid <= 0 ? setCovid(false) : setCovid(true);
    data.gripe ? setGripe(true) : setGripe(false);
    data.fiebre ? setFiebre(true) : setFiebre(false);
    const res = dataTurn
      .filter((turn) => turn.marca === "Fiebre")
      .filter((turn2) => turn2.presente === "aplicada");
    if (data.edad > 60) {
      setDisFiebre(
        "La vacuna de la fiebre amarilla no se aplica a mayores de 60 años"
      );
      axios.patch(`http://localhost:3000/api/v1/list/${user.dni}`, {
        fiebre: false,
      });
    } else if (res.length !== 0) {
      if (res[0].vacunatorio <= 3) {
        setDisFiebre(true);
        axios.patch(`http://localhost:3000/api/v1/list/${user.dni}`, {
          fiebre: false,
        });
      } else {
        setDisFiebre(
          "La vacuna de la fiebre amarilla ya se aplico pero no en nuestros vacunatorios"
        );
        axios.patch(`http://localhost:3000/api/v1/list/${user.dni}`, {
          fiebre: false,
        });
      }
    }
    if (data.edad < 18) {
      setDisCovid(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="checkout">
      <div className="bg-2">
        <h1 className="t-stroke-shadow">CAMPAÑAS DE VACUNACION</h1>
      </div>
      <div className="checkout-items">
        <div className="card">
          <div className="card-content">
            <h2>COVID 19</h2>
            <button
              className="btn-inscripcion"
              onClick={btnCovid}
              disabled={disCovid}
            >
              {covid ? "Darme de baja" : "Inscribirme"}
            </button>
            {disCovid ? (
              <p>La vacuna del covid no se aplica a menores de 18 años</p>
            ) : null}
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2>Gripe A</h2>
            <button className="btn-inscripcion" onClick={btnGripe}>
              {gripe ? "Darme de baja" : "Inscribirme"}
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2 className="fiebre">Fiebre amarilla</h2>
            <button
              className="btn-inscripcion"
              onClick={btnFiebre}
              disabled={disFiebre}
            >
              {fiebre ? "Darme de baja" : "Inscribirme"}
            </button>
            {disFiebre !== false && disFiebre !== true ? (
              <p>{disFiebre}</p>
            ) : null}
            {disFiebre === true ? (
              <button className="btn-certificado" onClick={() => generatePDF()}>
                Generar certificado
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaign;
