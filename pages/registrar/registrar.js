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
          "nombre": nombre.value,
          "email": email.value,
          "password": password.value
        })
      })
      
      console.log(respuesta.json());
    } catch (error) {
      console.log(error);
    }
  }
})