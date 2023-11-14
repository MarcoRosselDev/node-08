const click = document.getElementById('click');
const titulo = document.getElementById('titulo');
const contenido = document.getElementById('contenido');
const main = document.querySelector('main');
const guardar = document.getElementById('tareaBTN')

guardar.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(titulo.value);
  console.log(contenido.value);
  const containTask = this.parentElement.parentNode.children[1];
  const div = document.createElement('div');
  div.classList.add('single-list')
  div.innerHTML = `
  <p>${titulo.value}</p>
  <p>${contenido.value}</p>
  `

  containTask.appendChild(div)
})