import React from "react";
import "@styles/Turns.scss";
import TurnActive from "@components/TurnActive";
import TurnLast from "@components/TurnLast";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import axios from "axios";

const Turns = () => {
  const cookie = new Cookies();
  const user = cookie.get("user");
  const auth = useAuth();
  const [turnoActivo, setTurnoActivo] = useState([]);
  const [turnoPasado, setTurnoPasado] = useState([]);

  const getTurn = async () => {
    let { data } = await axios.get(
      `http://localhost:3000/api/v1/turns/${user.dni}`
    );
    auth.setearTurno(data);
    setTurnoActivo(data.filter((turno) => turno.presente === "activo"));
    setTurnoPasado(
      data
        .filter((turno) => turno.presente !== "activo")
        .filter((turno) => turno.vacunatorio < 4)
    );
  };

  useEffect(() => {
    getTurn();
  }, []);

  return (
    <div className="Turns">
      <div className="Turns-container">
        <h1>Turnos en curso</h1>
        {turnoActivo.map((turno) => (
          <TurnActive turno={turno} key={turno._id} />
        ))}
      </div>
      <div className="Turns-container">
        <h1>Turnos pasados</h1>
        {turnoPasado.map((turno) => (
          <TurnLast turno={turno} key={turno._id} />
        ))}
      </div>
    </div>
  );
};

export default Turns;
