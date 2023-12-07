import { cargar_estela } from "./cargar-estela.js";
import { cargar_tareas } from "./cargar_tareas.js";
import { logout_fn } from "./logout_fn.js";
const main = document.querySelector('main');
require('dotenv').config();
const URL_PRODUCTION = process.env.URL_PRODUCTION;

export const jwt_user = async () =>{
  try {
    const respuesta = await fetch('/api/getJwtCookie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (respuesta.status === 200) {
      const promesa = respuesta.json();

      promesa.then( infoCookie => { // inicio .then--------------------------------------------
      // invocar la fn logout ---------------------------
      main.innerHTML = `
      <div class="estela evento"></div>
      <div class="contenedor ">
        <h2>Hola ${infoCookie.nombre}</h2>
        <p>Escribe una nueva tarea</p>
        <input type="text" class="input-nueva-tarea" id="input-tarea">
        <button id="guardar" class="btn-guardar-nueva-tarea">guardar</button>
      </div>
      <div class="mensajes-fetch">
      </div>
      <div class="lista-tareas">
      </div>
      `;
      // fetch cargar tareas dom
      cargar_tareas(infoCookie.cookie.jwt, infoCookie.id);
      // input.value
      })// final .then------------------------------------------------------------------------
      .then(()=>{
      const directorio = document.querySelector('.directorio');
      directorio.children[1].innerHTML = '<p class="logout-btn">logout</p>';
      const eliminar_elemento = directorio.children[2];
      directorio.removeChild(eliminar_elemento);

      const logout = document.querySelector('.logout-btn');
      logout.addEventListener('click', function (e) {
        e.preventDefault();
        logout_fn();
      })
      })
      .catch(err => console.log(err))
    } else {
      // esto significa que se encontro una cookie pero la respuesta es diferente a la esperada
      // en ese caso trabajar la nueva respuesta
      // por ahora todo sale como se espera
      main.innerHTML = `
      <div class="estela evento"></div>
      <div class="contenedor ">
        <h2>No estas logeado</h2>
        <p>por favor <a href="${URL_PRODUCTION}/login/">ir a login</a> o <a href="${URL_PRODUCTION}/registrar/">crea una cuenta</a></p>
      </div>
      `;
      cargar_estela()
      console.log('status respuesta !== 200:', respuesta);
    }
  } catch (error) {
    console.log('error en la fn jwt_user:', error);
    // esto significa que no tiene un jwt cookie
    // imprimir un mensaje en el dom de ir a logear o registrarse
  }
}