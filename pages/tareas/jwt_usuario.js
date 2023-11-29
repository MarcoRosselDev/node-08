import { cargar_botones } from "./cargar_botones.js";
import { cargar_tareas } from "./cargar_tareas.js";
import { guardar_tarea } from "./guardar_tarea.js"; // jwt, contenido
import { mensajes } from "./mensajes.js";
const main = document.querySelector('main');

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

      promesa.then(infoCookie => { // inicio .then--------------------------------------------
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
      </div>`;
      // fetch cargar tareas dom
      cargar_tareas(infoCookie.cookie.jwt, infoCookie.id);
      // input.value
      const guardar = document.getElementById('guardar');
      const input_tarea = document.getElementById('input-tarea');
      
      // guardar tarea fn
      guardar.addEventListener('click', function (e) {
        e.preventDefault();
        if (input_tarea.value.length === 0) {
          mensajes('el input esta vacio', 'error')
        } else{
          guardar_tarea(infoCookie.cookie.jwt, input_tarea.value)
          // cargar las fns editar y eliminar btns
          cargar_botones(infoCookie.cookie.jwt);
        }
      })

      })// final .then------------------------------------------------------------------------
      .catch(err => console.log(err)) 
    } else {
      // esto significa que se encontro una cookie pero la respuesta es diferente a la esperada
      // en ese caso trabajar la nueva respuesta
      // por ahora todo sale como se espera
      console.log('status respuesta !== 200:', respuesta);
    }
  } catch (error) {
    console.log('error en la fn jwt_user:', error);
    // esto significa que no tiene un jwt cookie
    // imprimir un mensaje en el dom de ir a logear o registrarse
  }
}