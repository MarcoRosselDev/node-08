const toggleBtn = document.querySelector('.toggleBtn');
const links = document.querySelectorAll('.links');
const directorio = document.querySelector('.directorio');
const estela = document.querySelector('.estela');
const eventt = document.querySelector('.event');
const cv = document.querySelector('.cv');
const main = document.querySelector('main');
const idioma = document.querySelector('.idioma');

idioma.addEventListener('onmouseover' , function (e) {
  e.preventDefault();
  console.log('hover idioma');
})











































toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();

  links.forEach(i => i.classList.toggle('linksTgl'));
  directorio.classList.toggle('directorioTgl');
  estela.classList.toggle('estelaTgl');
})

eventt.addEventListener('click', function (e) {
  e.preventDefault();
  
  links.forEach(i => i.classList.toggle('linksTgl'));
  directorio.classList.toggle('directorioTgl');
  estela.classList.toggle('estelaTgl');
})

cv.addEventListener('click', function (e) {
  e.preventDefault();
  window.location.href = `https://marcorossel.com/cv/`;
  /* main.innerHTML = `
  <main class="center">
    <div class="estela event"></div>
    <div class="cv-div">
      <button class="btn-cv cv-web">cv web</button>
      <button class="btn-cv cv-eng">Descargar cv en Ingles</button>
      <button class="btn-cv cv-spa">Descargar cv en Español</button>
    </div>
  </main>
  `;
  directorio.children[1].innerHTML = 'proyectos';
  directorio.children[1].classList.add('proyectos');
  directorio.children[1].classList.remove('cv');
  console.log(directorio.children);
  const cv_web = document.querySelector('.cv-web');
  const cv_eng = document.querySelector('.cv-eng');
  const cv_spa = document.querySelector('.cv-spa');
  const proyectos = document.querySelector('.proyectos');
  cv_web.addEventListener('click', function () {
    window.location.href = `https://marcorossel.com/cv/`;
  })

  cv_spa.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('click on cv spa');
  })
  cv_eng.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('click on cv eng');
  })
  proyectos.addEventListener('click', function (e) {
    e.preventDefault();
    console.log('manipular el dom denuevo y mostrar los proyectos');
  })
 */
})