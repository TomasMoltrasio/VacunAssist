const { Schema, model } = require('mongoose');

const vacunatorioSchema = new Schema({
  nombre: String,
  direccion: String,
  numero: Number,
  stockCovid: Number,
  stockGripe: Number,
  stockFiebre: Number,
});

module.exports = model('Vacunatorio', vacunatorioSchema);
