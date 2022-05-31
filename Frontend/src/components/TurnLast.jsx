import React from "react";
import "@styles/Turn.scss";
import { BsCheck2Circle, BsCalendarXFill } from "react-icons/bs";

const TurnLast = ({ turno }) => {
  const elegirVacunatorio = () => {
    switch (turno.vacunatorio) {
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
  return (
    <div className="Turn-container">
      <table className="table-container">
        <tr className="Turn-titulo">
          <th>Marca</th>
          <th></th>
          <th>Dosis</th>
          <th></th>
          <th>Fecha</th>
          <th></th>
          <th>Vacunatorio</th>
          <th></th>
          <th>Aplicada</th>
        </tr>
        <tr>
          <th>{turno.marca}</th>
          <th></th>
          <th>{turno.dosis === 0 ? "-" : turno.dosis}</th>
          <th></th>
          <th>{turno.fecha.slice(0, -14)}</th>
          <th></th>
          <th>{elegirVacunatorio()}</th>
          <th></th>
          <th>
            {turno.presente === "aplicada" ? (
              <BsCheck2Circle className="aplicada" />
            ) : (
              <BsCalendarXFill className="falto" />
            )}
          </th>
        </tr>
      </table>
    </div>
  );
};

export default TurnLast;
