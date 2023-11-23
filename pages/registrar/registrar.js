const toggleBtn = document.querySelector('.toggleBtn');
const links = document.querySelectorAll('.links');
const directorio = document.querySelector('.directorio');
const estela = document.querySelector('.estela');
const event = document.querySelector('.event');


toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();

  links.forEach(i => i.classList.toggle('linksTgl'));
  directorio.classList.toggle('directorioTgl');
  estela.classList.toggle('estelaTgl');
})

event.addEventListener('click', function (e) {
  e.preventDefault();
  
  links.forEach(i => i.classList.toggle('linksTgl'));
  directorio.classList.toggle('directorioTgl');
  estela.classList.toggle('estelaTgl');
})

const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_rep = document.getElementById('password-rep');
const enviar = document.querySelector('.enviar')
const msjContenedor = document.querySelector('.msj-contenedor');

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
          msjContenedor.classList.add('good')
          msjContenedor.innerHTML = `
          <p>usuario creado, <a href="http://127.0.0.1:5500/pages/login/index.html">ir a login</a></p>
          <div>
            <button class="x">X</button>
          </div>
          `;
          const x = document.querySelector('.x');
          try {
            setTimeout(()=>{
              console.log('borrado automatico');
              x.parentNode.parentNode.classList.remove('good')
              x.parentElement.children[0].classList.add('hiden');
              msjContenedor.removeChild(x.parentNode.parentNode.children[0]);
            }, 4000)
          } catch (error) {
            console.log(error);
          }
          x.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('x clicked');
        
            this.parentNode.parentNode.classList.remove('good')
            this.parentElement.children[0].classList.add('hiden');
            msjContenedor.removeChild(this.parentNode.parentNode.children[0]);
          })
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
    //---

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

    //---
    // appEnd msj en el div alert
    console.log("los passwords no coinsiden");
  }
})