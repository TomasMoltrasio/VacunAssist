const userService = {};
const User = require('../models/Usuario');
const urlBase = 'https://hhvur3txna.execute-api.sa-east-1.amazonaws.com/dev';
const axios = require('axios');

userService.getUser = async (req, res) => {
  const user = await User.find({ dni: Number(req.params.id) });
  res.json(user);
};

userService.createUser = async (req, res) => {
  const user = await User.find({ dni: Number(req.body.dni) });
  if (user.length !== 0) {
    res.status(500).send('El DNI ya esta registrado');
  } else {
    const data = {
      dni: req.body.dni,
      tramite: req.body.tramite,
      sexo: req.body.sexo,
    };
    const headers = {
      'Content-Type': 'application/json',
      'X-Api-Key': 'kTKtFQmwC01y0wdgE93Mn3bOhWYgt7Ty4KY3yZsU',
    };
    try {
      const response = await axios.post(
        `${urlBase}/person/validate`,
        JSON.stringify(data),
        {
          headers: headers,
        }
      );
      const newUser = new User({
        rol: req.body.rol || 0,
        nombre: response.data.nombre || ' ',
        apellido: response.data.apellido,
        dni: req.body.dni,
        fechaNacimiento: response.data.fechaNacimiento,
        email: req.body.email,
        vacunatorio: Number(req.body.vacunatorio),
        riesgo: req.body.riesgo,
        vacunatorioTrabajo: req.body.vacunatorioTrabajo || 0,
      });
      await newUser.save();
      res.json('Usuario creado');
    } catch (error) {
      res.status(500).send('Los datos estan mal');
    }
  }
};

userService.updateUser = async (req, res) => {
  const user = await User.find({ dni: Number(req.params.id) });
  const newUser = {
    email: req.body.email || user[0].email,
    vacunatorio: Number(req.body.vacunatorio) || user[0].vacunatorio,
    vacunatorioTrabajo:
      Number(req.body.vacunatorioTrabajo) || user[0].vacunatorioTrabajo,
    riesgo: req.body.riesgo || user[0].riesgo,
  };
  await User.findOneAndUpdate({ dni: Number(req.params.id) }, newUser);
  res.json(user);
};

userService.deleteUser = async (req, res) => {
  await User.findOneAndDelete(req.params.id);
  res.json('Usuario eliminado');
};

module.exports = userService;
