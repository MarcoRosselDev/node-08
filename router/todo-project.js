const express = require('express');
const router = express.Router();

// funciones
const { crearCookie, eliminarCookie, obtenerJwtCookie, cookieStyleMode } = require('../controllers/cookies.js');
const { getTarea, postTarea, eliminarTarea, actualizarTarea } = require('../controllers/crear-tareas.js');
const { registrarUsuario, loginUsuario } = require('../controllers/crear-usuario.js');

//middleware especificos para esta ruta
//router.use(funcion_ejemplo)

// api usuario
router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);
// api tareas
router.post('/tarea', postTarea);
router.get('/tarea/:id', getTarea);
router.delete('/tarea/:id', eliminarTarea)
router.put('/tarea/:id', actualizarTarea)

// api cookies
router.post('/crearCookie', crearCookie)
router.get('/getJwtcookie', obtenerJwtCookie)
router.get('/delcookie', eliminarCookie)
router.get('/getStylecookie', cookieStyleMode)

module.exports = router;