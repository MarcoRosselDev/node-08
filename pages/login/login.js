const password = document.getElementById('password');
const email = document.getElementById('email');
const login = document.getElementById('login');
const msjContenedor = document.querySelector('.msj-contenedor');

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
            
            //window.location.href = `http://localhost:3000/tarea/${data.userInfo._id}`
            window.location.href = `http://localhost:3000/tareas/`
          }

        } catch (error) {
          console.log('error en fetch cookie', error);
        }
        console.log(data)
      })
    } else {
      msjContenedor.classList.add('mistake');
      msjContenedor.innerHTML = `
      <p>algun error</p>
      <button class="x">X</button>`;
      const x = document.querySelector('.x');
      x.addEventListener('click', function (e) {
        e.preventDefault();
        msjContenedor.classList.remove('mistake');
        msjContenedor.innerHTML = ''
      })
      
    }
  } catch (error) {
    console.log(error);
  }
})