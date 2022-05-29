import React from "react";
import { useState, useEffect } from "react";
import "@styles/Checkout.scss";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import swal from "sweetalert";
import Cookies from "universal-cookie";

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
          }
        });
    fetchData();
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
    data.covid < 0 ? setCovid(false) : setCovid(true);
    data.gripe ? setGripe(true) : setGripe(false);
    data.fiebre ? setFiebre(true) : setFiebre(false);
    const res = dataTurn
      .filter((turn) => turn.marca === "Fiebre")
      .filter((turn2) => turn2.presente === "aplicada");
    if (data.edad > 60 || res.length !== 0) {
      setDisFiebre(true);
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
      <div className="checkout-items">
        <div className="card">
          <div className="card-content">
            <h1>Campaña de vacunacion COVID 19</h1>
            <button
              className="btn-inscripcion"
              onClick={btnCovid}
              disabled={disCovid}
            >
              {covid ? "Darme de baja" : "Inscribirme"}
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h1>Campaña de vacunacion Gripe A</h1>
            <button className="btn-inscripcion" onClick={btnGripe}>
              {gripe ? "Darme de baja" : "Inscribirme"}
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h1>Campaña de vacunacion Fiebre amarilla</h1>
            <button
              className="btn-inscripcion"
              onClick={btnFiebre}
              disabled={disFiebre}
            >
              {fiebre ? "Darme de baja" : "Inscribirme"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaign;
