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

