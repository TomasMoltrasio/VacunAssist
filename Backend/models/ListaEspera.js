const { Schema, model } = require('mongoose');

const listaEsperaSchema = new Schema({
  dni: Number,
  marca: String,
  dosis: { type: Number, default: 0 },
  vacunatorio: Number,
});

module.exports = model('ListaEspera', listaEsperaSchema);
