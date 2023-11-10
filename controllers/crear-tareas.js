const Tarea = require('../models/modelo-tarea.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const key_jwt = process.env.JWT_KEY;

const postTarea = async (req, res) =>{
  try {
    // sacar jwt del header
    const bearer = req.rawHeaders[1];
    const jwt_header = bearer.split(' ')[1];
    // verificar y sacar la info del jwt
    const jwt_info = jwt.verify(jwt_header, key_jwt);
    const {nombre:nombre_jwt, id:id_jwt} = jwt_info;
    // crear tarea con esta info
    const nuevaTarea = await new Tarea({
      user_id: id_jwt,
      user_name: nombre_jwt,
      titulo: req.body.titulo,
      contenido: req.body.contenido
    });
    await nuevaTarea.save();

    res.status(201).json({msj: nuevaTarea})
  } catch (error) {
    res.status(401).json({errorMesaje: `${error}`})
  }
}

const getTarea = async (req, res) =>{
  try {
    console.log('get Tarea');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  postTarea,
  getTarea
}