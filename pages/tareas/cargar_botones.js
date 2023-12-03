import {eliminar_tarea} from './eliminar_tarea.js'
import { guardar_tarea } from './guardar_tarea.js';
import { mensajes } from './mensajes.js';

//jwt, id_tarea, elem
export const cargar_botones = (jwt) => {
  let botones_eliminar = document.querySelectorAll('.eliminar');
  let botones_editar = document.querySelectorAll('.editar')
  
  botones_eliminar.forEach((btn) =>{
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const elem = this.parentElement.parentElement;
      const id_tarea = this.parentElement.parentElement.children[2].innerText;
      elem.classList.remove('tarea-individual')
      elem.innerHTML = '';

      eliminar_tarea(jwt, id_tarea)
    })
  })

  botones_editar.forEach( btn =>{
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const elem = this.parentElement.parentElement;
      const id_tarea = this.parentElement.parentElement.children[2].innerText;
      const p = this.parentElement.parentElement.children[0].innerText;
      console.log(typeof(p), '?');
      const contenedor = document.querySelector('.contenedor');
      contenedor.innerHTML = `
      <h2>Editar Tarea</h2>
      <p>Modifica la tarea</p>
      <input type="text" class="input-editar"></input>
      <button id="editar-send">Editar</button>
      `;

      const input_editar = document.querySelector('.input-editar');
      const editar_send = document.getElementById('editar-send');
      input_editar.value = p;

      editar_send.addEventListener('click', async function (e) {
        
        e.preventDefault();
        if (input_editar.value.length === 0) {
          mensajes('el input editar esta vacio', 'error')
        } else {
          try {
            console.log(input_editar.value);
            const respuesta = await fetch(`/api/tarea/${id_tarea}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                contenido: input_editar.value
              })
            })
            console.log(respuesta);
            const prom = respuesta.json();
            prom.then(data =>{
              console.log(p);
              //p.innerText = input_editar.value;
              console.log(this.parentElement.parentElement.children);
              console.log(elem);
              elem.children[0].innerText = input_editar.value;
              contenedor.innerHTML = `
              <h2>Editar Tarea</h2>
              <p>Escribe una nueva tarea</p>
              <input type="text" class="input-nueva-tarea" id="input-tarea">
              <button id="guardar" class="btn-guardar-nueva-tarea">guardar</button>
              `;
              mensajes('tarea actualizada con exito', 'exito')
              const guardar = document.getElementById('guardar');
              const input_v = document.getElementById('input-tarea');
  
              guardar.addEventListener('click', function (e) {
                e.preventDefault();
                guardar_tarea(jwt, input_v.value);
              })
              // devolver el input y boton guardar al contenedor
              // aplicar estilos
            })
            .catch(err => console.log(err, 'error en el catch de editar btn'))
          } catch (error) {
            console.log('error en la edicion de la tarea', error);
          }
        }
      })
    })
    }
  )
}





















































/* import {eliminar_tarea} from './eliminar_tarea.js'

export const cargar_botones = (jwt) => {

  let botones_eliminar = document.querySelectorAll('.eliminar');
  let botones_editar = document.querySelectorAll('.editar');

  botones_eliminar.forEach(iteracion =>{
    iteracion.addEventListener('click', function (e) {
      e.preventDefault();
      //console.log(this.parentElement.parentElement);
      const id_tarea = this.parentElement.parentElement.children[2].innerText;
      const elem_tarea = this.parentElement.parentElement;
      eliminar_tarea(jwt, id_tarea, elem_tarea)
    })
  })

  botones_editar.forEach(iteracion =>{
    iteracion.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('editar btn clickd');
      const id_tarea = this.parentElement.parentElement.children[2].innerText;
      console.log(id_tarea);
      console.log('jwt from cargar_botones fn', jwt);
      // funcionalidad de editar tarea
    })
  })
} */