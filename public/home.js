const toggleBtn = document.querySelector('.toggleBtn');
const links = document.querySelectorAll('.links');
const directorio = document.querySelector('.directorio');
const estela = document.querySelector('.estela');
const eventt = document.querySelector('.event');
const cv = document.querySelector('.cv');
const main = document.querySelector('main')

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
  main.innerHTML = `
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
})