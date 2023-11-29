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
      promesa.then(infoCookie =>{
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
      cargar_tareas(infoCookie.cookie.jwt, infoCookie.id);
      const guardar = document.getElementById('guardar');
      const input_tarea = document.getElementById('input-tarea');
      guardar.addEventListener('click', function (e) {
        e.preventDefault();
        if (input_tarea.value.length === 0) {
          mensajes('el input esta vacio', 'error')
        } else{
          guardar_tarea(infoCookie.cookie.jwt, input_tarea.value)
        }
      })
      })
    }
  } catch (error) {
    console.log('error en la fn jwt_user:', error);
  }
}