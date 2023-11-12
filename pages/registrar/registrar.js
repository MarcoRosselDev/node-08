const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_rep = document.getElementById('password-rep');
const enviar = document.querySelector('.enviar')
const alert = document.querySelector('.alert');

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
      if (respuesta.status === 201) {
        const prom = respuesta.json();
        prom.then(data =>{
          nombre.value = '';
          email.value = '';
          password.value = '';
          password_rep.value = '';
          // add msj
          setTimeout(()=>{
            // cargar mensaje en div = successufl
            // eliminarlo autmaticamente
          }, 5000)
          console.log(data);
          return 1234
        })
        .then((data) =>{
          console.log('data from then: ', data);
        })
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