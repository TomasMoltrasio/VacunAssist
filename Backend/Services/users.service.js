const userService = {};
const User = require('../models/Usuario');
const urlBase = 'https://hhvur3txna.execute-api.sa-east-1.amazonaws.com/dev';
const axios = require('axios');

userService.logIn = async (req, res) => {
  const data = {
    dni: req.params.id,
    tramite: req.body.tramite,
    sexo: req.body.sexo,
  };
  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': 'kTKtFQmwC01y0wdgE93Mn3bOhWYgt7Ty4KY3yZsU',
  };
  const user = await User.findOne({ dni: req.params.dni });
  if (user !== undefined) {
    try {
      const response = await axios.post(
        `${urlBase}/person/validate`,
        JSON.stringify(data),
        {
          headers: headers,
        }
      );
      const user = await User.findOne({ dni: response.data.numeroDocumento });
      res.json(user);
    } catch (error) {
      res.status(500).send('Los datos ingresados son incorrectos');
    }
  } else {
    res.status(500).send('El usuario no existe');
  }
};

userService.getUser = async (req, res) => {
  const user = await User.findOne({ dni: req.params.id });
  if (user !== undefined) {
    res.json(user);
  } else {
    res.status(500).send('El usuario no existe');
  }
};

userService.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

userService.createUser = async (req, res) => {
  const user = await User.find({ dni: Number(req.body.dni) });
  if (user.length !== 0) {
    res.status(500).send('El DNI ingresado esta actualmente registrado');
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
      res.status(500).send('Los datos ingresados son incorrectos');
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
    riesgo: req.body.riesgo === null ? user[0].riesgo : req.body.riesgo,
    rol: req.body.rol || user[0].rol,
  };
  await User.findOneAndUpdate({ dni: Number(req.params.id) }, newUser);
  const resUser = await User.findOne({ dni: Number(req.params.id) });
  res.json(resUser);
};

userService.deleteUser = async (req, res) => {
  await User.findOneAndDelete({ dni: req.params.id });
  res.json('Usuario eliminado');
};

userService.getUserNoRegister = async (req, res) => {
  const getEdad = (fecha) => {
    let hoy = new Date();
    let fechaNacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (
      diferenciaMeses < 0 ||
      (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
    ) {
      edad--;
    }
    return edad;
  };
  const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': 'kTKtFQmwC01y0wdgE93Mn3bOhWYgt7Ty4KY3yZsU',
  };
  try {
    const { data } = await axios.post(
      `${urlBase}/person/lookup`,
      {
        dni: req.params.id,
      },
      { headers: headers }
    );
    const edad = getEdad(data.fechaNacimiento);
    const user = {
      nombre: data.nombre,
      apellido: data.apellido,
      edad: edad,
    };
    await res.json(user);
  } catch (error) {
    res.status(500).send('El dni no existe');
  }
};

module.exports = userService;
