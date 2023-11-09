const mongoose = require('mongoose');

const nuevoUsuario = new mongoose.Schema({
  nombre: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password:{
    type: String,
    require: true
  }
},
{timestamps: true})
module.exports = mongoose.model('NuevoUsuario', nuevoUsuario);