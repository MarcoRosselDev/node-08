const Tarea = require('../models/modelo-tarea.js');

const postTarea = async (req, res) =>{
  try {
    //console.log(req);
    const bearer = req.rawHeaders[1];
    const jwt = bearer.split(' ')[1];
    console.log(jwt);
    //console.log(req.header.param);
    //console.log(req.header);
    res.json({msj:'data'})
  } catch (error) {
    console.log(error);
  }
}

const getTarea = async (req, res) =>{
  try {
    console.log('get Tarea');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  postTarea,
  getTarea
}