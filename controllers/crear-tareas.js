const Tarea = require('../models/modelo-tarea.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const key_jwt = process.env.JWT_KEY;

const postTarea = async (req, res) =>{
  try {
    //console.log(req);
    const bearer = req.rawHeaders[1];
    //const jwt_header = bearer.split(' ')[1];
    const jwt_header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    console.log('jwt from header :', jwt_header);
    try {
      const comp_jwt = jwt.verify(jwt_header, key_jwt);
      return comp_jwt;
    } catch (error) {
      res.status(400).json({msj: 'token invalido', err: error})
    }
    //console.log('boolean de comparacion: ', comp_jwt);
    //console.log(req.header.param);
    //console.log(req.header);
    if (comp_jwt === undefined) {
      return res.status(400).json({data: 'laskldjf'})
    }
    res.json({msj:comp_jwt})
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