import React from "react";
import "@styles/StockVacunatorio.scss";
import StockVacunatorio from "../components/StockVacunatorio";
import { useEffect, useState } from "react";
import axios from "axios";

const Stock = () => {
  const [vacunatorios, setVacunatorios] = useState([]);

  const getVacunatorios = async () => {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/vacunatorios/"
    );
    setVacunatorios(data);
  };

  useEffect(() => {
    getVacunatorios();
  }, []);

  return (
    <div className="Stock">
      <div className="Stock-container">
        {vacunatorios.map((vacunatorio) => (
          <StockVacunatorio vacunatorio={vacunatorio} key={vacunatorio._id} />
        ))}
      </div>
    </div>
  );
};

export default Stock;
