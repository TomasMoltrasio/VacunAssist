const turnService = {};
const Turn = require('../models/Turno');
const List = require('../models/ListaEspera');

const generateCovid = async (list) => {
  const turn = await Turn.find({ dni: Number(list.dni), marca: 'Covid' });
  console.log('turno covid', turn);
  const date = Date(turn[0].fecha) || new Date();
  if (turn[0].fecha && turn[0].dosis !== 3) {
    return date.setDate(date.getDate() + 30);
  } else {
    if (list.riesgo === true || list.edad > 60) {
      date.setDate(date.getDate() + 7);
    }
  }
};
const generateGripe = async (list) => {
  const turn = await Turn.find({ dni: Number(list.dni), marca: 'Gripe' });
  const date = Date(turn[0].fecha) || new Date();
  if (turn[0].fecha) {
    return date.setDate(date.getDate() + 365);
  } else {
    return list.edad > 60
      ? date.setDate(date.getDate() + 90)
      : date.setDate(date.getDate() + 180);
  }
};

const caseVacuna = async (dni) => {
  const list = await List.find({ dni: Number(dni) });
  const turnos = [];
  if (list[0].covid === 1) {
    turnos.push({
      marca: 'Covid',
      dosis: list[0].covid,
      fecha: generateCovid(list),
      vacunatorio: list[0].vacunatorio,
    });
  }
  if (list[0].gripe === true) {
    turnos.push({
      marca: 'Gripe',
      fecha: Date(generateGripe(list)),
      vacunatorio: list[0].vacunatorio,
    });
  }
  return turnos;
};

turnService.createTurn = async (req, res) => {
  const turnos = caseVacuna(req.body.dni);
  if (turnos.length !== 0) {
    for (const index in turnos) {
      const newTurn = new Turn({
        dni: Number(req.body.dni),
        marca: turnos[index].marca,
        dosis: turnos[index].dosis || 0,
        fecha: turnos[index].fecha,
        lote: req.body.lote || '',
        vacunatorio: Number(turnos[index].vacunatorio),
        presente: req.body.presente || false,
      });
      await newTurn.save();
      res.json('Turno creado');
    }
  }
};

turnService.createTurnLast = async (req, res) => {
  const newTurn = new Turn({
    dni: Number(req.params.id),
    marca: req.body.marca,
    dosis: req.body.dosis || 0,
    fecha: new Date(req.body.fecha),
    lote: req.body.lote,
    vacunatorio: 4,
    presente: true,
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
    fecha: turn.fecha,
    lote: req.body.lote,
    vacunatorio: turn.vacunatorio,
    presente: req.body.presente,
  });
  await Turn.findByIdAndUpdate(req.params.id, newTurn);
  res.json(newTurn);
};

turnService.deleteTurn = async (req, res) => {
  await Turn.findByIdAndDelete(req.params.id);
  res.json('Turno eliminado');
};

module.exports = turnService;
