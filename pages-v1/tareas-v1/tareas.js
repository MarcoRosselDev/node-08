/* const toggleBtn = document.querySelector('.toggleBtn');
const directorio = document.querySelector('.directorio');
const links = document.querySelectorAll('.links');
//const divEstela = document.querySelector('.divEstela');
const evento = document.querySelector('.event');
const estela = document.querySelector('.estela');


toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  directorio.classList.toggle('directorioTgl');
  links.forEach(i => i.classList.toggle('linksTgl'));
  estela.classList.toggle('estelaTgl');
})

evento.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('click en estela');
  estela.classList.toggle('estelaTgl');
  directorio.classList.toggle('directorioTgl')
})

 */






























const toggleBtn = document.querySelector('.toggleBtn');
const links = document.querySelectorAll('.links');
const directorio = document.querySelector('.directorio');
const estela = document.querySelector('.estela');
const estealMain = document.querySelector('.estela-main');

toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  links.forEach(i => i.classList.toggle('linksTgl'));
  directorio.classList.toggle('directorioTgl');
  //estela.classList.toggle('estelaTgl');
  estealMain.classList.toggle('event');
  estealMain.classList.toggle('estala-main-tgl')
  
  const event = document.querySelector('.event');
  event.addEventListener('click', function (e) {
    e.preventDefault();
    links.forEach(i => i.classList.toggle('linksTgl'));
    directorio.classList.toggle('directorioTgl');
    //estela.classList.toggle('estelaTgl');
    estealMain.classList.toggle('estala-main-tgl')
  })
  
})

