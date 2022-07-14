const { Schema, model } = require('mongoose');

const turnoSchema = new Schema({
  dni: Number,
  marca: String,
  fabricante: String,
  dosis: { type: Number, default: 0 },
  fecha: Date,
  lote: String,
  vacunatorio: Number,
  vacunador: String,
  presente: String,
  sinTurno: Number,
});

module.exports = model('Turno', turnoSchema);
