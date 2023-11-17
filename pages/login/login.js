const password = document.getElementById('password');
const email = document.getElementById('email');
const login = document.getElementById('login');

login.addEventListener('click', async function (e) {
  e.preventDefault();
  console.log('login click');

  try {
    const respuesta = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
    if (respuesta.status === 200) {
      const prom = respuesta.json()
      prom.then(async data => {
        try {
          const jwtFetch = data.token;
          const cookie = await fetch('/api/crear-cookie', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
              clave: 'jwt',
              valor: jwtFetch
            })
          })

          console.log(cookie, 'cookie despues del fetch');
          if (cookie.status === 200) {
            // redireccionar a las tareas de este usuario
            
            // window.location.href = `http://localhost:3000/tarea/${data.userInfo._id}`
            // este es para trabajo local 
            // window.location.href = `http://localhost:3000/tareas/`
            window.location.href = `https://node-08-portfolio.onrender.com//tareas/`
          }

        } catch (error) {
          console.log('error en fetch cookie', error);
        }
        console.log(data)
      })
    } else {
      // print a msj error credentials
    }
  } catch (error) {
    console.log(error);
  }
})