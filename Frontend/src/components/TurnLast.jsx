import React from "react";
import "@styles/Turn.scss";

const TurnLast = () => {
  return (
    <div className="Turn-container">
      <table className="table-container">
        <tr className="Turn-titulo">
          <th>Dosis</th>
          <th>Fecha</th>
          <th>Aplicada</th>
        </tr>
        <tr>
          <th>Covid</th>
          <th>17/06</th>
          <th>✓</th>
        </tr>
      </table>
    </div>
  );
};

export default TurnLast;
