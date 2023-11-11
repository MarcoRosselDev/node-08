const crearCookie = (req, res) =>{
  // res.cookie('clave', 'valor', {opciones})
  const {clave, valor} = req.body;
  res.cookie(clave, valor).json({msj: `cookie: ${clave} ${valor} creada`})
}

const obtenerCookie = (req, res) => {
  const cookie = req.cookies;
  console.log('cookie req : ', cookie);
  res.cookie().json({cookie})
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