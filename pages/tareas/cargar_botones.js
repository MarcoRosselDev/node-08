import {eliminar_tarea} from './eliminar_tarea.js'

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

  const input = document.getElementById('input-tarea');
  const guardar = document.getElementById('guardar');

  botones_editar.forEach( btn =>{
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const elem = this.parentElement.parentElement;
      const id_tarea = this.parentElement.parentElement.children[2].innerText;
      const p = this.parentElement.parentElement.children[0].innerText;
        
      //console.log(p);
      input.value = p
      //console.log(input.value);
      guardar.classList.remove('btn-guardar-nueva-tarea')
      guardar.innerText = 'editar';

      // try catch editar
      // if success

      guardar.addEventListener('click', async function (e) {
        e.preventDefault();
        try {
          const respuesta = await fetch(`/api/tarea/${id_tarea}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${jwt}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              contenido: input.value
            })
          })
          console.log(respuesta);
          const prom = respuesta.json();
          prom.then(data =>{
            console.log(p);
            p.innerText = data.contenido;
            guardar.classList.add('btn-guardar-nueva-tarea')
            guardar.innerText = 'guardar'
          })
        } catch (error) {
          console.log('error en la edicion de la tarea', error);
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