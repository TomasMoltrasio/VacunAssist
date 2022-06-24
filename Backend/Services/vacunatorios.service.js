const vacunatorioService = {};
const Vacunatorio = require('../models/Vacunatorio');

vacunatorioService.getVacunatorio = async (req, res) => {
  const vacunatorio = await Vacunatorio.findOne({ numero: req.params.id });
  res.json(vacunatorio);
};

vacunatorioService.getVacunatorios = async (req, res) => {
  const vacunatorios = await Vacunatorio.find();
  res.json(vacunatorios);
};

vacunatorioService.createVacunatorio = async (req, res) => {
  const newVacunatorio = new Vacunatorio({
    nombre: req.body.nombre,
    direccion: req.body.direccion || '',
    numero: req.body.numero,
    stockCovid: req.body.stockCovid || 0,
    stockGripe: req.body.stockGripe || 0,
    stockFiebre: req.body.stockFiebre || 0,
  });
  const savedVacunatorio = await newVacunatorio.save();
  res.json(savedVacunatorio);
};

vacunatorioService.updateVacunatorio = async (req, res) => {
  const vacunatorio = await Vacunatorio.findOne({ numero: req.params.id });
  const { stockCovid, stockFiebre, stockGripe } = req.body;
  const newVacunatorio = {
    nombre: vacunatorio.nombre || req.body.nombre,
    direccion: vacunatorio.direccion || req.body.direccion,
    stockCovid:
      stockCovid !== undefined
        ? vacunatorio.stockCovid + req.body.stockCovid
        : vacunatorio.stockCovid,
    stockGripe:
      stockGripe !== undefined
        ? vacunatorio.stockGripe + req.body.stockGripe
        : vacunatorio.stockGripe,
    stockFiebre:
      stockFiebre !== undefined
        ? vacunatorio.stockFiebre + req.body.stockFiebre
        : vacunatorio.stockFiebre,
  };
  await Vacunatorio.findOneAndUpdate({ numero: req.params.id }, newVacunatorio);
  res.json(newVacunatorio);
};

vacunatorioService.deleteVacunatorio = async (req, res) => {
  const deletedVacunatorio = await Vacunatorio.findOneAndDelete({
    numero: req.body.numero,
  });
  res.json(deletedVacunatorio);
};

module.exports = vacunatorioService;
