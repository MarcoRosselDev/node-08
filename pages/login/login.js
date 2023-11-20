const password = document.getElementById('password');
const email = document.getElementById('email');
const login = document.getElementById('login');
import {msjError} from "./msjError.js";
const msjContenedor = document.querySelector('.msj-contenedor')

login.addEventListener('click', async function (e) {
  e.preventDefault();

  try {
    // comprobacion que no esten vacios
    if (email.value.length === 0 || password.value.length == 0) return msjError('Ingresa las credenciales porfavor', msjContenedor)
    const respuesta = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
    if (respuesta.status === 200) {
    const prom = respuesta.json()
    prom.then(async data => { //-----------------------------------------------inicio then
      try {
        const jwtFetch = data.token;
        const cookie = await fetch('/api/crearCookie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            clave: 'jwt',
            valor: jwtFetch
          })
        })
        // este es para trabajo local 
        if (cookie.status === 200) return window.location.href = `http://localhost:3000/tareas/`;
        // return window.location.href = `https://node-08-portfolio.onrender.com/tareas/`;
      } catch (error) {
        console.log('error en crear-cookie', error);
      }
    }) //------------------------------------------------------------------------------------------------- fin .then
    
    } else if (respuesta.status === 404) {
      // usuario no encontrado
      msjError('Credenciales invalidas', msjContenedor);
    }
  } catch (error) {
    console.log(error);
  }
})