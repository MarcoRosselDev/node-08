const main = document.querySelector('main');
const header = document.querySelector('header');

const cargarCookie = async () =>{
  try {
    const getCookie = await fetch('/api/get-cookie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })

    console.log(getCookie, 'get cookie log');
    if (getCookie.status === 200) {
      main.innerHTML = `
      <div class="contenedor">
        <div class="form-tarea">
          <p>nueva tarea</p>
          <p>titulo</p>
          <input type="text" id="titulo" placeholder="algo por hacer...">
          <p>contenido</p>
          <input type="text" id="contenido" placeholder="algo por hacer...">
          <button id="tareaBTN">guardar</button>
        </div>
        <div class="contenedor-tareas">
        </div>
      </div>
      `;
      // desde aqui se pueden cargar los elementos para manipular
      const prom = getCookie.json();
      prom.then(async (data) => {
        // para innerHtml dom manipulation
        const tituloV = document.getElementById('titulo');
        const contenidoV = document.getElementById('contenido');
        const contenedorTareas = document.querySelector('.contenedor-tareas');
        const guardar = document.getElementById('tareaBTN');
        const jwtCookie = data.cookie.jwt;

        guardar.addEventListener('click',async function (e) {
          e.preventDefault();
          try {

            const resp = await fetch('/api/tarea', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtCookie}`,
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body:JSON.stringify({
                titulo: tituloV.value,
                contenido: contenidoV.value
              })
            })
            console.log(resp);
            if (resp.status === 201) {
              const promess = resp.json();
              promess.then((data) =>{
                //const contenedorTareas = document.querySelector('contenedor-tareas');
                console.log(data);
                // print dom data
                const div = document.createElement('div');
                div.classList.add('single-list')
                div.innerHTML = `
                <div>
                  <p>${tituloV.value}</p>
                  <p>${contenidoV.value}</p>
                  <p class="hiden">${data.user_id}</p>
                  <p class="hiden">${data._id}</p>
                </div>
                <div class="btn-edit">
                  <button id="editar">editar</button>
                  <button id="borrar">borrar</button>
                </div>
                `;
                contenedorTareas.appendChild(div);
              })
            } else{
              console.log('no se guardo la tarea correctamente');
            }
          } catch (error) {
            console.log(error);
          }
        })

        console.log('data ---> ', data);
        //const jwt = data.cookie.jwt;
        const id = data.id;
        const nombre = data.nombre

        header.innerHTML = `
          <p>header</p>
          <p>Welcome ${nombre}</p>
          <p><a href="http://localhost:3000/login/">logout</a></p>`;

        //console.log(jwt);
        const getTarea = await fetch(`/api/tarea/${id}`, {
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${jwtCookie}`,
            'Content-Type': 'application/json'
          }
        })
        console.log(getTarea);
        if (getTarea.status === 200) {
          const proms = getTarea.json();
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
          console.log('');
        }
      })
    } else {
      main.innerHTML = `
      <div class="contenedor">
        <p>No estas logeado!</p>
        <a href="http://localhost:3000/login">ir a login</a>
      </div>
      `
    }
  } catch (error) {
    console.log(error);
  }
}

cargarCookie();