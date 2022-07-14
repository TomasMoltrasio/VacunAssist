import React from "react";
import "@styles/History.scss";
import { useState, useEffect } from "react";

import Cookies from "universal-cookie";

const History = () => {
  const cookie = new Cookies();
  const [turno, setTurno] = useState([]);
  const [history, setHistory] = useState([]);
  const turnos = cookie.get("turno");

  const convertirFecha = (fecha) => {
    const dia = fecha.split("T")[0].split("-")[2];
    const mes = fecha.split("-")[1];
    const anio = fecha.split("-")[0];
    return `${dia}/${mes}/${anio}`;
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

  useEffect(() => {
    setTurno(
      turnos
        .filter((turno) => turno.presente === "aplicada")
        .filter((turno) => turno.vacunatorio === 4)
    );
    setHistory(
      turnos
        .filter((turno) => turno.presente !== "activo")
        .filter((turno) => turno.vacunatorio !== 4)
    );
  }, []);

  return (
    <div className="history-container">
      <h1>Historial de vacunas aplicadas</h1>
      <div className="history-vacunatorio">
        <h3>Vacunatorios de VacunAssist</h3>
        <table className="history-table-container">
          <thead>
            <th>Vacuna</th>
            <th></th>
            <th>Dosis</th>
            <th></th>
            <th>Vacunatorio</th>
            <th></th>
            <th>Fecha</th>
          </thead>
          {history.map((turno) => (
            <tr>
              <td>{turno.marca}</td>
              <td></td>
              <td>{turno.dosis === 0 ? "-" : turno.dosis}</td>
              <td></td>
              <td>{elegirVacunatorio(turno.vacunatorio)}</td>
              <td></td>
              <td>{convertirFecha(turno.fecha)}</td>
            </tr>
          ))}
        </table>
      </div>
      <div className="history-other">
        <h3>Otros vacunatorios</h3>
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
    </div>
  );
};

export default History;
