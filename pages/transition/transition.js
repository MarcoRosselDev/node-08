console.log('transition js test');
const btn = document.querySelector('.btn');
const div = document.querySelector('.contenedor')

btn.addEventListener('click', function (e) {
  e.preventDefault();
  div.classList.toggle('contenedorToggle')
})
