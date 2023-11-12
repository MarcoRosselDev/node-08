const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_rep = document.getElementById('password-rep');
const enviar = document.querySelector('.enviar')

enviar.addEventListener('click', async function (e) {
  e.preventDefault();
  console.log('nombre : ', nombre.value);
  console.log('email : ', email.value);
  console.log('password : ', password.value);
  console.log('password_rep : ', password_rep.value);

  if (password.value === password_rep.value) {
    try {
      const respuesta = await fetch('/api/registrar', {
        method: "POST",
        body: JSON.stringify({
          nombre: nombre.value,
          email: email.value,
          password: password.value
        })
      })
      respuesta.then(resp => resp.json())
        .then(data => console.log(data))
    } catch (error) {
      console.log(error);
    }
  }
})