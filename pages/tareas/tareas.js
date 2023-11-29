
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
        <div class="mensajes-fetch">
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
            const divLista = document.createElement('div');
            divLista.classList.add('lista-tareas');
            
            let print = '';
            dataTareas.map( iteracion => {
              print += `
              
              <div class="tarea-individual">
                <p>${iteracion.contenido}</p>
                <!-- user id -->
                <p class="ocultar">${iteracion.user_id}</p>
                <!-- id de la tarea -->
                <p class="ocultar">${iteracion._id}</p>
                <div class="botones-edicion">
                  <button class="btn eliminar">eliminar</button>
                  <button class="btn editar">editar</button>
                </div>
              </div>`;
            })
            divLista.innerHTML = print;
            // al final agregar al final de un elemento del dom
            main.append(divLista);
            cargarEstela();

            const eliminarBtns = document.querySelectorAll('.eliminar')
            eliminarBtns.forEach(i =>{
              i.addEventListener('click', async function (e) {
                e.preventDefault();
                console.log(i.parentElement.parentElement.classList);
                console.log(i.parentElement.parentElement.children);
                const id_tarea = i.parentElement.parentElement.children[2].innerText;
                console.log(data.cookie.jwt);

                const fetch_eliminar_tarea = await fetch(`/api/tarea/${id_tarea}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.cookie.jwt}`,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  }
                })
                if (fetch_eliminar_tarea.status === 200) {
                  i.parentElement.parentElement.classList.remove('tarea-individual')
                  i.parentElement.parentElement.innerHTML = '';
                } else{
                  console.log('algo salio mal', fetch_eliminar_tarea);
                  console.log('algo salio mal, status = ', fetch_eliminar_tarea.status);
                }

              })
            })
            // cargar la funcionalidad de eliminar y editar en todas las tareas cargadas
          })
          .then(()=>{
            const inputTarea = document.querySelector('.input-nueva-tarea');
            const guardar = document.querySelector('.btn-guardar-nueva-tarea');
            const mensajeElement = document.querySelector('.mensajes-fetch');

            guardar.addEventListener('click', async function (e) {
              e.preventDefault();
              if (inputTarea.value.length === 0) {
                const p = document.createElement('p');
                p.innerText = 'El input esta vacio';
                p.classList.add('p-mensaje');
                mensajeElement.classList.add('tarea-error')
                mensajeElement.append(p);
                setTimeout(()=>{
                  mensajeElement.classList.remove('tarea-error')
                  mensajeElement.innerHTML = '';
                },1500)
                return false
              }
              const postTask = await fetch('/api/tarea', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${data.cookie.jwt}`,
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:JSON.stringify({
                  contenido: inputTarea.value
                })
              })
              if (postTask.status === 201) {
                const p = document.createElement('p');
                p.innerText = 'tarea guardada exitosamente';
                p.classList.add('p-mensaje');
                mensajeElement.classList.add('tarea-exito')
                mensajeElement.append(p);
                inputTarea.value = '';

                setTimeout(()=>{
                  mensajeElement.classList.remove('tarea-exito')
                  mensajeElement.innerHTML = '';
                },1500)

                const taskPromes = postTask.json()
                taskPromes.then(tareaData =>{
                  const listaTarea = document.querySelector('.lista-tareas')
                  const divTarea = document.createElement('div');
                  divTarea.classList.add('tarea-individual')
                  divTarea.innerHTML = `
                  <p>${tareaData.contenido}</p>
                  <p class="ocultar">${tareaData.user_id}</p>
                  <p class="ocultar">${tareaData._id}</p>
                  <div class="botones-edicion">
                  <button class="btn eliminar_this">eliminar</button>
                  <button class="btn editar_this">editar</button>
                  </div>`;
                  listaTarea.append(divTarea);
                  // aplicar la funcionalidad de eliminar y editar esta tarea

                  const eliminar_this_tarea = document.querySelector('.eliminar_this')
                })
                .catch(err => console.log(err))
              } else {
                const p = document.createElement('p');
                p.innerText = 'algo salio mal';
                p.classList.add('p-mensaje');
                mensajeElement.classList.add('tarea-error')
                mensajeElement.append(p);
                inputTarea.value = '';

                setTimeout(()=>{
                  mensajeElement.classList.remove('tarea-exito')
                  mensajeElement.innerHTML = '';
                },1500)
              }
            })
          })
          .catch(error => console.log(error))
        }
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