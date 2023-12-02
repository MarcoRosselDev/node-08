import { cargar_botones } from "./cargar_botones.js";
import { mensajes } from "./mensajes.js";

export const guardar_tarea = async (jwt, contenido) => {
  try {
    const respuesta = await fetch('/api/tarea', {
      method: 'POST',
      headers:{
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'contenido': contenido 
      })
    })
    if (respuesta.status === 201) {
      const promesa = respuesta.json();
      promesa.then(data_tarea_guardada => {
        let lista_tareas = document.querySelector('.lista-tareas');

        const nueva_tarea = `
        <div class="tarea-individual">
          <p>${data_tarea_guardada.contenido}</p>
          <!-- user id -->
          <p class="ocultar">${data_tarea_guardada.user_id}</p>
          <!-- id de la tarea -->
          <p class="ocultar">${data_tarea_guardada._id}</p>
          <div class="botones-edicion">
            <button class="btn eliminar">eliminar</button>
            <button class="btn editar">editar</button>
          </div>
        </div>
        `;
        lista_tareas.innerHTML += nueva_tarea;
        cargar_botones(jwt)
        /* const lista_tareas = document.querySelector('.lista-tareas');

        const div = document.createElement('div');
        div.classList.add('tarea-individual')
        div.innerHTML = `
        <p>${data_tarea_guardada.contenido}</p>
        <!-- user id -->
        <p class="ocultar">${data_tarea_guardada.user_id}</p>
        <!-- id de la tarea -->
        <p class="ocultar">${data_tarea_guardada._id}</p>
        <div class="botones-edicion">
          <button class="btn eliminar">eliminar</button>
          <button class="btn editar">editar</button>
        </div>`;
        lista_tareas.innerHTML += div.innerHTML;
        mensajes('tarea guardada con exito', 'exito');
        cargar_botones(jwt, document.querySelectorAll('.eliminar')); */
      })
      /* .then(()=> {
        console.log('guarar tarea ...');
        //setTimeout(()=> location.reload(), 1500)
      }) */
      .catch(err => console.log('error en guardar_tarea catch :', err))

      return 'mensaje from guardar tarea fn';

    } else{
      mensajes('error en guardar_tarea fn', 'error')
      return 'no se guardo nada';
    }

  } catch (error) {
    console.log('error en guardar_tarea fn:', error);
  }
}