import { editar } from "./editar.js"; // ojo, si no aplico el .js no se cargan los modulos
import {eliminar} from "./eliminar.js";

const main = document.querySelector('main');
const header = document.querySelector('header');

const cargarCookie = async () =>{
  try {
    // tratamos de obtener la cookie de el navegador si es que exciste,
    // si no le mostramos un mensaje de logearse pls
    const getCookie = await fetch('/api/get-cookie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    if (getCookie.status === 200) {
      // entes de procesar el then manipulamos el dom para mostrar 
      // el formulario para una nueva tarea
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
      const prom = getCookie.json();
      prom.then(async (data) => {
        // desde aqui se pueden cargar los elementos para manipular
        const tituloV = document.getElementById('titulo'); // input
        const contenidoV = document.getElementById('contenido'); // input
        const guardar = document.getElementById('tareaBTN'); // boton guardar tarea
        const contenedorTareas = document.querySelector('.contenedor-tareas'); // manipular DOM
        const jwtCookie = data.cookie.jwt; // jwt sacada de la cookie

        guardar.addEventListener('click',async function (e) {
          e.preventDefault();
          try {

            // post nueva tarea
            // solo enviamos el titulo y el contenido
            // la id del usuario y el nombre de usuario se extraen de el jwt que se saco de la cookie
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
              // data --> array de tareas
              promess.then((data) =>{
                // la data contiene el user_id y _id de la tarea
                // enviada desde el post que estrajo la user_id del jwt cookie decode
                const div = document.createElement('div');
                div.classList.add('single-list')
                div.innerHTML = `
                <p>${tituloV.value}</p>
                <p>${contenidoV.value}</p>
                <p class="hiden">${data.user_id}</p>
                <p class="hiden">${data._id}</p>
                `;
                // ocultamos el id de usuario e id para la manipulacion de estas tareas
                contenedorTareas.appendChild(div); // lo agregamos al final del contenedor de tareas
              })
            } else{
              // posdriamos imprimir algo en el dom en el futuro
              console.log('no se guardo la tarea correctamente');
            }
          } catch (error) {
            // algun error en el fetch post tarea
            console.log(error);
          }
        })

        // ejemplo de lo que devuelve data, que viene de getCookie fn
        /* data = {  
            cookie: {jwt: 'asdfa...'},
            id: '123123hjk23412341llk...',
            nombre: 'lushito'} */

        //const jwt = data.cookie.jwt;

        const id = data.id;
        const nombre = data.nombre

        // saludamos al usuario ...
        header.innerHTML = `
          <p>header</p>
          <p>Welcome ${nombre}</p>
          <p>logout</p>`;
        
        // con toda la info disponible podemos realisar un fetch GET
        // para obtener todas las tareas guardadas de el usuario x
        const getTarea = await fetch(`/api/tarea/${id}`, {
          method: 'GET',
          headers:{
            'Authorization': `Bearer ${jwtCookie}`,
            'Content-Type': 'application/json'
          }
        })
        if (getTarea.status === 200) {
          const proms = getTarea.json();
          proms.then(data => {
            // la data es un objeto con todas las tareas,
            // si no tiene devolvera un arreglo vacio ====> []
            // ejemplo:
            /* 
            [{_id: '...', user_id: '...', user_name: '...', titulo: '...', contenido: '...'},
            {_id: '...', user_id: '...', user_name: '...', titulo: '...', contenido: '...'},
            {_id: '...', user_id: '...', user_name: '...', titulo: '...', contenido: '...'}] */

            // iteramos por el arreglo con map y manipulamos el dom con la lista de tareas
            let print = "";
            data.map(i => {
              print += `
              <div class="single-list">
                <div class="task-info">              
                  <p>${i.titulo}</p>
                  <p>${i.contenido}</p>
                  <p class="hiden user_id">${i.user_id}</p>
                  <p class="hiden _id">${i._id}</p>
                </div>
                <div class="btns-edit">
                  <button class="editar">editar</button>
                  <button class="eliminar">eliminar</button>
                </div>
              </div>
              
              `
            });
            contenedorTareas.innerHTML = print;

            // ahora podemos trabajar con la edicion  y eliminacion de tareas
            eliminar();

          })
        } else {
          // podriamos trabajar como elnviar un msj al user de el error al cargar las tareas
          console.log('algun error en la obtencion de las tareas');
        }
      })
    } else {
      // si no esta logeado le decimos que valla a logearse
      // esto despues de la peticion obtener cookie del navegador
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