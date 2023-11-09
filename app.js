const express = require('express');
const app = express();
const connect = require('./db.js');
const path = require('path');


const {registrarUsuario, loginUsuario} = require('./controllers/crear-usuario.js')

app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/tareas', express.static(path.join(__dirname, 'pages', 'tareas')))

app.get('/registrar', registrarUsuario)
app.post('/login', loginUsuario)














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