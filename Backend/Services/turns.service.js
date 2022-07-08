const turnService = {};
const Turn = require('../models/Turno');
const List = require('../models/ListaEspera');

const generateCovid = async (list) => {
  const turn = await Turn.find({ dni: list[0].dni });
  const turnCovid = turn.filter((turn) => turn.marca === 'Covid');
  if (
    turnCovid.length > 0 &&
    turnCovid.find((turno) => turno.presente === 'activo')
  )
    return 'error';
  const date = new Date();
  if (turnCovid.length !== 0) {
    let fecha = turnCovid[turnCovid.length - 1].fecha.setMonth(
      turnCovid[turnCovid.length - 1].fecha.getMonth() + 3
    );
    if (fecha - new Date().getTime() < 0) {
      return date.setDate(date.getDate() + 7);
    } else {
      return new Date(fecha);
    }
  } else {
    if (list[0].riesgo === true || list[0].edad > 60) {
      if (list[0].covid > 1) {
        return date.setMonth(date.getMonth() + 3);
      } else {
        return date.setDate(date.getDate() + 7);
      }
    } else {
      return 'error';
    }
  }
};
const generateGripe = async (list) => {
  const turn = await Turn.find({
    dni: list[0].dni,
  });
  const turnGripe = turn.filter((turn) => turn.marca === 'Gripe');
  if (
    turnGripe.length > 0 &&
    turnGripe.find((turno) => turno.presente === 'activo')
  )
    return 'error';
  const date = new Date();

  if (turnGripe.length !== 0) {
    let fecha = turnGripe[0].fecha.setDate(turnGripe[0].fecha.getDate() + 365);
    if (fecha - new Date().getTime() < 0) {
      return date.setDate(date.getDate() + 7);
    } else {
      return new Date(fecha);
    }
  } else {
    return list[0].edad > 60
      ? date.setMonth(date.getMonth() + 3)
      : date.setMonth(date.getMonth() + 6);
  }
};

const caseVacuna = async (dni) => {
  const list = await List.find({ dni: dni });
  const turnos = [];
  const fechaCovid = await generateCovid(list);
  const fechaGripe = await generateGripe(list);
  if (list[0].covid > 0 && list[0].covid < 4 && fechaCovid !== 'error') {
    turnos.push({
      marca: 'Covid',
      dosis: list[0].covid,
      fecha: fechaCovid,
      vacunatorio: list[0].vacunatorio,
    });
  }
  if (list[0].gripe === true && fechaGripe !== 'error') {
    turnos.push({
      marca: 'Gripe',
      fecha: fechaGripe,
      vacunatorio: list[0].vacunatorio,
    });
  }
  return turnos;
};

turnService.createTurn = async (req, res) => {
  const turnos = await caseVacuna(req.body.dni);
  if (turnos.length !== 0) {
    turnos.forEach(async (turno) => {
      await new Turn({
        dni: Number(req.body.dni),
        marca: turno.marca,
        dosis: turno.dosis || 0,
        fecha: turno.fecha,
        lote: req.body.lote || '',
        fabricante: req.body.fabricante || '',
        vacunatorio: turno.vacunatorio,
        vacunador: req.body.vacunador || '',
        presente: 'activo',
      }).save();
    });
    res.json('Turno creado');
  } else {
    res.send('No se genera ningun turno');
  }
};

turnService.createTurnLast = async (req, res) => {
  const newTurn = new Turn({
    dni: Number(req.params.id),
    marca: req.body.marca,
    dosis: req.body.dosis || 0,
    fabricante: req.body.fabricante || '',
    fecha: new Date(req.body.fecha) || new Date(),
    lote: req.body.lote,
    vacunatorio: req.body.vacunatorio || 4,
    presente: req.body.presente || 'aplicada',
    vacunador: req.body.vacunador || '',
  });
  await newTurn.save();
  res.json('Turno creado');
};

turnService.getTurn = async (req, res) => {
  const turnos = await Turn.find({ dni: Number(req.params.id) });

  const today = new Date();
  const dayInMillis = 24 * 3600000;
  const tomorrow = Math.floor(today.getTime() / dayInMillis);
  turnos.map(async (turno) => {
    let fecha = new Date(turno.fecha);
    let hoy = Math.floor(fecha.getTime() / dayInMillis);
    let nuevo = new Turn({
      _id: turno._id,
      dni: turno.dni,
      marca: turno.marca,
      dosis: turno.dosis,
      fecha: turno.fecha,
      lote: turno.lote,
      fabricante: turno.fabricante,
      vacunatorio: turno.vacunatorio,
      vacunador: turno.vacunador,
      presente:
        turno.presente == 'activo' && hoy < tomorrow ? 'falto' : turno.presente,
    });
    await Turn.findByIdAndUpdate(turno._id, nuevo);
  });
  const newTurnos = await Turn.find({ dni: Number(req.params.id) });
  res.json(newTurnos);
};

turnService.getTurns = async (req, res) => {
  const turnos = await Turn.find();
  const today = new Date();
  const dayInMillis = 24 * 3600000;
  const tomorrow = Math.floor(today.getTime() / dayInMillis);
  turnos.map(async (turno) => {
    let fecha = new Date(turno.fecha);
    let hoy = Math.floor(fecha.getTime() / dayInMillis);
    let nuevo = new Turn({
      _id: turno._id,
      dni: turno.dni,
      marca: turno.marca,
      dosis: turno.dosis,
      fabricante: turno.fabricante,
      fecha: turno.fecha,
      lote: turno.lote,
      vacunatorio: turno.vacunatorio,
      vacunador: turno.vacunador,
      presente:
        turno.presente == 'activo' && hoy < tomorrow ? 'falto' : turno.presente,
    });
    await Turn.findByIdAndUpdate(turno._id, nuevo);
  });
  const newTurnos = await Turn.find();
  res.json(newTurnos);
};

