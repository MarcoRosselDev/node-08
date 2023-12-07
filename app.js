require('dotenv').config();
const express = require('express');
const app = express();
const connect = require('./db.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const todo_project = require('./router/todo-project.js');
// cookies
app.use(cookieParser())

// pages
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(path.join(__dirname, 'pages', 'login')));
app.use('/registrar', express.static(path.join(__dirname, 'pages', 'registrar')));
app.use('/tareas', express.static(path.join(__dirname, 'pages', 'tareas')));
//app.use('/home', express.static(path.join(__dirname, 'pages', 'home')));
app.use('/cv', express.static(path.join(__dirname, 'pages', 'cv')));

app.use('/api', todo_project);





















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