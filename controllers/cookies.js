const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_KEY = process.env.JWT_KEY;

const crearCookie = (req, res) =>{
  // res.cookie('clave', 'valor', {opciones})
  const {clave, valor} = req.body;
  res.cookie(clave, valor, { maxAge: 172800000, httpOnly: true }).json({msj: `cookie: ${clave} ${valor} creada`})
  // maxAge equivale a 48 horas = 2 dias.
  // 1 --- me gustaria guardar una cookie sobre las preferencias de usuario como idioma y modo nocturno
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
  res.clearCookie("jwt").end();
  // si no aplico el .end() se queda esperando <--- ojo
}

module.exports = {
  crearCookie,
  obtenerCookie,
  eliminarCookie
}