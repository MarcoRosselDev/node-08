const mongoose = require('mongoose');

const tarea = new mongoose.Schema({
  user_id: {
    type: String,
    require: true
  },
  user_name: {
    type: String,
    require: true
  },
  contenido:{
    type: String,
    default: 'contenido por defercto',
  }
},
{timestamps: true})

module.exports = mongoose.model('Tarea', tarea);