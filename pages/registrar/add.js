const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_rep = document.getElementById('password-rep');
const enviar = document.querySelector('.enviar')
const alert = document.querySelector('.alert');

enviar.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(alert.classList);
  alert.classList.add('mistake')
  alert.innerText = 'Error de consola'
  console.log(alert.innerText);

  setTimeout(()=>{
    alert.classList.remove('mistake');
    alert.innerText = '';
    // aplicar un boton para ir a login
    //user esto con el login...
    //window.location = 'http://localhost:5500/pages/tareas/'
  },2000)

})