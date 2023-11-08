const NuevoUsuario = require('../models/modelo-usuario.js');

const registrarUsuario = async (req, res) =>{
  try {
    const {nombre, email, password} = req.body; 
    console.log('req body: ', nombre, email, password);
    // antes de guardar necesitamos enctyptar la contrase;a
    const usuarioNuevo = await new NuevoUsuario(req.body)
    await usuarioNuevo.save();

    if (!usuarioNuevo) {
      return res.status(400).send(`error en schema model : ${error}`)
    }
    res.status(201).json(usuarioNuevo)
  } catch (error) {
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
} */

module.exports = {
  registrarUsuario
};