const password = document.getElementById('password');
const email = document.getElementById('email');
const login = document.getElementById('login');
import {msjError} from "./msjError.js";
const msjContenedor = document.querySelector('.msj-contenedor')

login.addEventListener('click', async function (e) {
  e.preventDefault();

  try {
    console.log(email.value.length);
    console.log(password.value.length);
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
      console.log(respuesta);
      if (respuesta.status === 200) {
        const prom = respuesta.json()
        prom.then(async data => {
          try {
            const jwtFetch = data.token;
            const cookie = await fetch('/api/crear-cookie', {
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

            console.log(cookie, 'cookie despues del fetch');
            if (cookie.status === 200) {
              // redireccionar a las tareas de este usuario
              
              // window.location.href = `http://localhost:3000/tarea/${data.userInfo._id}`
              // este es para trabajo local 
              window.location.href = `http://localhost:3000/tareas/`
              //window.location.href = `https://node-08-portfolio.onrender.com/tareas/`
            } else{
              console.log(cookie);
            }

          } catch (error) {
            console.log('error en fetch cookie', error);
          }
          console.log(data)
        })
      } else if (respuesta.status === 404) {
        // usuario no encontrado
        msjError('Credenciales invalidas', msjContenedor);
      }
  } catch (error) {
    console.log(error);
  }
})