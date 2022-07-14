import React from "react";
import { useState, useEffect } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import axios from "axios";
import TableVacunatorio from "./TableVacunatorio";
import "@styles/AveragePerDay.scss";

const AveragePerDay = () => {
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());
  const [contInicio, setContInicio] = useState(0);
  const [contFin, setContFin] = useState(0);
  const [vacunatorio, setVacunatorio] = useState([]);

  useEffect(() => {
    const fecha1 = new Date();
    const fecha2 = new Date();
    if (fechaInicio.getDay() !== 1) {
      fecha1.setDate(fechaInicio.getDate() - fechaInicio.getDay() + 1);
      setFechaInicio(fecha1);
    }
    fecha2.setDate(fecha1.getDate() + 7);
    setFechaFin(fecha2);
  }, []);

  const nextWeekStarted = (e) => {
    e.preventDefault();
    let semana = new Date(fechaFin);
    semana.setDate(semana.getDate() + 7);

    setContInicio(contInicio - 1);
    if (fechaInicio.getDay !== 1) {
      setFechaInicio(
        new Date(
          fechaInicio.setDate(fechaInicio.getDate() - fechaInicio.getDay() + 1)
        )
      );
    }
    setFechaInicio(new Date(fechaInicio.setDate(fechaInicio.getDate() + 7)));
    if (fechaInicio.getTime() === fechaFin.getTime()) {
      let semana = new Date(fechaFin);
      semana.setDate(semana.getDate() + 7);
      setFechaFin(semana);
      setContFin(contFin - 1);
    }
  };

  const prevWeekStarted = (e) => {
    e.preventDefault();
    setContInicio(contInicio + 1);
    if (fechaInicio.getDay !== 1) {
      setFechaInicio(
        new Date(
          fechaInicio.setDate(fechaInicio.getDate() - fechaInicio.getDay() + 1)
        )
      );
    }
    setFechaInicio(new Date(fechaInicio.setDate(fechaInicio.getDate() - 7)));
  };

  const prevWeekFinished = (e) => {
    e.preventDefault();
    let semana = new Date(fechaInicio);
    semana.setDate(semana.getDate() + 7);
    if (semana.getTime() < fechaFin.getTime()) {
      setContFin(contFin + 1);
      if (fechaFin.getDay !== 1) {
        setFechaFin(
          new Date(fechaFin.setDate(fechaFin.getDate() - fechaFin.getDay() + 1))
        );
      }
      setFechaFin(new Date(fechaFin.setDate(fechaFin.getDate() - 7)));
    }
  };

  const nextWeekFinished = (e) => {
    e.preventDefault();
    setContFin(contFin - 1);
    if (fechaFin.getDay !== 1) {
      setFechaFin(
        new Date(fechaFin.setDate(fechaFin.getDate() - fechaFin.getDay() + 1))
      );
    }
    setFechaFin(new Date(fechaFin.setDate(fechaFin.getDate() + 7)));
  };

  const getStock = async () => {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/turns/average`,
      {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      }
    );
    setVacunatorio(data);
  };

  return (
    <div className="averagePerDay-container">
      <div className="averageBusqueda-container">
        <label>Fecha inicio</label>
        <div>
          <button onClick={(e) => prevWeekStarted(e)}>
            <IoIosArrowDropleftCircle />
          </button>
          <input type="text" value={fechaInicio.toLocaleDateString()}></input>
          <button
            disabled={contInicio === 0}
            onClick={(e) => nextWeekStarted(e)}
          >
            <IoIosArrowDroprightCircle />
          </button>
        </div>
        <label>Fecha fin</label>
        <div>
          <button onClick={(e) => prevWeekFinished(e)}>
            <IoIosArrowDropleftCircle />
          </button>
          <input type="text" value={fechaFin.toLocaleDateString()}></input>
          <button disabled={contFin === 0} onClick={(e) => nextWeekFinished(e)}>
            <IoIosArrowDroprightCircle />
          </button>
        </div>
        <button onClick={getStock}>Buscar</button>
      </div>
      {vacunatorio.length > 0 ? (
        <div className="tablas-container">
          <TableVacunatorio vacunatorio={vacunatorio[0]} num={1} />
          <TableVacunatorio vacunatorio={vacunatorio[1]} num={2} />
          <TableVacunatorio vacunatorio={vacunatorio[2]} num={3} />
        </div>
      ) : null}
    </div>
  );
};

export default AveragePerDay;
