import React from "react";
import "@styles/Turns.scss";
import TurnActive from "@components/TurnActive";
import TurnLast from "@components/TurnLast";
import { useAuth } from "../context/useAuth";

const Turns = () => {
  const auth = useAuth();
  const turnoActivo = auth.turn.filter((turn) => turn.presente === "activo");
  const turnoPasado = auth.turn.filter((turn) => turn.presente !== "activo");

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
