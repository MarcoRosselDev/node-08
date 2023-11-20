require('dotenv').config();
const express = require('express');
const app = express();
const connect = require('./db.js');
const path = require('path');
const {registrarUsuario, loginUsuario} = require('./controllers/crear-usuario.js');
const {getTarea, postTarea} = require('./controllers/crear-tareas.js');
const cookieParser = require('cookie-parser');
const {crearCookie, eliminarCookie, obtenerCookie} = require('./controllers/cookies.js');
// cookies
app.use(cookieParser())

// pages
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(path.join(__dirname, 'pages', 'login')));
app.use('/registrar', express.static(path.join(__dirname, 'pages', 'registrar')));
app.use('/tareas', express.static(path.join(__dirname, 'pages', 'tareas')));
app.use('/home', express.static(path.join(__dirname, 'pages', 'home')));

// api usuario
app.post('/api/registrar', registrarUsuario);
app.post('/api/login', loginUsuario);
// api tareas
app.post('/api/tarea', postTarea);
app.get('/api/tarea/:id', getTarea);

// cookie api
app.post('/api/crear-cookie', crearCookie)
app.get('/api/get-cookie', obtenerCookie)
app.get('/api/delcookie', eliminarCookie)






















const url = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

const start = async () =>{
  try {
    await connect(url);
    app.listen(PORT, ()=> console.log(`Escuchando en el puerto ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();