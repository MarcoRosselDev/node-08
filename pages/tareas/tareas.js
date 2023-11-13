console.log('tareas');

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
      const prom = getCookie.json();
      prom.then(async data => {
        console.log('data ---> ', data);
        const jwt = data.cookie.jwt;
        const id = data.id;
        const nombre = data.nombre
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
        }
      })
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