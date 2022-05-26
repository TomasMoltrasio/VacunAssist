import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@styles/Turn.scss";
import axios from "axios";
import swal from "sweetalert";

const TurnActive = ({ turno }) => {
  const navigate = useNavigate();
  const elegirVacunatorio = () => {
    switch (turno.vacunatorio) {
      case 1:
        return "Hospital 9 de Julio";
      case 2:
        return "Corralón municipal";
      case 3:
        return "Polideportivo";
    }
  };

  const cancelarTurno = async () => {
    swal({
      title: "Eliminar turno",
      text: "¿Estas seguro de que deseas eliminar el turno?",
      icon: "warning",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        await axios.delete(`http://localhost:3000/api/v1/turns/${turno._id}`);
      }
    });
  };

  const posponerTurno = async () => {
    swal({
      title: "Posponer turno",
      text: "¿Estas seguro de que deseas posponer el turno?",
      icon: "warning",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        await axios.patch(`http://localhost:3000/api/v1/turns/${turno._id}`, {
          fecha: 15,
        });
      }
    });
  };

  return (
    <div className="Turn-container">
      <table className="table-container">
        <tr className="Turn-titulo">
          <th>Marca</th>
          <th>Dosis</th>
          <th>Fecha</th>
          <th>Vacunatorio</th>
          <th>Posponer</th>
          <th>Cancelar</th>
        </tr>
        <tr>
          <th>{turno.marca}</th>
          <th>{turno.dosis === 0 ? "-" : turno.dosis}</th>
          <th>{turno.fecha.slice(0, -14)}</th>
          <th>{elegirVacunatorio()}</th>
          <th>
            <button className="posponer" onClick={() => posponerTurno()}>
              ◷
            </button>
          </th>
          <th>
            <button className="cancelar" onClick={() => cancelarTurno()}>
              X
            </button>
          </th>
        </tr>
      </table>
    </div>
  );
};

export default TurnActive;
