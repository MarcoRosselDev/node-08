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
      console.log('eliminacion exitosa');
      //mensajes('random text msj', 'error')
      //mensajes('random text msj', 'exito')
    }
  } catch (error) {
    console.log('error en eliminar_tarea fn:', error);
  }
}