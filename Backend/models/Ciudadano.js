const { Schema, model } = require('mongoose');

const ciudadanoSchema = new Schema({
  nombre: String,
  apellido: String,
  dni: Number,
  email: String,
  vacunatorio: Number,
});

module.exports = model('Ciudadano', ciudadanoSchema);
