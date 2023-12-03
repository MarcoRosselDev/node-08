const Tarea = require('../models/modelo-tarea.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const key_jwt = process.env.JWT_KEY;

const postTarea = async (req, res) =>{
  try {
    // sacar jwt del header
    //console.log(req);
    const token = req.cookies.jwt;
    // verificar y sacar la info del jwt
    const jwt_info = jwt.verify(token, key_jwt);
    const {nombre:nombre_jwt, id:id_jwt} = jwt_info;
    // crear tarea con esta info
    const nuevaTarea = new Tarea({
      user_id: id_jwt,
      user_name: nombre_jwt,
      titulo: req.body.titulo,
      contenido: req.body.contenido
    });
    await nuevaTarea.save();

    res.status(201).json(nuevaTarea)
  } catch (error) {
    res.status(401).json({errorMesaje: error})
  }
}

const getTarea = async (req, res) =>{
  try {
    const token = req.cookies.jwt;
    const auth = jwt.verify(token, key_jwt);// retorna info encriptado  == { nombre: 'eduardo', id: '6553098c77778b04f9eb864a', iat: 1700752162 }
    // si el token es invalido se lase al catch

    // req.params = { id: '654bd7aad86f68328fdd8820' } from /api/v1/tarea/:id
    const tareas = await Tarea.find({user_id: req.params.id})
    if (!tareas) return res.status(404).json({msj: "no se encontraron tareas"})
    res.status(200).json(tareas)
  } catch (error) {
    console.log(error.message);
    if (error.message === "invalid token") return res.status(401).json({msj:"token invalido, por favor logeate denuevo."})
    // redireccionar al login puede ser?
    res.status(400).json({errorMesaje: error})
    // para trabajar con el objecto error tenemos a disposicion >
    //  error.name --> JwtMessajeError, o algo por el estilo
    //  error.message --> invalid token, 
    //  error.stack---> todo junto,
  }
}

const eliminarTarea = async (req, res) =>{
  try {
    // verificamos el jwt de la cookie con la llave .env
    const token = req.cookies.jwt;
    const a = jwt.verify(token, key_jwt);
    console.log(a);
    // peticion delete a mongodb
    console.log(req.params.id);
    const tareaDel = await Tarea.findOneAndDelete({ _id: req.params.id });
    // podriamos incluir mas info como el id del usuario extraido del jwt<---
    // console.log(tareaDel);
    if (!tareaDel) return res.status(404).json({msj: 'No se elimino la tarea'})

    res.status(200).json({msj: 'tarea eliminada exitosamente'})
  } catch (error) {
    console.log(error.message);
    res.status(404).json({msj: error.message})
  }
}

const actualizarTarea = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const a = jwt.verify(token, key_jwt);
    const p_nuevo = req.body.contenido;

    const id_tarea = req.params.id;
    const tarea = await Tarea.findOneAndUpdate({_id: id_tarea}, {contenido: p_nuevo }, { new: true })

    if (!tarea) {
      return res.status(404).json({msj: 'no se actualizo'})
    } else {
      return res.status(201).json(tarea)
    }

  } catch (error) {
    console.log(error.message);
    res.status(404).json({msj: error.message})
  }
}

module.exports = {
  postTarea,
  getTarea,
  eliminarTarea,
  actualizarTarea
}