const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_rep = document.getElementById('password-rep');
const enviar = document.querySelector('.enviar')
const msjContenedor = document.querySelector('.msj-contenedor');

enviar.addEventListener('click', function (e) {
  e.preventDefault();
  /* console.log(alert.classList);
  alert.classList.add('good')
  alert.innerText = 'Cuenta creada'
  console.log(alert.innerText); */
  msjContenedor.classList.add('good')
  msjContenedor.innerHTML = `
  <p>usuario creado, <a href="http://127.0.0.1:5500/pages/login/index.html">ir a login</a></p>
  <div>
    <button class="x">X</button>
  </div>
  `;
  const x = document.querySelector('.x');
  
  x.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('x clicked');

    msjContenedor.removeChild(this.parentNode.parentNode.children[0]);
    this.parentNode.parentNode.classList.remove('good')
    this.parentElement.children[0].classList.add('hiden');
  })
})