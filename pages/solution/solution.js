const input = document.getElementById('input');
const guardar = document.getElementById('guardar');
const div = document.querySelector('.lista');

guardar.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('click');
  
  const elemento = document.createElement('div');
  elemento.classList.add('single-task');
  elemento.innerHTML = `
  <p>${input.value}</p>
  <div class="botones">
    <button class="eliminar">eliminar</button>
    <button class="editar">editar</button>
  </div>`;
  div.append(elemento);
  cargar_btns();
  console.log('guardar clicked');
})

const cargar_btns = () =>{
  let botones_guardar = document.querySelectorAll('.eliminar');
  botones_guardar.forEach(btn =>{
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('click elimnar');
      console.log(this.parentElement);
    })
  })
}


