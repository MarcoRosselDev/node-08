export const eliminar_tarea = async (id_tarea, jwt) =>{
  try {
    const respuesta = await fetch(`/api/tarea/${id_tarea}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'Aplication/json'
      }
    })
    if (respuesta.status === 200) {
      // elimnar el elem del dom
      console.log('eliminacion exitosa');
    }
  } catch (error) {
    console.log('error en eliminar_tarea fn:', error);
  }
}