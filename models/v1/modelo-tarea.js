const mongoose = require('mongoose');

/* 
user_id: id_jwt,
      user_name: nombre_jwt,
      titulo: req.body.titulo,
      contenido: req.body.contenido */

const tarea = new mongoose.Schema({
  user_id: {
    type: String,
    require: true
  },
  user_name: {
    type: String,
    require: true
  },
  titulo:{
    type: String,
    default: 'titulo por defecto'
  },
  contenido:{
    type: String,
    default: 'contenido por defercto',
  }
},
{timestamps: true})

module.exports = mongoose.model('Tarea', tarea);