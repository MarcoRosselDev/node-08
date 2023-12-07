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

const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_rep = document.getElementById('password-rep');
const enviar = document.querySelector('.enviar')
const msjContenedor = document.querySelector('.msj-contenedor');

// status ---> exitoso | error ---> determinan el color de fondo "rojo o verde"
const msj = (texto, status) => {

  if (msjContenedor.children.length > 1) {
    //console.log(msjContenedor.classList);
    msjContenedor.classList.remove('msj-contenedor-error')
    msjContenedor.classList.remove('msj-contenedor-exitoso')
    msjContenedor.innerHTML = '';
  }

  const p = document.createElement('p');
  const b = document.createElement('button');
  msjContenedor.classList.add(`msj-contenedor-${status}`);
  p.innerText = texto;
  p.classList.add('p-mensaje')
  b.innerText = 'X'
  b.classList.add('x')

  msjContenedor.append(p);
  msjContenedor.append(b);

  const cross = document.querySelector('.x');

  cross.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('cerrar este div');
    msjContenedor.classList.remove('msj-contenedor-error');
    msjContenedor.classList.remove('msj-contenedor-exitoso');
    msjContenedor.innerHTML = '';
  })
}

//msj('test', 'error')

enviar.addEventListener('click', async function (e) {
  e.preventDefault();

  if (nombre.value.length === 0) {
    msj('el campo nombre esta vacio !', 'error')
  } else if (email.value.length ===  0) {
    msj('el campo email esta vacio !', 'error')
  } else if (password.value.length === 0 || password_rep.value.lenght === 0) {
    msj('rellenar los campos passwords por favor !', 'error')
  } else if (password.value !== password_rep.value) {
    msj('los passwords no coinsiden', 'error')
    console.log("los passwords no coinsiden");
  } else {
    try {
      const respuesta = await fetch('/api/registrar', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          nombre: nombre.value,
          email: email.value,
          password: password.value
        })
      })
      if (respuesta.status === 201) {
        nombre.value = '';
        email.value = '';
        password.value = '';
        password_rep.value = '';
        // personalizar msj de usuario creado exitosamente
        if (msjContenedor.children.length > 1) {
          //console.log(msjContenedor.classList);
          msjContenedor.classList.remove('msj-contenedor-error')
          msjContenedor.classList.remove('msj-contenedor-exitoso')
          msjContenedor.innerHTML = '';
        }
      
        const p = document.createElement('p');
        const b = document.createElement('button');
        msjContenedor.classList.add(`msj-contenedor-exitoso`);
        // cambiar en produccion------------------------------------------------------------------------------------
        p.innerHTML = `usuario creado exitosamente, <a href="${URL_PRODUCTION}/login/">ir a login</a>`
        p.classList.add('p-mensaje')
        b.innerText = 'X'
        b.classList.add('x')
      
        msjContenedor.append(p);
        msjContenedor.append(b);
      
        const cross = document.querySelector('.x');
      
        cross.addEventListener('click', function (e) {
          e.preventDefault();
          console.log('cerrar este div');
          msjContenedor.classList.remove('msj-contenedor-error');
          msjContenedor.classList.remove('msj-contenedor-exitoso');
          msjContenedor.innerHTML = '';
        })
      }
      if (respuesta.status === 400) {
        console.log(respuesta);
        const f = respuesta.json();
        f.then(data => {
          console.log(data);
          msj(data.mensajeError, 'error')
        })
      }
    } catch (error) {
      msj(error.message, 'error');
    }
  }
})