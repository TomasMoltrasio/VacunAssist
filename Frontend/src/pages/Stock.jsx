import React from "react";
import "@styles/StockVacunatorio.scss";
import StockVacunatorio from "../components/StockVacunatorio";
import { useEffect, useState } from "react";
import axios from "axios";
import TurnPerVacunatorio from "../components/TurnPerVacunatorio";
import swal from "sweetalert";

const Stock = () => {
  const [vacunatorios, setVacunatorios] = useState([]);
  const [absent, setAbsent] = useState([]);
  const [disabled, setDisabled] = useState(false);

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
    setAbsent(data);
  };

  const addAbsent = async () => {
    console.log(absent);
    swal({
      title: "Sumar ausentes",
      text: "¿Está seguro de sumar los ausentes hasta la fecha?",
      icon: "warning",
      buttons: ["NO", "SI"],
      dangerMode: true,
    }).then(async (r) => {
      if (r) {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/turns/absent/"
        );
        setAbsent(data);
        swal("Ausentes sumados", {
          icon: "success",
        }).then(() => {
          location.reload();
          getAbsent();
        });
      }
    });
  };

  const disabledBtn = () => {
    const array = [];
    absent.forEach((element) => {
      array.push(Object.values(element));
    });
    const cant = array.flat().reduce((a, b) => a + b, 0);
    if (cant > 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    getAbsent();
  }, []);

  useEffect(() => {
    disabledBtn();
  }, [absent]);

  useEffect(() => {
    getVacunatorios();
  }, []);

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
      <div className="btn-container-ausentes">
        <button
          className="btn-add-absent"
          onClick={() => addAbsent()}
          disabled={!disabled}
        >
          Sumar ausentes
        </button>
      </div>
    </div>
  );
};

export default Stock;
