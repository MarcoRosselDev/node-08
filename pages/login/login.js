const toggleBtn = document.querySelector('.toggleBtn');
const links = document.querySelectorAll('.links');
const directorio = document.querySelector('.directorio');
const estela = document.querySelector('.estela');
const event = document.querySelector('.event');
require('dotenv').config();
const URL_PRODUCTION = process.env.URL_PRODUCTION;

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
const msjContenedor = document.querySelector('.msj-contenedor');

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
    msjContenedor.classList.remove('msj-contenedor-error');
    msjContenedor.classList.remove('msj-contenedor-exitoso');
    msjContenedor.innerHTML = '';
  })
}


const password = document.getElementById('password');
const email = document.getElementById('email');
const login = document.getElementById('login');

login.addEventListener('click', async function (e) {
  e.preventDefault();

  if (email.value.length === 0) {
    msj('El campo email esta vacio', 'error'); 
  } else if (password.value.length === 0) {
    msj('El campo password esta vacio', 'error');
  } else {
    try {
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
          if (cookie.status === 200) return window.location.href = `${URL_PRODUCTION}/tareas/`;
          // return window.location.href = `https://node-08-portfolio.onrender.com/tareas/`;
        } catch (error) {
          console.log('error en crear-cookie', error);
        }
      }) //------------------------------------------------------------------------------------------------- fin .then
      
      } else if (respuesta.status === 404) {
        // usuario no encontrado
        msj('Credenciales invalidas', 'error');
        // aqui deveriamos aplicar un conteo de intentos
        // para restringir la ip si realiza intentos sospechosos o muchos intentos

        // por ahora podrimaos hacer lo siguiente
        /* version vasica de restriccion
        
        1.  contar los intentos y incluirlos en un objeto o array
        2.  enviar un mensaje de numero de intentos disponibles
        3.  si supero el numero de intentos crear una cookie de restriccion
        4.  incluir esta cookie en la parte superior de la pagina y no permitir realizar fetch's si existe esta cookie en el navegador
        5.  las cookies pueden vivir asta 400 dias
        6.  problema---> vasta con que el usuario limpie el navegador y podra intentarlo denuevo.
        
        */
      }
    } catch (error) {
      console.log(error);
      msj(`${error}`, 'error')
    }
  }
})

