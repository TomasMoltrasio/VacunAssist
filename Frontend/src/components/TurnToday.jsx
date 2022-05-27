import React from "react";
import "@styles/Turn.scss";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

const TurnToday = ({ turno }) => {
  const [lote, setLote] = useState(null);

  const confirmarPresente = async (e) => {
    if (lote === null) {
      swal({
        title: "Error",
        text: "Debe ingresar el numero de lote",
        icon: "error",
      });
    } else {
      swal({
        title: "Marcar como presente",
        text: "¿Confirmas la presencia del ciudadano?",
        icon: "info",
        buttons: ["NO", "SI"],
      }).then(async (r) => {
        if (r) {
          e.preventDefault();
          await axios.patch(`http://localhost:3000/api/v1/turns/${turno._id}`, {
            lote: lote,
            presente: "aplicada",
          });
          if (turno.dosis > 0) {
            await axios.patch(
              `http://localhost:3000/api/v1/list/${turno.dni}`,
              {
                covid: turno.dosis + 1,
              }
            );
          }
          await axios.post("http://localhost:3000/api/v1/turns/", {
            dni: turno.dni,
          });
          swal({
            title: "Turno marcado con exito",
            icon: "success",
          });
        }
      });
    }
  };

  return (
    <div className="Turn-container">
      <table className="table-container">
        <tr className="Turn-titulo">
          <th>DNI</th>
          <th>Marca</th>
          <th>Dosis</th>
          <th>Lote</th>
          <th>Aplicar</th>
        </tr>
        <tr>
          <th>{turno.dni}</th>
          <th>{turno.marca}</th>
          <th>{turno.dosis === 0 ? "-" : turno.dosis}</th>
          <th>
            <input type="text" onChange={(e) => setLote(e.target.value)} />
          </th>
          <th>
            <button onClick={(e) => confirmarPresente(e)}>✓</button>
          </th>
        </tr>
      </table>
    </div>
  );
};

export default TurnToday;
