const listService = {};
const List = require('../models/ListaEspera');
const User = require('../models/Usuario');

listService.createEspera = async (req, res) => {
  const usuario = await User.findOne({ dni: Number(req.body.dni) });
  function getEdad() {
    let hoy = new Date();
    let fechaNacimiento = usuario.fechaNacimiento;
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
    return edad;
  }
  const newList = new List({
    dni: Number(req.body.dni),
    covid: Number(req.body.covid) || -1,
    gripe: req.body.gripe || false,
    fiebre: req.body.fiebre || false,
    edad: Number(getEdad()),
    riesgo: req.body.riesgo,
    vacunatorio: Number(req.body.vacunatorio),
  });
  await newList.save();
  res.json('Añadido a la lista de espera');
};

listService.getEspera = async (req, res) => {
  const list = await List.findOne({ dni: Number(req.params.id) });
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
    fiebre: req.body.fiebre === null ? list[0].fiebre : req.body.fiebre,
    gripe: req.body.gripe === null ? list[0].gripe : req.body.gripe,
    edad: req.body.edad || list[0].edad,
  };
  await List.findOneAndUpdate({ dni: req.params.id }, newList);
  const list2 = await List.findOne({ dni: Number(req.params.id) });
  res.json(list2);
};

listService.deleteEspera = async (req, res) => {
  await List.findOneAndDelete({ dni: req.params.id });
  res.json('Lista de espera eliminada');
};

module.exports = listService;
