import React from "react";
import "@styles/History.scss";
import { useState, useEffect } from "react";

import Cookies from "universal-cookie";

const History = () => {
  const cookie = new Cookies();
  const [turno, setTurno] = useState([]);
  const turnos = cookie.get("turno");

  const convertirFecha = (fecha) => {
    const dia = fecha.split("T")[0].split("-")[2];
    const mes = fecha.split("-")[1];
    const anio = fecha.split("-")[0];
    return `${dia}/${mes}/${anio}`;
  };

  useEffect(() => {
    setTurno(
      turnos
        .filter((turno) => turno.presente === "aplicada")
        .filter((turno) => turno.vacunatorio === 4)
    );
  }, []);

  return (
    <div className="history-container">
      <h1>Historial de vacunas aplicadas</h1>
      <table className="history-table-container">
        <thead>
          <th>Vacuna</th>
          <th></th>
          <th>Dosis</th>
          <th></th>
          <th>Fecha</th>
        </thead>
        {turno.map((turno) => (
          <tr>
            <td>{turno.marca}</td>
            <td></td>
            <td>{turno.dosis === 0 ? "-" : turno.dosis}</td>
            <td></td>
            <td>{convertirFecha(turno.fecha)}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default History;
