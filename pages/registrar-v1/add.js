const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_rep = document.getElementById('password-rep');
const enviar = document.querySelector('.enviar')
const msjContenedor = document.querySelector('.msj-contenedor');

enviar.addEventListener('click', function (e) {
  e.preventDefault();
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

enviar.addEventListener('click', function (e) {
  e.preventDefault();
  msjContenedor.classList.add('mistake')
  msjContenedor.innerHTML = `
  <p>Error 001, los passwords no coinsiden</p>
  <div>
    <button class="x">X</button>
  </div>
  `;
  const x = document.querySelector('.x');
  try {
    setTimeout(()=>{
      console.log('borrado automatico');
      x.parentNode.parentNode.classList.remove('mistake')
      x.parentElement.children[0].classList.add('hiden');
      msjContenedor.removeChild(x.parentNode.parentNode.children[0]);
    }, 4000)
  } catch (error) {
    console.log(error);
  }
  x.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('x clicked');

    this.parentNode.parentNode.classList.remove('mistake')
    this.parentElement.children[0].classList.add('hiden');
    msjContenedor.removeChild(this.parentNode.parentNode.children[0]);
  })
})