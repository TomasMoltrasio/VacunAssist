const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
  rol: Number,
  nombre: String,
  apellido: String,
  dni: Number,
  fechaNacimiento: Date,
  email: String,
  vacunatorio: Number,
  riesgo: Boolean,
  vacunatorioTrabajo: { type: Number, default: 0 },
});

module.exports = model('Usuario', usuarioSchema);
