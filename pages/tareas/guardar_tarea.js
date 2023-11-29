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
      mensajes('tarea guardada con exito', 'exito');
      // imprimir un mensaje de exito
    } else{
      mensajes('error en guardar_tarea fn', 'error')
    }

  } catch (error) {
    console.log('error en guardar_tarea fn:', error);
  }
}