import React from "react";
import { useState, useEffect } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import axios from "axios";
import TableVacunatorio from "./TableVacunatorio";

const AveragePerDay = () => {
  const [fecha, setFecha] = useState(new Date());
  const [cont, setCont] = useState(0);
  const [vacunatorio, setVacunatorio] = useState({});

  const nextWeek = (e) => {
    e.preventDefault();
    setCont(cont + 1);
    if (fecha.getDay !== 1) {
      setFecha(new Date(fecha.setDate(fecha.getDate() - fecha.getDay() + 1)));
    }
    setFecha(new Date(fecha.setDate(fecha.getDate() + 7)));
  };

  const prevWeek = (e) => {
    e.preventDefault();
    setCont(cont - 1);
    if (fecha.getDay !== 1) {
      setFecha(new Date(fecha.setDate(fecha.getDate() - fecha.getDay() + 1)));
    }
    setFecha(new Date(fecha.setDate(fecha.getDate() - 7)));
  };

  const getStock = async () => {
    const { data } = await axios.post(
      `http://localhost:3000/api/v1/turns/stock`,
      {
        fecha: fecha,
      }
    );
    setVacunatorio(data.stock);
  };

  useEffect(() => {
    getStock();
  }, [fecha]);

  return (
    <div className="averagePerDay-container">
      <button disabled={cont === 0} onClick={(e) => prevWeek(e)}>
        <IoIosArrowDropleftCircle />
      </button>
      <input type="text" value={fecha.toLocaleDateString()}></input>
      <button onClick={(e) => nextWeek(e)}>
        <IoIosArrowDroprightCircle />
      </button>
      <button onClick={getStock}>X</button>
      <h3>Vacunatorio 1</h3>
      <TableVacunatorio vacunatorio={vacunatorio} />
      <h3>Vacunatorio 2</h3>
      <TableVacunatorio vacunatorio={vacunatorio} />
      <h3>Vacunatorio 3</h3>
      <TableVacunatorio vacunatorio={vacunatorio} />
    </div>
  );
};

export default AveragePerDay;
