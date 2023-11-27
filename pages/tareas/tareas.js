const main = document.querySelector('main');

const cargarEstela = ()=> {
  const toggleBtn = document.querySelector('.toggleBtn');
  const links = document.querySelectorAll('.links');
  const directorio = document.querySelector('.directorio');
  const estela = document.querySelector('.estela');
  const evento = document.querySelector('.evento');

  toggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    links.forEach(i => i.classList.toggle('linksTgl'));
    directorio.classList.toggle('directorioTgl');
    estela.classList.toggle('estelaTgl');
  })

  evento.addEventListener('click', function (e) {
    e.preventDefault();
    links.forEach(i => i.classList.toggle('linksTgl'));
    directorio.classList.toggle('directorioTgl');
    estela.classList.toggle('estelaTgl');
  })
}

const getJwtCookie = async () => {
  try {
    const respuesta = await fetch('/api/getJwtcookie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    if (respuesta.status === 200) {
      const promesa = respuesta.json();
      promesa.then(data => {
        const logout = document.querySelector('.login');
        logout.innerHTML = `<a href="#">logut</a>`;

        logout.addEventListener('click', function (e) {
          e.preventDefault();
          console.log('clicked logout');
          // realizar un delete cookie jwt y redirigir a login
        })
        main.innerHTML = `
        <div class="estela evento"></div>
        <div class="contenedor ">
          <h2>Hola ${data.nombre}</h2>
          <p>Escribe una nueva tarea</p>
          <input type="text" class="input-nueva-tarea" id="input-tarea">
          <button id="guardar" class="btn-guardar-nueva-tarea">guardar</button>
        </div>
        <div class="mensajes-fetch ">
          <!-- <p>salio todo bien</p> -->
        </div>`; // cargar una nueva tarea ya que esto esta en el dom, antes de cargar las tareas

        return data;
      })
      .then(async (data)=>{
        /* fetch tareas de este usuario */
        const fetchTareas = await fetch(`/api/tarea/${data.id}`, {
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${data.cookie.jwt}`,
            'Content-Type': 'application/json'
          }
        })
        if (fetchTareas.status === 200) {
          const fetchTareasPromesa = fetchTareas.json();
          fetchTareasPromesa.then( dataTareas => {
            console.log(dataTareas);
            let print = '';

            dataTareas.map( iteracion => {
              print += `
              <div class="lista-tareas">
                <div class="tarea-individual">
                  <p>${iteracion.contenido}</p>
                  <div class="botones-edicion">
                    <button class="btn">eliminar</button>
                    <button class="btn">editar</button>
                  </div>
                </div>
              </div>`;
            })
            // al final agregar al final de un elemento del dom
            main.innerHTML += print;
            cargarEstela();
          })
          .catch(error => console.log(error))
        }
      }).then(()=>{
        const inputTarea = document.querySelector('.input-nueva-tarea');
        const guardar = document.querySelector('.btn-guardar-nueva-tarea');

        guardar.addEventListener('click', function (e) {
          e.preventDefault();
          console.log(inputTarea.value);
          console.log('guardar btn clicked');
        })
      })
      .catch(error => console.log(error))
    } else{
      main.innerHTML = `
      <div class="estela evento"></div>
      <div class="mensaje-not-login">
        <p>no has iniciado session,<a href="http://localhost:3000/login/">ir a login</a> o <a href="http://localhost:3000/registrar/">registrar un nuevo usuario</a></p>
      </div>`;
      cargarEstela();
    }
  } catch (error) {
    console.log('catch error-->', error);
  }
}

getJwtCookie();


/* --------------------------------------------------------------------------- */
/* const main = document.querySelector('main');
const header = document.querySelector('header');
import { getTarea } from "./getTareas.js";
import { logout } from "./logout.js"

const cargarCookie = async () =>{
  try {
    const getCookie = await fetch('/api/getJwtcookie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    if (getCookie.status === 200) {
      // cargamos el formulario de nueva tarea antes del fetch 'GET' tareas
      // por que no sabemos cuanto tardara, asi almenos el usuario ve algo.
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

// primero comprobar que los campos no esten vacios
// para no crear una tarea solo con botones
        guardar.addEventListener('click',async function (e) {
          e.preventDefault();
        //if (tituloV.value.length === 0 || contenidoV.value.length === 0) return msjErrorTareas('rellena los campos po concha de tu ...', contenedorTareas);
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
            if (resp.status === 201) {
              const promess = resp.json();
              promess.then((data) =>{
                //const contenedorTareas = document.querySelector('contenedor-tareas');
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
        const id = data.id; //id user de cookie
        const nombre = data.nombre // nombre de cookie

        // saludamos al usuario logeado...
        header.innerHTML = `
          <p>header</p>
          <p>Welcome ${nombre}</p>
          <button class="logoutBtn">logout</button>`;
          const logoutBtn = document.querySelector('.logoutBtn');
          logoutBtn.addEventListener('click', function () {
            logout();
          });

        // esperamos para invocar getTareas por que puede tardar un poco.
        getTarea(jwtCookie, id, contenedorTareas);
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

cargarCookie(); */