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
          <input type="text" id="tarea" placeholder="algo por hacer...">
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
        const conenedorTareas = document.querySelector('contenedor-tareas');

        console.log('data ---> ', data);
        const jwt = data.cookie.jwt;
        const id = data.id;
        const nombre = data.nombre

        header.innerHTML = `
          <p>header</p>
          <p>Welcome ${nombre}</p>
          <p>logout</p>`;

        console.log(jwt);
        console.log(`buenos dias ${nombre}`);
        const getTarea = await fetch(`/api/tarea/${id}`, {
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
          }
        })
        console.log(getTarea);
        if (getTarea.status === 200) {
          const proms = getTarea.json();
          proms.then(data => console.log(data))
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

// extraer la informacion de la cookie para saludar
// hola... username

// cargar input y button de nueva tarea

// realizar un fetch GET  de las tareas del usuario
// cargar en el dom