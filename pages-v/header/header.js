const toggle_btn = document.querySelector('.toggle-btn');
const lista_header = document.querySelector('.lista-header');

toggle_btn.addEventListener('click', function (e) {
  e.preventDefault();

  lista_header.classList.toggle('hidden')
  console.log('toggle btn clicked!');
})