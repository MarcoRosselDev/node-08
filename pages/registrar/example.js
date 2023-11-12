const enviar = document.getElementById('enviar');
const nombre = document.getElementById('usuario');
const password = document.getElementById('password');
const passwordComparativo = document.getElementById('password-comparativo');
const email = document.getElementById('email');

console.log(document.cookie);
console.log('hola');

enviar.addEventListener('click', async function (e) {
  e.preventDefault();
  if (password.value === passwordComparativo.value) {
    try {
      const respuesta = await fetch('/api/v1/registrar', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          nombre: nombre.value,
          email: email.value,
          password: password.value
        })
      })
      return respuesta.json()
    } catch (error) {
      console.error(error)
    }
  } else{
    console.log('Las contraseñas no coinsiden');
  }
})