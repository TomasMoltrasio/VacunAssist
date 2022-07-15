import React from "react";
import "@styles/AssignShift.scss";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";

const AssignShift = () => {
  const [vacuna, setVacuna] = useState(null);
  const [vacunatorio, setVacunatorio] = useState(null);
  const [fecha, setFecha] = useState(new Date());
  const [fechaTurno, setFechaTurno] = useState(new Date());
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    let semana = new Date();
    semana.setDate(semana.getDate() + 14);
    setFecha(semana);
  }, []);

  const confirmarDatos = (e) => {
    e.preventDefault();
    if (
      vacuna !== null &&
      vacunatorio !== null &&
      fechaTurno !== null &&
      cantidad !== 0
    ) {
      swal({
        title: "Asigar turnos",
        text: "¿Está seguro de asignar los turnos?",
        icon: "warning",
        buttons: ["Cancelar", "Aceptar"],
      }).then(async (r) => {
        if (r) {
          await axios.post("http://localhost:3000/api/v1/turns/assign/", {
            vacuna,
            vacunatorio,
            fechaTurno,
            cantidad,
          });
          swal("Turnos asignados", "", "success").then(() => {
            window.location.reload();
          });
        }
      });
    } else {
      swal("Error", "Faltan datos", "error");
    }
  };

  return (
    <div className="AssignShift-container">
      <h1>Asignar turnos</h1>
      <div className="AssignShift-content">
        <label>Vacuna</label>
        <select onChange={(e) => setVacuna(e.target.value)}>
          <option value=" ">Seleccione una vacuna</option>
          <option value="covid">Covid</option>
          <option value="gripe">Gripe</option>
          <option value="fiebre">Fiebre</option>
        </select>
        <label>Vacunatorio</label>
        <select onChange={(e) => setVacunatorio(e.target.value)}>
          <option value=" ">Seleccione un vacunatorio</option>
          <option value="1">Hospital 9 de Julio</option>
          <option value="2">Corralon Municipal</option>
          <option value="3">Polideportivo</option>
        </select>
        <label>Fecha</label>
        <input
          type="date"
          min={fecha.toISOString().split("T")[0]}
          onChange={(e) => setFechaTurno(e.target.value)}
        />
        <label>Cantidad</label>
        <input
          type="number"
          min={1}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button onClick={(e) => confirmarDatos(e)}>Asignar</button>
      </div>
    </div>
  );
};

export default AssignShift;
