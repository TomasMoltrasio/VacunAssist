import React from "react";
import "@styles/Turn.scss";

const TurnLast = () => {
  return (
    <div className="Turn-container">
      <table>
        <tr>
          <th>Dosis</th>
          <th>Fecha</th>
          <th>Presente</th>
        </tr>
        <tr>
          <th>Covid</th>
          <th>17/06</th>
          <th>
            <input type="checkbox" />
          </th>
        </tr>
      </table>
    </div>
  );
};

export default TurnLast;
