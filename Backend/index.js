const express = require('express');
require('./database');

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Aprobanos ruso');
});
