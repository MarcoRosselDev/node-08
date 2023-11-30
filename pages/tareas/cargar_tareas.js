import { cargar_estela } from "./cargar-estela.js";
import { cargar_botones } from "./cargar_botones.js";
const main = document.querySelector('main');

export const cargar_tareas = async (jwt, id_usuario) =>{
  try {
    const respuesta = await fetch(`/api/tarea/${id_usuario}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })

    if (respuesta.status === 200) {
      const promesa = respuesta.json();
      promesa.then(objeto_tareas =>{
        // iteramos por el objeto con las tareas lo agregamos al dom
        const div = document.createElement('div');
        div.classList.add('lista-tareas');

        // para no manipular el dom en cada iteracion
        let elemento_final = '';
        objeto_tareas.map(iteracion =>{
          elemento_final += `
          <div class="tarea-individual">
            <p>${iteracion.contenido}</p>
            <!-- user id -->
            <p class="ocultar">${iteracion.user_id}</p>
            <!-- id de la tarea -->
            <p class="ocultar">${iteracion._id}</p>
            <div class="botones-edicion">
              <button class="btn eliminar">eliminar</button>
              <button class="btn editar">editar</button>
            </div>
          </div>`;
        })
        div.innerHTML = elemento_final;
        main.append(div);
        cargar_estela();
        cargar_botones();
      })
    } else {
      console.log('fetch GET fallido, respuesta:', respuesta);
    }
  } catch (error) {
    console.log('error en cargar_tareas fn:', error);
  }
}