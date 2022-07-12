import React from "react";
import "@styles/TurnPerVacunatorio.scss";

const TurnPerVacunatorio = ({ vacunatorio, num, title }) => {
  const elegirVacunatorio = (num) => {
    switch (num) {
      case 1:
        return "Hospital 9 de Julio";
      case 2:
        return "Corralón municipal";
      case 3:
        return "Polideportivo";
    }
  };

  return (
    <div className="turnPerVacunatorio-container">
      <h3>{elegirVacunatorio(num)}</h3>
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>{title}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Covid</td>
            <td>{vacunatorio !== undefined ? vacunatorio.covid : null}</td>
          </tr>
          <tr>
            <td>Gripe</td>
            <td>{vacunatorio !== undefined ? vacunatorio.gripe : null}</td>
          </tr>
          <tr>
            <td>Fiebre</td>
            <td>{vacunatorio !== undefined ? vacunatorio.fiebre : null}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TurnPerVacunatorio;
