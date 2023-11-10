const express = require('express');
const app = express();
const connect = require('./db.js');
const path = require('path');
const {registrarUsuario, loginUsuario} = require('./controllers/crear-usuario.js');
const {getTarea, postTarea} = require('./controllers/crear-tareas.js');
const cookieParser = require('cookie-parser');

// cookies
app.use(cookieParser())

// pages
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(path.join(__dirname, 'pages', 'login')));
app.use('/registrar', express.static(path.join(__dirname, 'pages', 'registrar')));
app.use('/tareas', express.static(path.join(__dirname, 'pages', 'tareas')));

// api usuario
app.get('/api/registrar', registrarUsuario);
app.post('/api/login', loginUsuario);
// api tareas
app.post('/api/tarea', postTarea);
app.get('/api/tarea/:id', getTarea);

// cookie api
app.get('/api/set-cookie', (req, res) =>{
  // res.cookie('clave', 'valor', {opciones})
  res.cookie()
})
app.get('/api/get-cookie', (req, res) => {
  res.cookie()
})
app.get('/api/del-cookie', (req, res) =>{
  res.cookie()
})





















require('dotenv').config();
const url = process.env.MONGO_URL;

const start = async () =>{
  try {
    await connect(url);
    app.listen(3000, ()=> console.log('Escuchando en el puerto 3000!'));
  } catch (error) {
    console.log(error);
  }
};

start();