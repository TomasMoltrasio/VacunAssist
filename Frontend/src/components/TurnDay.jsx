import React from "react";
import { useState, useEffect } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import axios from "axios";
import TurnPerVacunatorio from "./TurnPerVacunatorio";
import "@styles/TurnPerVacunatorio.scss";

const TurnDay = () => {
  const [fecha, setFecha] = useState(new Date());
  const [vacunatorio, setVacunatorio] = useState([]);

  useEffect(() => {
    setFecha(new Date());
  }, []);

  const getStock = async () => {
    const turnos = await axios.post(
      "http://localhost:3000/api/v1/turns/stock/",
      {
        fecha: fecha,
      }
    );
    setVacunatorio(turnos.data);
  };

  useEffect(() => {
    getStock();
  }, [fecha]);

  return (
    <div className="turnDay-container">
      <h2>Turnos por dia</h2>
      <div className="turnDay-date">
        <label htmlFor="fecha">Seleccionar dia</label>
        <input
          type={"date"}
          id={"fecha"}
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <TurnPerVacunatorio
        vacunatorio={vacunatorio[0]}
        num={1}
        title={"Stock"}
      />
      <TurnPerVacunatorio
        vacunatorio={vacunatorio[1]}
        num={2}
        title={"Stock"}
      />
      <TurnPerVacunatorio
        vacunatorio={vacunatorio[2]}
        num={3}
        title={"Stock"}
      />
    </div>
  );
};

export default TurnDay;
