import React from "react";
import { useState, useEffect } from "react";

const TableVacunatorio = ({ vacunatorio }) => {
  return (
    <div className="tableVacunatorio-container">
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Covid</th>
            <th>Gripe</th>
            <th>Fiebre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lunes</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Martes</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
          </tr>
          <tr>
            <td>Miercoles</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Jueves</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
          </tr>
          <tr>
            <td>Viernes</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Sabado</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
          </tr>
          <tr>
            <td>Domingo</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableVacunatorio;
