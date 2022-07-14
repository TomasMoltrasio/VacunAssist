import React from "react";
import { useState, useEffect } from "react";
import "@styles/AveragePerDay.scss";

const TableVacunatorio = ({ vacunatorio, num }) => {
  useEffect(() => {
    console.log(vacunatorio);
  }, []);

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
    <div className="tableVacunatorio-container">
      <h3>{elegirVacunatorio(num)}</h3>
      <table>
        <thead>
          <tr>
            <th>Dia</th>
            <th>Covid</th>
            <th>Gripe</th>
            <th>Fiebre</th>
            <th>Ausentes covid</th>
            <th>Ausentes gripe</th>
            <th>Ausentes fiebre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Lunes</td>
            <td>
              {vacunatorio.lunes.vacunas.covid !== undefined
                ? vacunatorio.lunes.vacunas.covid
                : null}
            </td>
            <td>
              {vacunatorio.lunes.vacunas.gripe !== undefined
                ? vacunatorio.lunes.vacunas.gripe
                : null}
            </td>
            <td>
              {vacunatorio.lunes.vacunas.fiebre !== undefined
                ? vacunatorio.lunes.vacunas.fiebre
                : null}
            </td>
            <td>
              {vacunatorio.lunes.ausentes.covid !== undefined
                ? vacunatorio.lunes.ausentes.covid
                : null}
            </td>
            <td>
              {vacunatorio.lunes.ausentes.gripe !== undefined
                ? vacunatorio.lunes.ausentes.gripe
                : null}
            </td>
            <td>
              {vacunatorio.lunes.ausentes.fiebre !== undefined
                ? vacunatorio.lunes.ausentes.fiebre
                : null}
            </td>
          </tr>
          <tr>
            <td>Martes</td>
            <td>
              {vacunatorio.martes.vacunas.covid !== undefined
                ? vacunatorio.martes.vacunas.covid
                : null}
            </td>
            <td>
              {vacunatorio.martes.vacunas.gripe !== undefined
                ? vacunatorio.martes.vacunas.gripe
                : null}
            </td>
            <td>
              {vacunatorio.martes.vacunas.fiebre !== undefined
                ? vacunatorio.martes.vacunas.fiebre
                : null}
            </td>
            <td>
              {vacunatorio.martes.ausentes.covid !== undefined
                ? vacunatorio.martes.ausentes.covid
                : null}
            </td>
            <td>
              {vacunatorio.martes.ausentes.gripe !== undefined
                ? vacunatorio.martes.ausentes.gripe
                : null}
            </td>
            <td>
              {vacunatorio.martes.ausentes.fiebre !== undefined
                ? vacunatorio.martes.ausentes.fiebre
                : null}
            </td>
          </tr>
          <tr>
            <td>Miercoles</td>
            <td>
              {vacunatorio.miercoles.vacunas.covid !== undefined
                ? vacunatorio.miercoles.vacunas.covid
                : null}
            </td>
            <td>
              {vacunatorio.miercoles.vacunas.gripe !== undefined
                ? vacunatorio.miercoles.vacunas.gripe
                : null}
            </td>
            <td>
              {vacunatorio.miercoles.vacunas.fiebre !== undefined
                ? vacunatorio.miercoles.vacunas.fiebre
                : null}
            </td>
            <td>
              {vacunatorio.miercoles.ausentes.covid !== undefined
                ? vacunatorio.miercoles.ausentes.covid
                : null}
            </td>
            <td>
              {vacunatorio.miercoles.ausentes.gripe !== undefined
                ? vacunatorio.miercoles.ausentes.gripe
                : null}
            </td>
            <td>
              {vacunatorio.miercoles.ausentes.fiebre !== undefined
                ? vacunatorio.miercoles.ausentes.fiebre
                : null}
            </td>
          </tr>
          <tr>
            <td>Jueves</td>
            <td>
              {vacunatorio.jueves.vacunas.covid !== undefined
                ? vacunatorio.jueves.vacunas.covid
                : null}
            </td>
            <td>
              {vacunatorio.jueves.vacunas.gripe !== undefined
                ? vacunatorio.jueves.vacunas.gripe
                : null}
            </td>
            <td>
              {vacunatorio.jueves.vacunas.fiebre !== undefined
                ? vacunatorio.jueves.vacunas.fiebre
                : null}
            </td>
            <td>
              {vacunatorio.jueves.ausentes.covid !== undefined
                ? vacunatorio.jueves.ausentes.covid
                : null}
            </td>
            <td>
              {vacunatorio.jueves.ausentes.gripe !== undefined
                ? vacunatorio.jueves.ausentes.gripe
                : null}
            </td>
            <td>
              {vacunatorio.jueves.ausentes.fiebre !== undefined
                ? vacunatorio.jueves.ausentes.fiebre
                : null}
            </td>
          </tr>
          <tr>
            <td>Viernes</td>
            <td>
              {vacunatorio.viernes.vacunas.covid !== undefined
                ? vacunatorio.viernes.vacunas.covid
                : null}
            </td>
            <td>
              {vacunatorio.viernes.vacunas.gripe !== undefined
                ? vacunatorio.viernes.vacunas.gripe
                : null}
            </td>
            <td>
              {vacunatorio.viernes.vacunas.fiebre !== undefined
                ? vacunatorio.viernes.vacunas.fiebre
                : null}
            </td>
            <td>
              {vacunatorio.viernes.ausentes.covid !== undefined
                ? vacunatorio.viernes.ausentes.covid
                : null}
            </td>
            <td>
              {vacunatorio.viernes.ausentes.gripe !== undefined
                ? vacunatorio.viernes.ausentes.gripe
                : null}
            </td>
            <td>
              {vacunatorio.viernes.ausentes.fiebre !== undefined
                ? vacunatorio.viernes.ausentes.fiebre
                : null}
            </td>
          </tr>
          <tr>
            <td>Sabado</td>
            <td>
              {vacunatorio.sabado.vacunas.covid !== undefined
                ? vacunatorio.sabado.vacunas.covid
                : null}
            </td>
            <td>
              {vacunatorio.sabado.vacunas.gripe !== undefined
                ? vacunatorio.sabado.vacunas.gripe
                : null}
            </td>
            <td>
              {vacunatorio.sabado.vacunas.fiebre !== undefined
                ? vacunatorio.sabado.vacunas.fiebre
                : null}
            </td>
            <td>
              {vacunatorio.sabado.ausentes.covid !== undefined
                ? vacunatorio.sabado.ausentes.covid
                : null}
            </td>
            <td>
              {vacunatorio.sabado.ausentes.gripe !== undefined
                ? vacunatorio.sabado.ausentes.gripe
                : null}
            </td>
            <td>
              {vacunatorio.sabado.ausentes.fiebre !== undefined
                ? vacunatorio.sabado.ausentes.fiebre
                : null}
            </td>
          </tr>
          <tr>
            <td>Domingo</td>
            <td>
              {vacunatorio.domingo.vacunas.covid !== undefined
                ? vacunatorio.domingo.vacunas.covid
                : null}
            </td>
            <td>
              {vacunatorio.domingo.vacunas.gripe !== undefined
                ? vacunatorio.domingo.vacunas.gripe
                : null}
            </td>
            <td>
              {vacunatorio.domingo.vacunas.fiebre !== undefined
                ? vacunatorio.domingo.vacunas.fiebre
                : null}
            </td>
            <td>
              {vacunatorio.domingo.ausentes.covid !== undefined
                ? vacunatorio.domingo.ausentes.covid
                : null}
            </td>
            <td>
              {vacunatorio.domingo.ausentes.gripe !== undefined
                ? vacunatorio.domingo.ausentes.gripe
                : null}
            </td>
            <td>
              {vacunatorio.domingo.ausentes.fiebre !== undefined
                ? vacunatorio.domingo.ausentes.fiebre
                : null}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableVacunatorio;
