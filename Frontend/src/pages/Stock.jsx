import React from "react";
import "@styles/StockVacunatorio.scss";
import StockVacunatorio from "../components/StockVacunatorio";
import { useEffect, useState } from "react";
import axios from "axios";
import TurnPerVacunatorio from "../components/TurnPerVacunatorio";

const Stock = () => {
  const [vacunatorios, setVacunatorios] = useState([]);
  const [absent, setAbsent] = useState([]);

  const getVacunatorios = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/vacunatorios/"
    );
    setVacunatorios(data);
  };

  const getAbsent = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/turns/absent/"
    );
    console.log(data);
    setAbsent(data);
  };

  useEffect(() => {
    getAbsent();
  }, []);

  useEffect(() => {
    getVacunatorios();
  }, [vacunatorios]);

  return (
    <div className="Stock">
      <h2>Stock</h2>
      <div className="Stock-container">
        {vacunatorios.map((vacunatorio) => (
          <StockVacunatorio vacunatorio={vacunatorio} key={vacunatorio._id} />
        ))}
      </div>
      <h2>Ausentes</h2>
      <div className="absent-container">
        <TurnPerVacunatorio
          vacunatorio={absent[0]}
          num={1}
          title={"Ausentes"}
        />
        <TurnPerVacunatorio
          vacunatorio={absent[1]}
          num={2}
          title={"Ausentes"}
        />
        <TurnPerVacunatorio
          vacunatorio={absent[2]}
          num={3}
          title={"Ausentes"}
        />
      </div>
      <button className="btn-add-absent">Sumar ausentes</button>
    </div>
  );
};

export default Stock;
