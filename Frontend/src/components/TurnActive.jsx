import React from "react";
import "@styles/Turn.scss";
import axios from "axios";
import swal from "sweetalert";
import { useAuth } from "../context/useAuth";
import Cookies from "universal-cookie";
import { ImCancelCircle } from "react-icons/im";
import { MdUpdate } from "react-icons/md";

const TurnActive = ({ turno }) => {
  const auth = useAuth();
  const cookie = new Cookies();
  const user = cookie.get("user");

  const elegirVacunatorio = () => {
    switch (turno.vacunatorio) {
      case 1:
        return "Hospital 9 de Julio";
      case 2:
        return "Corralón municipal";
      case 3:
        return "Polideportivo";
    }
  };

  const cancelarTurno = async () => {
    swal({
      title: "Eliminar turno",
      text: "¿Estas seguro de que deseas eliminar el turno?",
      icon: "warning",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        await axios.delete(`http://localhost:3000/api/v1/turns/${turno._id}`);
        const dataTurn = await axios(
          `http://localhost:3000/api/v1/turns/${user.dni}`
        );
        await auth.setearTurno(dataTurn.data);
        location.reload();
      }
    });
  };

  const posponerTurno = async () => {
    swal({
      title: "Posponer turno",
      text: "¿Estas seguro de que deseas posponer el turno?",
      icon: "warning",
      buttons: ["NO", "SI"],
    }).then(async (r) => {
      if (r) {
        await axios.patch(`http://localhost:3000/api/v1/turns/${turno._id}`, {
          fecha: 15,
        });
        const dataTurn = await axios(
          `http://localhost:3000/api/v1/turns/${user.dni}`
        );
        await auth.setearTurno(dataTurn.data);
        location.reload();
      }
    });
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
        <thead>
          <tr className="Turn-titulo">
            <th>Vacuna</th>
            <th></th>
            <th>Dosis</th>
            <th></th>
            <th>Fecha</th>
            <th></th>
            <th>Vacunatorio</th>
            <th></th>
            <th>Posponer</th>
            <th></th>
            <th>Cancelar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{turno.marca}</td>
            <td></td>
            <td>{turno.dosis === 0 ? "-" : turno.dosis}</td>
            <td></td>
            <td>{convertirFecha(turno.fecha)}</td>
            <td></td>
            <td>{elegirVacunatorio()}</td>
            <td></td>
            <td>
              <MdUpdate className="posponer" onClick={() => posponerTurno()} />
            </td>
            <td></td>
            <td>
              <ImCancelCircle
                className="cancelar"
                onClick={() => cancelarTurno()}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TurnActive;
