import React from "react";
import "@styles/StockVacunatorio.scss";
import swal from "sweetalert";
import axios from "axios";
import { CgAddR } from "react-icons/cg";
import { useState } from "react";

const StockVacunatorio = ({ vacunatorio }) => {
  const sumarStock = async (e) => {
    swal({
      title: "Sumar stock",
      text: "Ingrese la cantidad a sumar",
      content: "input",
      buttons: ["Cancelar", "Sumar"],
      dangerMode: true,
    }).then(async (cantidad) => {
      if (cantidad > 0) {
        console.log(e.target.id);
        await axios.patch(
          `http://localhost:3000/api/v1/vacunatorios/${vacunatorio.numero}`,
          {
            stockCovid: e.target.id === "covid" ? Number(cantidad) : 0,
            stockFiebre: e.target.id === "fiebre" ? Number(cantidad) : 0,
            stockGripe: e.target.id === "gripe" ? Number(cantidad) : 0,
          }
        );
        swal("Stock actualizado", "", "success");
      } else if (cantidad === "") {
        swal("Error", "Debe ingresar una cantidad", "error");
      } else if (cantidad < 0) {
        swal("Error", "Debe ingresar una cantidad positiva", "error");
      } else if (typeof cantidad !== "number" && cantidad !== null) {
        swal("Error", "Debe ingresar una cantidad numerica", "error");
      }
    });
  };

  return (
    <div className="StockVacunatorio">
      <div className="StockVacunatorio-container">
        <h1 className="titulo-stock">{vacunatorio.nombre}</h1>
        <table className="tabla-stock">
          <thead>
            <th>Vacuna</th>
            <th></th>
            <th>Stock</th>
            <th></th>
            <th>Agregar</th>
          </thead>
          <tbody>
            <tr>
              <td>Covid</td>
              <td />
              <td>{vacunatorio.stockCovid}</td>
              <td />
              <td>
                <button
                  id="covid"
                  onClick={(e) => {
                    sumarStock(e);
                  }}
                >
                  +
                </button>
              </td>
            </tr>
            <tr>
              <td>Gripe</td>
              <td />
              <td>{vacunatorio.stockGripe}</td>
              <td />
              <td>
                <button
                  id="gripe"
                  onClick={(e) => {
                    sumarStock(e);
                  }}
                >
                  +
                </button>
              </td>
            </tr>
            <tr>
              <td>Fiebre</td>
              <td />
              <td>{vacunatorio.stockFiebre}</td>
              <td />
              <td>
                <button
                  id="fiebre"
                  onClick={(e) => {
                    sumarStock(e);
                  }}
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockVacunatorio;
