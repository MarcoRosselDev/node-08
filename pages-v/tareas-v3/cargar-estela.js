export const cargar_estela = ()=> {
  const toggleBtn = document.querySelector('.toggleBtn');
  const links = document.querySelectorAll('.links');
  const directorio = document.querySelector('.directorio');
  const estela = document.querySelector('.estela');
  const evento = document.querySelector('.evento');

  toggleBtn.addEventListener('click', function (e) {
    e.preventDefault();
    links.forEach(i => i.classList.toggle('linksTgl'));
    directorio.classList.toggle('directorioTgl');
    estela.classList.toggle('estelaTgl');
  })

  evento.addEventListener('click', function (e) {
    e.preventDefault();
    links.forEach(i => i.classList.toggle('linksTgl'));
    directorio.classList.toggle('directorioTgl');
    estela.classList.toggle('estelaTgl');
  })
}