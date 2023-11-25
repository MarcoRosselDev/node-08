const toggleBtn = document.querySelector('.toggleBtn');
const links = document.querySelectorAll('.links');
const directorio = document.querySelector('.directorio');
const estela = document.querySelector('.estela');
const event = document.querySelector('.event');

toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();

  links.forEach(i => i.classList.toggle('linksTgl'));
  directorio.classList.toggle('directorioTgl');
  estela.classList.toggle('estelaTgl');
})

event.addEventListener('click', function (e) {
  e.preventDefault();
  
  links.forEach(i => i.classList.toggle('linksTgl'));
  directorio.classList.toggle('directorioTgl');
  estela.classList.toggle('estelaTgl');
})

/* fn error msj*/
const msj = (texto, status) => {

  if (msjContenedor.children.length > 1) {
    // eliminamos el mensaje previo si es que existe
    msjContenedor.classList.remove('msj-contenedor-error')
    msjContenedor.classList.remove('msj-contenedor-exitoso')
    msjContenedor.innerHTML = '';
  }
  // si esta vacio lo creamos
  const p = document.createElement('p');
  const b = document.createElement('button');
  msjContenedor.classList.add(`msj-contenedor-${status}`);
  p.innerText = texto;
  p.classList.add('p-mensaje')
  b.innerText = 'X'
  b.classList.add('x')

  msjContenedor.append(p);
  msjContenedor.append(b);

  // funcionalidad del boton cerrar mensaje
  const cross = document.querySelector('.x');
  cross.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('cerrar este div');
    msjContenedor.classList.remove('msj-contenedor-error');
    msjContenedor.classList.remove('msj-contenedor-exitoso');
    msjContenedor.innerHTML = '';
  })
}



/* const password = document.getElementById('password');
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
}) */
