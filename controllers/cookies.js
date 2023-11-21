const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_KEY = process.env.JWT_KEY;

const crearCookie = (req, res) =>{
  const {clave, valor} = req.body;
  //console.log(clave, valor);
  res.cookie(clave, valor, { maxAge: 172800000 * 15, httpOnly: true }).json({msj: `cookie: ${clave} ${valor} creada`})
  // maxAge equivale a 48 horas = 2 dias.
}

const obtenerJwtCookie = (req, res) => {
  const cookie = req.cookies;
  const info = jwt.verify(cookie.jwt, JWT_KEY)
  const {nombre, id} = info
  res.cookie().json({
    nombre: nombre,
    id: id,
    cookie: cookie
  })
}

const cookieStyleMode = (req, res) =>{
  const lightDark = req.cookies.mode;
  if (req.cookies.mode === undefined) return res.status(404).json({msj : 'No se encuentra la cookie mode'})
  res.status(200).cookie().json({
    mode: lightDark
  })
}

const eliminarCookie = (req, res) => {
  // res.clearCookie( <clave de la cookie> )
  res.clearCookie("jwt").end();
  // si no aplico el .end() se queda esperando <--- ojo
}

module.exports = {
  crearCookie,
  obtenerJwtCookie,
  eliminarCookie,
  cookieStyleMode
}