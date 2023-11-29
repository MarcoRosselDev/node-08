import {eliminar_tarea} from './eliminar_tarea.js'

export const cargar_botones = (jwt) => {
  const botones = document.querySelectorAll('.eliminar');
  botones.forEach(iteracion =>{
    iteracion.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('eliminar clicked');
      //console.log(this.parentElement.parentElement);
      const id_tarea = this.parentElement.parentElement.children[2].innerText;
      eliminar_tarea(jwt, id_tarea)
    })
  })
}