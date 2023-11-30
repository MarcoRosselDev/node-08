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
        const lista_tareas = document.querySelector('.lista-tareas');

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
        lista_tareas.append(div);
        cargar_botones();
        mensajes('tarea guardada con exito', 'exito');
      })
    } else{
      mensajes('error en guardar_tarea fn', 'error')
    }

  } catch (error) {
    console.log('error en guardar_tarea fn:', error);
  }
}