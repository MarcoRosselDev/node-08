const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_rep = document.getElementById('password-rep');
const enviar = document.querySelector('.enviar')

enviar.addEventListener('click', async function (e) {
  e.preventDefault();
  if (password.value === password_rep.value) {
    try {
      const respuesta = await fetch('/api/registrar', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          nombre: nombre.value,
          email: email.value,
          password: password.value
        })
      })
      await console.log(respuesta);
      if (respuesta.status === 201) {
        respuesta.json()
        console.log('respuesta .json :' ,respuesta);
      }
      // div alert msj
      console.log('status from respuesta : ',respuesta.status);
      //await respuesta.json();
      //console.log(respuesta.json());
      //return respuesta.json()
    } catch (error) {
      console.log(error);
    }
  } else{
    // appEnd msj en el div alert
    console.log("los passwords no coinsiden");
  }
})