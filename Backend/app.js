const express = require('express');
const cors = require('cors');
const app = express();

// setting

app.set('port', process.env.PORT || 3000);

// middleware

app.use(express.json());
app.use(cors());

// routes

app.use('/api/v1/users', require('./Routes/usuarios'));
app.use('/api/v1/turns', require('./Routes/turnos'));
app.use('/api/v1/list', require('./Routes/listas'));

module.exports = app;
