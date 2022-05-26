import React from "react";
import "@styles/Turn.scss";

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
          <th>Dosis</th>
          <th>Fecha</th>
          <th>Vacunatorio</th>
          <th>Aplicada</th>
        </tr>
        <tr>
          <th>{turno.marca}</th>
          <th>{turno.dosis === 0 ? "-" : turno.dosis}</th>
          <th>{turno.fecha.slice(0, -14)}</th>
          <th>{elegirVacunatorio()}</th>
          <th>{turno.presente === "aplicada" ? "✓" : "✕"}</th>
        </tr>
      </table>
    </div>
  );
};

export default TurnLast;
