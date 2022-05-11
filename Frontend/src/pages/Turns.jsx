import React from "react";
import "@styles/Turns.scss";
import TurnActive from "@components/TurnActive";
import TurnLast from "@components/TurnLast";

const Turns = () => {
  return (
    <div className="Turns">
      <div className="Turns-container">
        <h1>Turnos en espera</h1>
        <TurnActive />
      </div>
      <div className="Turns-container">
        <h1>Turnos pasados</h1>
        <TurnLast />
      </div>
    </div>
  );
};

export default Turns;
