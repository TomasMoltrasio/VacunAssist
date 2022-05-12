import React from "react";
import "@styles/Turn.scss";

const TurnActive = () => {
  return (
    <div className="Turn-container">
      <table className="table-container">
        <tr className="Turn-titulo">
          <th>Dosis</th>
          <th>Fecha</th>
          <th>Posponer</th>
          <th>Cancelar</th>
        </tr>
        <tr>
          <th>Covid</th>
          <th>17/06</th>
          <th>
            <button className="posponer">◷</button>
          </th>
          <th>
            <button className="cancelar">X</button>
          </th>
        </tr>
      </table>
    </div>
  );
};

export default TurnActive;
