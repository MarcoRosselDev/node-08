import {eliminar_tarea} from './eliminar_tarea.js'

//jwt, id_tarea, elem
export const cargar_botones = (jwt) => {
  let botones = document.querySelectorAll('.eliminar');
  
  botones.forEach((btn) =>{
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const elem = this.parentElement.parentElement;
      console.log(elem);
      const id_tarea = this.parentElement.parentElement.children[2].innerText;
      console.log(id_tarea);
      console.log(EventTarget.parentElement);
      elem.classList.remove('tarea-individual')
      elem.innerHTML = '';

      eliminar_tarea(jwt, id_tarea, elem)
    })
  })
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