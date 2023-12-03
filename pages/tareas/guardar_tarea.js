import { cargar_botones } from "./cargar_botones.js";
import { mensajes } from "./mensajes.js";

export const guardar_tarea = async (jwt, contenido) => {
  if (contenido.length === 0) {
    mensajes('el input esta vacio', 'error')
  } else {
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
          mensajes('tarea guardada con exito', 'exito')
          cargar_botones(jwt)
        })
        .catch(err => console.log('error en guardar_tarea catch :', err))
      } else{
        mensajes('error en guardar_tarea fn', 'error')
      }
    } catch (error) {
      console.log('error en guardar_tarea fn:', error);
    }
  }
}