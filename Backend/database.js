const mongoose = require('mongoose');

const URI = 'mongodb://localhost/vacunassist';

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('La base de datos esta conectada');
});
