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
  if (
    turnCovid.length !== 0 &&
    (list[0].riesgo === true || list[0].edad > 60)
  ) {
    let fecha = turnCovid[0].fecha.setDate(turnCovid[0].fecha.getDate() + 30);
    if (fecha - new Date().getTime() < 0) {
      return date.setDate(date.getDate() + 7);
    } else {
      return new Date(fecha);
    }
  } else {
    if (list[0].riesgo === true || list[0].edad > 60) {
      return date.setDate(date.getDate() + 7);
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
      return date.setDate(date.getDate() + 180);
    } else {
      return new Date(fecha);
    }
  } else {
    return list[0].edad > 60
      ? date.setDate(date.getDate() + 90)
      : date.setDate(date.getDate() + 180);
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
        vacunatorio: turno.vacunatorio,
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
    fecha: new Date(req.body.fecha) || new Date(),
    lote: req.body.lote,
    vacunatorio: req.body.vacunatorio || 4,
    presente: req.body.presente || 'aplicada',
  });
  await newTurn.save();
  res.json('Turno creado');
};

turnService.getTurn = async (req, res) => {
  const turnos = await Turn.find({ dni: Number(req.params.id) });
  res.json(turnos);
};

turnService.getTurns = async (req, res) => {
  const turnos = await Turn.find();
  res.json(turnos);
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

module.exports = turnService;
