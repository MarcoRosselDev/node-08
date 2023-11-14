const click = document.getElementById('click');
const main = document.querySelector('main');

click.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(main.children);
  main.innerHTML = `
  <div class="contenedor">
    <p>No estas logeado!</p>
    <a href="http://localhost:3000/login">ir a login</a>
  </div>
  `
})