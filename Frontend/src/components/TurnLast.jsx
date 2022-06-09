import React from "react";
import "@styles/Turn.scss";
import { BsCheck2Circle } from "react-icons/bs";
import { TiCancel } from "react-icons/ti";

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

  const convertirFecha = (fecha) => {
    const dia = fecha.split("T")[0].split("-")[2];
    const mes = fecha.split("-")[1];
    const anio = fecha.split("-")[0];
    return `${dia}/${mes}/${anio}`;
  };

  return (
    <div className="Turn-container">
      <table className="table-container">
        <tr className="Turn-titulo">
          <th>Vacuna</th>
          <th></th>
          <th>Marca</th>
          <th></th>
          <th>Dosis</th>
          <th></th>
          <th>Fecha</th>
          <th></th>
          <th>Vacunatorio</th>
          <th></th>
          <th>Estado</th>
        </tr>
        <tr>
          <th>{turno.marca}</th>
          <th></th>
          <th>{turno.fabricante}</th>
          <th></th>
          <th>{turno.dosis === 0 ? "-" : turno.dosis}</th>
          <th></th>
          <th>{convertirFecha(turno.fecha)}</th>
          <th></th>
          <th>{elegirVacunatorio()}</th>
          <th></th>
          <th>
            {turno.presente === "aplicada" ? (
              <BsCheck2Circle className="aplicada" />
            ) : (
              <TiCancel className="falto" />
            )}
          </th>
        </tr>
      </table>
    </div>
  );
};

export default TurnLast;
