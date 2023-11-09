const NuevoUsuario = require('../models/modelo-usuario.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const key_jwt = process.env.JWT_KEY;

const registrarUsuario = async (req, res) =>{
  try {
    const {nombre, email, password} = req.body; 
    console.log('req body: ', nombre, email, password);
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
      return res.status(400).send(`error en schema model : ${error}`)
    }
    res.status(201).json(usuarioNuevo)
  } catch (error) {
    console.log(error);
    if (error.code === 11000) return res.status(400).json({mensajeError: 'El correo ya se encuentra registrado!'})
    // error 11000 testeado correctamente.
    res.status(400).send(`error en registrar Usuario: ${error}`);
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