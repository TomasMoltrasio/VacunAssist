import React from "react";
import { useState } from "react";
import "@styles/Checkout.scss";

const Campaign = () => {
  const [covid, setCovid] = useState(false);
  const [gripe, setGripe] = useState(false);
  const [fiebre, setFiebre] = useState(false);

  const btnCovid = () => {
    setCovid(!covid);
  };

  const btnGripe = () => {
    setGripe(!gripe);
  };

  const btnFiebre = () => {
    setFiebre(!fiebre);
  };

  return (
    <div className="checkout">
      <div className="checkout-items">
        <div className="card">
          <div className="card-content">
            <h1>Campaña de vacunacion COVID 19</h1>
            <button className="btn-inscripcion" onClick={btnCovid}>
              {covid ? "Darme de baja" : "Inscribirme"}
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h1>Campaña de vacunacion Gripe A</h1>
            <button className="btn-inscripcion" onClick={btnGripe}>
              {gripe ? "Darme de baja" : "Inscribirme"}
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h1>Campaña de vacunacion Fiebre amarilla</h1>
            <button className="btn-inscripcion" onClick={btnFiebre}>
              {fiebre ? "Darme de baja" : "Inscribirme"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Campaign;
