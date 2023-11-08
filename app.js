const express = require('express');
const app = express();
const connect = require('./db.js');

const {registrarUsuario} = require('./controllers/crear-usuario.js')

app.use(express.json())

app.get('/', (req, res)=>{
  res.send('Hola mundo !')
})

app.get('/registrar', registrarUsuario)















require('dotenv').config();
const url = process.env.MONGO_URL;

const start = async () =>{
  try {
    await connect(url);
    app.listen(3000, ()=> console.log('Escuchando en el puerto 3000!'))
  } catch (error) {
    console.log(error);
  }
}

start();