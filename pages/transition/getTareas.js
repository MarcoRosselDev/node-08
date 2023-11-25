//const contenedorTareass = document.querySelector('.contenedor-tareas');
// interesante---> no puedo invocar querySelector--> pero si puedo pasarlo como parametro en la funcion
// parea entonces tomarlo de referencia 

export async function getTarea(jwtoken, id, contenedorTareas) {
  try {
    const getTareas = await fetch(`/api/tarea/${id}`, {
      method: 'GET',
      headers:{
        'Authorization': `Bearer ${jwtoken}`,
        'Content-Type': 'application/json'
      }
    })
    if (getTareas.status === 200) {
      const proms = getTareas.json();
      proms.then(data => {
        // la data viene en un arreglo:
        // example
        /* [
          {_id: '6555...', user_id: '6551a...', user_name: 'marco', titulo: 'probando las cookies', contenido: 'guardando la sesión por más un día.'}, 
          {_id: '6555d...', user_id: '6551a...', user_name: 'marco', titulo: 'preparar algo para comer', contenido: 'puede ser una haburgesa con coca cola'},
          {_id: '6555...', user_id: '6551a...', user_name: 'marco', titulo: 'otra cosa 3', contenido: 'asdfasdf 3'}]
        */
        // aplicamos map. para iterar por el arreglo de objetos y agregarlos a un string vacio
        // esto para no manipular el dom en exceso (para mejorar el rendimiento y performance).
        let print = "";
        data.map(i => {
          print += `
          <div class="single-list">
            <div class="info-task">
              <p>${i.titulo}</p>
              <p>${i.contenido}</p>
              <p class="hiden">${i.user_id}</p>
              <p class="hiden">${i._id}</p>
            </div>
            <div class="btn-edit">
              <button id="editar">editar</button>
              <button id="borrar">borrar</button>
            </div>
          </div>
          `
        });
        contenedorTareas.innerHTML = print;// al final solo manipulamos el dom una sola vez con el string final
      })
    } else {
      console.log( `no se obtuvieron tareas, status de la peticion GET = ${getTarea.status}`);
    }
  } catch (error) {
    console.log('error en el try catch de getTarea: -->', error);
  }
}