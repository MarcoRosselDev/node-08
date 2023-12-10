const toggleBtn = document.querySelector('.toggleBtn');
const links = document.querySelectorAll('.links');
const directorio = document.querySelector('.directorio');
const estela = document.querySelector('.estela');
const event = document.querySelector('.event');
const cv = document.querySelector('.cv');

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

cv.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('cv clicked, change the dom main');
})