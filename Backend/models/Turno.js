const { Schema, model } = require('mongoose');

const turnoSchema = new Schema({
  dni: Number,
  marca: String,
  dosis: { type: Number, default: 0 },
  fecha: Date,
  lote: String,
  vacunatorio: Number,
  presente: String,
});

module.exports = model('Turno', turnoSchema);
