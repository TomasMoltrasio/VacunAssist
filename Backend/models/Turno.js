const { Schema, model } = require('mongoose');

const turnoSchema = new Schema({
  dni: Number,
  marca: String,
  dosis: { type: Number, default: 0 },
  fecha: Date,
  lote: Date,
  vacunatorio: Number,
  presente: Boolean,
});

module.exports = model('Turno', turnoSchema);
