const mongoose = require('mongoose');

const tarea = new mongoose.Schema({
  user_id: {
    type: String,
    require: true
  },
  contenido:{
    type: String,
    default: 'contenido por defercto',
  },
  titulo:{
    type: String,
    default: 'titulo por defecto'
  }
},
{timestamps: true})

module.exports = mongoose.model('Tarea', tarea);