const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_KEY = process.env.JWT_KEY;

const crearCookie = (req, res) =>{
  // res.cookie('clave', 'valor', {opciones})
  const {clave, valor} = req.body;
  res.cookie(clave, valor, { expires: new Date(Date.now() + 900000), httpOnly: true })
}

const obtenerCookie = (req, res) => {
  const cookie = req.cookies;
  const info = jwt.verify(cookie.jwt, JWT_KEY)
  const {nombre, id} = info
  res.cookie().json({
    nombre: nombre,
    id: id,
    cookie: cookie
  })
}

const eliminarCookie = (req, res) => {
  // res.clearCookie( <clave de la cookie> )
  res.clearCookie("jwt").json({msj: `cookie eliminada`})
}


module.exports = {
  crearCookie,
  obtenerCookie,
  eliminarCookie
}