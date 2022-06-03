import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import TurnToday from "@components/TurnToday";
import "@styles/TurnVacunator.scss";
import Cookies from "universal-cookie";
import { BsSearch } from "react-icons/bs";
import swal from "sweetalert";

const TurnVacunator = () => {
  const [turnos, setTurnos] = useState([]);
  const [tablaTurnos, setTablaTurnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [busquedaDni, setBusquedaDni] = useState(false);
  const [covid, setCovid] = useState(false);
  const [marca, setMarca] = useState("");
  const [dni, setDni] = useState(0);
  const [lote, setLote] = useState("");
  const [dosis, setDosis] = useState(0);
  const cookies = new Cookies();
  const user = cookies.get("user");

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:3000/api/v1/turns/");
    const fecha = new Date().toISOString().slice(0, 10);

    const res = data
      .filter((t) => t.vacunatorio === user.vacunatorioTrabajo)
      .filter((t) => t.presente === "activo")
      .filter((t) => t.fecha.slice(0, 10) === fecha);

    setTurnos(res);
    setTablaTurnos(res);
  };

  const filtrarTurnos = (e) => {
    setBusqueda(e.target.value);
    const newRes = tablaTurnos.filter((t) => {
      if (t.dni.toString().includes(e.target.value)) {
        return t;
      }
    });
    if (newRes.length > 0) {
      setBusquedaDni(false);
      setTurnos(newRes);
    } else {
      setTurnos([]);
      setBusquedaDni(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [busqueda]);

  const confirmarDatos = (e) => {
    e.preventDefault();
    if (dni === "" || marca === "" || lote === "") {
      swal({
        title: "Error",
        text: "Debe ingresar todos los datos",
        icon: "error",
      });
    } else {
      swal({
        title: "Marcar como presente",
        text: "¿Confirmas la presencia del ciudadano?",
        icon: "info",
        buttons: ["NO", "SI"],
      }).then((r) => {
        if (r) {
          axios.post(`http://localhost:3000/api/v1/turns/${dni}`, {
            vacunatorio: user.vacunatorioTrabajo,
            marca: marca,
            dosis: dosis,
            lote: lote,
            presente: "aplicada",
            fecha: new Date().toISOString(),
          });
          swal({
            title: "Turno marcado con exito",
            icon: "success",
          });
        }
      });
    }
  };

  const seleccionarMarca = (e) => {
    setMarca(e.target.value);
    if (e.target.value === "Covid") {
      setCovid(true);
    } else {
      setCovid(false);
      setDosis(0);
    }
  };

  return (
    <div className="TurnVacunator">
      <div className="TurnVacunator-container">
        <h1>Turnos del dia</h1>
        <div className="busqueda-container">
          <input
            className="inputBusqueda"
            type={`text`}
            placeholder={`Buscar por DNI`}
            value={busqueda}
            onChange={(e) => filtrarTurnos(e)}
          />
          <BsSearch className="logoBusqueda" />
        </div>

        {turnos.map((turno) => (
          <TurnToday turno={turno} key={`vacunador-${turno._id}`} />
        ))}
        {busquedaDni ? (
          <div className="no-result">
            <h4>No se encontraron resultados</h4>
            <span>¿Quieres registrar el dni del vacunado?</span>
            <form className="form-vacunado-sinturno">
              <label>DNI</label>
              <input
                type="text"
                defaultValue={busqueda}
                onChange={(e) => setDni(e.target.value)}
              />
              <label>Marca</label>
              <select
                name="marca"
                id="marca"
                onChange={(e) => seleccionarMarca(e)}
              >
                <option value=""></option>
                <option value="Gripe">Gripe A</option>
                <option value="Fiebre">Fiebre amarilla</option>
                <option value="Covid">Covid</option>
              </select>
              <label>Dosis</label>
              <select
                name="dosis"
                id="dosis"
                disabled={!covid}
                onChange={(e) => setDosis(e.target.value)}
              >
                <option value={0} selected></option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <label>Lote</label>
              <input type="text" onChange={(e) => setLote(e.target.value)} />
              <button onClick={(e) => confirmarDatos(e)}>Confirmar</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TurnVacunator;
