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
      // imprimir un mensaje de exito
    }

  } catch (error) {
    console.log('error en guardar_tarea fn:', error);
  }
}