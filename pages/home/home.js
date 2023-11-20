import { actualizarStyleMode } from "./mode.js";
import { obtenerStyleMode } from "./obtenerStyleMode.js";
const toggleBtn = document.querySelector('.toogleBtn');
const divNav = document.querySelector('.divNav');
const modeBtn = document.querySelector('.light-mode');
const over = document.querySelector('.over')
const head = document.querySelector('head');


obtenerStyleMode(head);

modeBtn.addEventListener('click',function (e) {
  e.preventDefault();
  console.log('you are clicked light mode');
  actualizarStyleMode('light') //<------------------------light or dark | aplicar toggle fn
})

toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (divNav.classList.contains('hide')) {
    divNav.classList.remove('hide');
    over.classList.add('over-lide');
    divNav.classList.add('navList');
    //main.classList.add('another');
  } else{
    divNav.classList.add('hide');
    divNav.classList.remove('navList');
    over.classList.remove('over-lide');
    //main.classList.remove('another')
  }
})

over.addEventListener('click', function (e) {
  e.preventDefault();
  divNav.classList.remove('navList')
  divNav.classList.add('hide');
  over.classList.remove('over-lide')
  console.log('click main');
})