turnService.updateTurn = async (req, res) => {
  const turn = await Turn.findById(req.params.id);
  const newTurn = new Turn({
    _id: req.params.id,
    dni: turn.dni,
    marca: turn.marca,
    dosis: turn.dosis || 0,
    fecha:
      turn.fecha.setDate(turn.fecha.getDate() + req.body.fecha) || turn.fecha,
    lote: req.body.lote || turn.lote,
    fabricante: req.body.fabricante || turn.fabricante,
    vacunador: req.body.vacunador || turn.vacunador,
    vacunatorio: turn.vacunatorio,
    presente: req.body.presente || turn.presente,
  });
  await Turn.findByIdAndUpdate(req.params.id, newTurn);
  res.json(newTurn);
};

turnService.deleteTurn = async (req, res) => {
  await Turn.findByIdAndDelete(req.params.id);
  res.json('Turno eliminado');
};

turnService.deleteTurns = async (req, res) => {
  await Turn.deleteMany({});
  res.json('eliminados');
};

const getSemana = (turnos) => {
  const semana = {
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
    sabado: [],
    domingo: [],
  };
  turnos.map((turno) => {
    let fecha = new Date(turno.fecha);
    let dia = fecha.getDay();
    switch (dia) {
      case 1:
        semana.lunes.push(turno.marca);
        break;
      case 2:
        semana.martes.push(turno.marca);
        break;
      case 3:
        semana.miercoles.push(turno.marca);
        break;
      case 4:
        semana.jueves.push(turno.marca);
        break;
      case 5:
        semana.viernes.push(turno.marca);
        break;
      case 6:
        semana.sabado.push(turno.marca);
        break;
      case 0:
        semana.domingo.push(turno.marca);
        break;
    }
  });
  return semana;
};

const sumarStock = (turnos, num) => {
  const vacunas = {
    covid: 0,
    gripe: 0,
    fiebre: 0,
  };
  let stock = turnos.filter((turno) => turno.vacunatorio === num);
  stock.map((turno) => {
    switch (turno.marca) {
      case 'Covid':
        vacunas.covid++;
        break;
      case 'Gripe':
        vacunas.gripe++;
        break;
      case 'Fiebre':
        vacunas.fiebre++;
        break;
    }
  });
  return vacunas;
};
turnService.getStock = async (req, res) => {
  const turnos = await Turn.find();
  let newTurnos = [];
  const fecha = new Date(req.body.fecha);
  newTurnos = turnos
    .filter((turno) => {
      let fechaTurno = new Date(turno.fecha);
      return fechaTurno.getTime() === fecha.getTime();
    })
    .filter((turno) => turno.vacunatorio < 4);

  const stock = [];

  for (let i = 1; i < 4; i++) {
    stock.push(sumarStock(newTurnos, i));
  }

  res.json(stock);
};

turnService.getAverage = async (req, res) => {
  const turnos = await Turn.find();
  const date = new Date(req.body.fecha);
  let fecha =
    date.getDay() !== 1
      ? date.setDate(date.getDate() - date.getDay() + 1)
      : date;
  fecha = new Date(fecha);
  let finSemana = new Date(fecha);
  finSemana = new Date(finSemana.setDate(finSemana.getDate() + 6));
  const newTurnos = turnos.filter((turno) => {
    let fechaTurno = new Date(turno.fecha);
    return fechaTurno >= fecha && fechaTurno <= finSemana;
  });
  const vacunatorio1 = [];
  const vacunatorio2 = [];
  const vacunatorio3 = [];

  for (const turno of newTurnos) {
    if (turno.vacunatorio === 1) {
      vacunatorio1.push({
        fecha: turno.fecha,
        marca: turno.marca,
      });
    } else if (turno.vacunatorio === 2) {
      vacunatorio2.push({
        fecha: turno.fecha,
        marca: turno.marca,
      });
    } else if (turno.vacunatorio === 3) {
      vacunatorio3.push({
        fecha: turno.fecha,
        marca: turno.marca,
      });
    }
  }

  const semanaVacunatorio1 = getSemana(vacunatorio1);
  const semanaVacunatorio2 = getSemana(vacunatorio2);
  const semanaVacunatorio3 = getSemana(vacunatorio3);
  const stock = {
    vacunatorio1: semanaVacunatorio1,
    vacunatorio2: semanaVacunatorio2,
    vacunatorio3: semanaVacunatorio3,
  };

  res.json({
    stock,
  });
};

turnService.getAbsent = async (req, res) => {
  const turnos = await Turn.find();
  const newTurnos = turnos.filter((turno) => turno.presente === 'falto');
  const absent = [];
  for (let i = 1; i < 4; i++) {
    absent.push(sumarStock(newTurnos, i));
  }
  res.json(absent);
};

turnService.addAbsent = async (req, res) => {
  const turnos = await Turn.find();
  const newTurnos = turnos.filter((turno) => turno.presente === 'falto');
  const absent = [];
  for (let i = 1; i < 4; i++) {
    absent.push(sumarStock(newTurnos, i));
  }
  newTurnos.map(async (turno) => {
    let nuevo = new Turn({
      _id: turno._id,
      dni: turno.dni,
      marca: turno.marca,
      dosis: turno.dosis,
      fabricante: turno.fabricante,
      fecha: turno.fecha,
      lote: turno.lote,
      vacunatorio: turno.vacunatorio,
      vacunador: turno.vacunador,
      presente: 'ausente',
    });
    await Turn.findByIdAndUpdate(turno._id, nuevo);
  });
  res.json(absent);
};

module.exports = turnService;
