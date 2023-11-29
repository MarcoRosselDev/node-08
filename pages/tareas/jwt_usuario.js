import { cargar_estela } from "./cargar-estela.js";
import { cargar_tareas } from "./cargar_tareas.js";
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
      cargar_tareas(infoCookie.cookie.jwt, infoCookie.id)
      })
    }
  } catch (error) {
    console.log('error en la fn jwt_user:', error);
  }
}