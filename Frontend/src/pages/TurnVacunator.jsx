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
  const [mod, setMod] = useState(false);
  const [existe, setExiste] = useState(false);
  const [nombre, setNombre] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [edad, setEdad] = useState(0);
  const [stock, setStock] = useState(null);
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
    if (busqueda.length > 5) {
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
    } else {
      setBusquedaDni(false);
      setTurnos(tablaTurnos);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    verificarDni();
  }, [busqueda]);

  const verificarTurno = async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/turns/${dni}`
    );
    if (edad !== 0) {
      if (marca === "Covid" && edad < 18) {
        return "La vacunada de Covid no se aplica a menores de 18 años";
      } else if (marca === "Fiebre" && edad > 60) {
        return "La vacunada de Fiebre no se aplica a mayores de 60 años";
      }
    }
    if (data.length > 0) {
      if (
        marca === "Fiebre" &&
        data
          .filter((t) => t.marca === marca)
          .filter((t) => t.presente === "aplicada").length > 0
      ) {
        return "La vacuna de la fiebre se aplica una sola vez";
      }
      if (
        marca === "Covid" &&
        data
          .filter((t) => t.marca === marca)
          .filter((t) => t.presente === "aplicada")
          .filter((t) => t.dosis >= dosis).length > 0
      ) {
        return "La dosis no debe ser aplicada";
      }
      if (
        marca === "Covid" &&
        dosis > 1 &&
        data
          .filter((t) => t.marca === marca)
          .filter((t) => t.presente === "aplicada")
          .filter((t) => t.dosis === dosis - 1)
          .filter((t) => {
            const fecha = new Date(t.fecha);
            const fechaActual = new Date();
            const diferencia = fechaActual.getTime() - fecha.getTime();
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            return dias <= 90;
          }).length > 0
      ) {
        return "La dosis de Covid debe ser aplicada cada 90 días";
      }
      if (
        marca === "Gripe" &&
        data
          .filter((t) => t.marca === marca)
          .filter((t) => t.presente === "aplicada")
          .filter((t) => {
            const fechaTurno = new Date(t.fecha);
            return (
              fechaTurno.setFullYear(fechaTurno.getFullYear() + 1) > new Date()
            );
          }).length > 0
      ) {
        return "Debes esperar 1 año para volver a darte la vacuna de gripe";
      }
    }
    return "true";
  };

  const confirmarDatos = (e) => {
    e.preventDefault();
    if (dni === "" || marca === "" || lote === "" || fabricante === "") {
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
      }).then(async (r) => {
        if (r) {
          const ver = await verificarTurno();
          if (ver === "true") {
            await axios.post(`http://localhost:3000/api/v1/turns/${dni}`, {
              vacunatorio: user.vacunatorioTrabajo,
              marca: marca,
              dosis: marca === "Covid" ? dosis : null,
              lote: lote,
              fabricante: fabricante,
              vacunador: user.nombre + " " + user.apellido,
              presente: "aplicada",
              fecha: new Date().toISOString(),
            });
            await axios.patch(`http://localhost:3000/api/v1/list/${dni}`, {
              covid: marca === "Covid" ? dosis + 1 : null,
            });
            await axios.patch(
              `http://localhost:3000/api/v1/vacunatorios/${user.vacunatorioTrabajo}`,
              {
                stockCovid: marca === "Covid" ? -1 : 0,
                stockFiebre: marca === "Fiebre" ? -1 : 0,
                stockGripe: marca === "Gripe" ? -1 : 0,
              }
            );
            const { data } = await axios.get(
              `http://localhost:3000/api/v1/turns/${user.dni}`
            );
            const turnoFiltro = data
              .filter((turno) => turno.marca === marca)
              .filter((turno) => turno.presente === "activo");
            turnoFiltro.map(
              async (turno) =>
                await axios.delete(
                  `http://localhost:3000/api/v1/turns/${turno._id}`
                )
            );
            await axios.post("http://localhost:3000/api/v1/turns/", {
              dni: user.dni,
            });
            swal({
              title: "Turno marcado con exito",
              icon: "success",
            }).then(() => {
              location.reload();
            });
          } else {
            swal({
              title: "Error",
              text: ver,
              icon: "error",
            });
          }
        }
      });
    }
  };

  const verificarDni = async (e) => {
    setDni(busqueda);
    if (busqueda.length === 8) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/users/${busqueda}`
        );
        if (res.data !== undefined) {
          setMod(true);
          setNombre(res.data.nombre + " " + res.data.apellido);
          setEdad(0);
        }
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/list/${busqueda}`
        );
        if (data !== undefined) {
          setExiste(true);
          setDosis(data.covid);
        }
      } catch (error) {
        try {
          const { data } = await axios.get(
            `http://localhost:3000/api/v1/users/no-register/${busqueda}`
          );
          if (data !== undefined) {
            setMod(true);
            if (data.nombre !== undefined) {
              setNombre(data.nombre + " " + data.apellido);
            } else {
              setNombre(data.apellido);
            }
            setEdad(data.edad);
            setExiste(false);
          }
        } catch (error) {
          setNombre("El dni ingresado no existe");
          setExiste(false);
          setEdad(0);
        }
      }
    } else {
      setNombre("");
      setMod(false);
      setEdad(0);
    }
  };

  const verificarMarca = async (e) => {
    setMarca(e.target.value);
    if (e.target.value === "Covid") {
      setDosis(Math.abs(dosis));
    } else {
      setDosis(dosis * -1);
    }
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/vacunatorios/${user.vacunatorioTrabajo}`
    );
    if (data !== undefined) {
      if (e.target.value === "Covid") {
        setStock(data.stockCovid);
        setCovid(true);
      } else if (e.target.value === "Gripe") {
        setStock(data.stockGripe);
        setCovid(false);
      } else if (e.target.value === "Fiebre") {
        setStock(data.stockFiebre);
        setCovid(false);
      }
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
              {mod ? (
                <input
                  className="nombre-vacunado"
                  type="text"
                  value={nombre}
                  disabled
                />
              ) : null}
              {edad !== 0 ? (
                <input
                  className="edad-vacunado"
                  type={"text"}
                  value={`${edad} años`}
                  disabled
                />
              ) : null}
              <label>Vacuna</label>
              <select
                name="marca"
                id="marca"
                onChange={(e) => verificarMarca(e)}
              >
                <option value=""></option>
                <option value="Covid">Covid</option>
                <option value="Gripe">Gripe A</option>
                <option value="Fiebre">Fiebre amarilla</option>
              </select>
              {stock > 0 ? (
                <>
                  <label>Marca</label>
                  <input
                    type="text"
                    onChange={(e) => setFabricante(e.target.value)}
                  />
                  {existe ? (
                    <>
                      {covid ? (
                        <>
                          <label>Dosis</label>
                          <input
                            className="dosis-covid"
                            type="text"
                            value={Math.abs(dosis)}
                            disabled
                          />{" "}
                        </>
                      ) : null}
                      <label>Lote</label>
                      <input
                        type="text"
                        onChange={(e) => setLote(e.target.value)}
                      />
                    </>
                  ) : (
                    <>
                      {covid ? (
                        <>
                          <label>Dosis</label>
                          <select
                            name="dosis"
                            id="dosis"
                            onChange={(e) => setDosis(e.target.value)}
                          >
                            <option value={0} selected></option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>{" "}
                        </>
                      ) : null}
                      <label>Lote</label>
                      <input
                        type="text"
                        onChange={(e) => setLote(e.target.value)}
                      />
                    </>
                  )}
                  <button
                    onClick={(e) => confirmarDatos(e)}
                    disabled={
                      dosis > 3 || nombre === "El dni ingresado no existe"
                    }
                  >
                    Confirmar
                  </button>
                </>
              ) : null}
              {stock === 0 ? <h4>No hay stock</h4> : null}
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TurnVacunator;
