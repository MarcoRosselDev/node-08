const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_rep = document.getElementById('password-rep');
const enviar = document.querySelector('.enviar')
const alert = document.querySelector('.alert');
const x = document.querySelector('.x');

enviar.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(alert.classList);
  alert.classList.add('good')
  alert.innerText = 'Cuenta creada'
  console.log(alert.innerText);

  /* setTimeout(()=>{
    alert.classList.remove('good');
    alert.innerText = '';
    // aplicar un boton para ir a login
    //user esto con el login...
    //window.location = 'http://localhost:5500/pages/tareas/'
  },2000) */

})