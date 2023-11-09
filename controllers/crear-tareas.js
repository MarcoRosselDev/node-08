const Tarea = require('../models/modelo-tarea.js');

const postTarea = async (req, res) =>{
  try {
    console.log(req.authorizartion);
    console.log('post tarea');
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