const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('sendLogin');

submit.addEventListener('click', async function (e) {
  e.preventDefault();
  try {
    const login = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    });

    console.log(login);
    //console.log(login.json());
    const prom = login.json();
    prom.then(data => {
      console.log(data)
      return data.jwt;
    })
    .then((data)=>{
      console.log(typeof(data));
      console.log(data, "data from then");
      // confirmado, podemos pasarnos datos desde el encadenamiento
    
      // podemos aplicar un condicional,
      // luego si status=200 redirecionar a tareas del usuario y cargarlas todas
      // location.href="file.html"
      // antes de reenviar, guardar la jwt en una cookie
      // al acceder a tareas, primero conseguir este jwt,
      // protejer la url con el jwt.

      location.href= '/tareas';
    })

  } catch (error) {
    console.log(error);
  }
})

console.log(document.cookie);