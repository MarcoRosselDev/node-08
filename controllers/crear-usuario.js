const NuevoUsuario = require('../models/modelo-usuario.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const key_jwt = process.env.JWT_KEY;

const registrarUsuario = async (req, res) =>{
  try {
    const {nombre, email, password} = req.body;
    // antes de guardar necesitamos enctyptar la contrase;a
    const passwordCrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    const obj = {
      nombre: nombre,
      email: email,
      password: passwordCrypt
    }
    const usuarioNuevo = await new NuevoUsuario(obj)
    await usuarioNuevo.save();

    if (!usuarioNuevo) {
      return res.status(400).json(`error en schema model : ${error}`)
    }
    res.status(201).send('Usuario creado exitosamente!');
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({mensajeError: 'El correo ya se encuentra registrado!'})
    if (error._message === 'NuevoUsuario validation failed') return res.status(400).json({mensajeError: 'Por favor ingrese un correo valido'})
    res.status(400).json({mensajeError: error.message});
  }
}

const loginUsuario = async (req, res) => {
  try {
    //const {email, password} = req.body;
    const user = await NuevoUsuario.findOne({email: req.body.email})
    if (!user) return res.status(404).json({msj: 'No se encontraros usuarios registardos!'})
    // comparar pass crypt
    const comprobacion = await bcrypt.compare(req.body.password, user.password)
    
    if (!comprobacion) return res.status(401).json({mensaje: "No estas autorizado, pass incorrecta!"})

    const jwt_user = jwt.sign({
      nombre: user.nombre,
      id: user._id
    }, key_jwt) 
    res.status(200).json({
      userInfo: {
        _id: user._id,
        nombre: user.nombre,
        email: user.email
      },
      token: jwt_user
    })
  } catch (error) {
    res.status(400).send(`error en login Usuario: ${error}`);
  }
}

module.exports = {
  registrarUsuario,
  loginUsuario
};