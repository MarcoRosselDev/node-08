const toggleBtn = document.querySelector('.toggleBtn');
const directorio = document.querySelector('.directorio');
const links = document.querySelectorAll('.links');
const divEstela = document.querySelector('.divEstela');

toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('toggle btn presed');
  directorio.classList.toggle('directorioTgl');
  divEstela.classList.toggle('estelaTgl')
  links.forEach(i => i.classList.toggle('linksTgl'));
})

divEstela.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('click en estela');
})
































/* const toggleBtn = document.querySelector('.toggleBtn');
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
 */
