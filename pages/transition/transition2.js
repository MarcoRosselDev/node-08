const toggleBtn = document.querySelector('.toggleBtn');
const links = document.querySelectorAll('.links');
const directorio = document.querySelector('.directorio');

toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();

  links.forEach(i => i.classList.toggle('linksTgl'));
  directorio.classList.toggle('directorioTgl')
})