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
    match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido'] // <- Validación regexp para correo
  },
  password:{
    type: String,
    require: true
  }
},
{timestamps: true})
module.exports = mongoose.model('NuevoUsuario', nuevoUsuario);