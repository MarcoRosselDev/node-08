import { mensajes } from "./mensajes.js";

export const eliminar_tarea = async (jwt, id_tarea) =>{
  try {
    const respuesta = await fetch(`/api/tarea/${id_tarea}`, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
    if (respuesta.status === 200) {
      // elimnar el elem del dom
      mensajes('eliminacion exitosa', 'exito');
/*       elem.innerHTML = '';
      elem.classList.remove('tarea-individual'); */
    } else{
      mensajes('no se elimino', 'error')
      console.log(respuesta);
      console.log(respuesta.status);
    }
  } catch (error) {
    console.log('error en eliminar_tarea fn:', error);
  }
}