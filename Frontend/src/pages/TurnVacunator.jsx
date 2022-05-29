import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import TurnToday from "@components/TurnToday";
import "@styles/TurnVacunator.scss";
import Cookies from "universal-cookie";

const TurnVacunator = () => {
  const cookie = new Cookies();
  const user = cookie.get("user");
  const auth = useAuth();
  const [turnos, setTurnos] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:3000/api/v1/turns/");
    const fecha = new Date().toISOString().slice(0, 10);

    const res = data
      .filter((t) => t.vacunatorio === user.vacunatorioTrabajo)
      .filter((t) => t.presente === "activo")
      .filter((t) => t.fecha.slice(0, 10) === fecha);
    res.map((turno) => setTurnos((old) => [...old, turno]));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="TurnVacunator">
      <div className="TurnVacunator-container">
        <h1>Turnos del dia</h1>
        {turnos.map((turno) => (
          <TurnToday turno={turno} key={`vacunador-${turno._id}`} />
        ))}
      </div>
    </div>
  );
};

export default TurnVacunator;
