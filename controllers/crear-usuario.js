const NuevoUsuario = require('../models/modelo-usuario.js');
const bcrypt = require('bcryptjs');

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

/* output:
{
    "nombre": "marco",
    "email": "marco@gmail.com",
    "password": "qwe",
    "_id": "654bd45848b4e6b239da7df3",
    "__v": 0

    nuevo output con password encryptado:
    {
    "nombre": "marco",
    "email": "example@gmail.com",
    "password": "$2a$10$h705v.XUd07CwWgppGOQ7.Sd0NyzjVCNA/6kzxVxvCy6ZWrRdfwBu",
    "_id": "654bd7aad86f68328fdd8820",
    "__v": 0
}
  } */

module.exports = {
  registrarUsuario
};