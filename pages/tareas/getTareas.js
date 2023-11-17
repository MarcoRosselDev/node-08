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
    console.log(getTareas);
    if (getTareas.status === 200) {
      const proms = getTareas.json();
      proms.then(data => {
        console.log('we are in get tareas', contenedorTareas);
        let print = "";
        console.log('data:--->', data);
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
        contenedorTareas.innerHTML = print;
      })
    } else {
      console.log('no se obtuvieron tareas');
    }
  } catch (error) {
    console.log('error en el try catch de getTarea:', error);
  }
}