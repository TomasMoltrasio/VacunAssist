import React from "react";
import "@styles/Turn.scss";

const TurnActive = () => {
  return (
    <div className="Turn-container">
      <table>
        <tr>
          <th>Dosis</th>
          <th>Fecha</th>
          <th>Cancelar</th>
        </tr>
        <tr>
          <th>Covid</th>
          <th>17/06</th>
          <th>
            <button className="cancelar">X</button>
          </th>
        </tr>
      </table>
    </div>
  );
};

export default TurnActive;
