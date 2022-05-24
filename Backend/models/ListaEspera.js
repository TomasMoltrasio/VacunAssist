const { Schema, model } = require('mongoose');

const listaEsperaSchema = new Schema({
  dni: Number,
  covid: Number,
  gripe: Boolean,
  fiebre: Boolean,
  edad: Number,
  riesgo: Boolean,
  vacunatorio: Number,
});

module.exports = model('ListaEspera', listaEsperaSchema);
