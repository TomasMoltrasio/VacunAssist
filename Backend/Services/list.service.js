const listService = {};
const List = require('../models/ListaEspera');

listService.createEspera = async (req, res) => {
  const newList = new List({
    dni: Number(req.body.dni),
    covid: Number(req.body.covid) || 0,
    gripe: req.body.gripe || false,
    fiebre: req.body.fiebre || false,
    edad: Number(req.body.edad),
    riesgo: req.body.riesgo,
    vacunatorio: Number(req.body.vacunatorio),
  });
  await newList.save();
  res.json('Añadido a la lista de espera');
};

listService.getEspera = async (req, res) => {
  const list = await List.find({ dni: Number(req.params.id) });
  res.json(list);
};

listService.getEsperas = async (req, res) => {
  const list = await List.find();
  res.json(list);
};

listService.updateEspera = async (req, res) => {
  const list = await List.find({ dni: Number(req.params.id) });
  const newList = {
    riesgo: req.body.riesgo || list[0].riesgo,
    vacunatorio: Number(req.body.vacunatorio) || list[0].vacunatorio,
    covid: Number(req.body.covid) || list[0].covid,
    fiebre: req.body.fiebre || list[0].fiebre,
    gripe: req.body.gripe || list[0].gripe,
  };
  await List.findOneAndUpdate({ dni: req.params.id }, newList);
  res.json('Lista actualizada');
};

listService.deleteEspera = async (req, res) => {
  await List.findOneAndDelete(req.params.id);
  res.json('Lista de espera eliminada');
};

module.exports = listService;
