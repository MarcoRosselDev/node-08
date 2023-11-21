const head = document.querySelector('head');
import {actualizarStyleMode} from './actualizarStyleMode.js';
const div = document.querySelector('.divNav');
const modeBtn = document.querySelector('.light-mode');

const obtenerStyleMode = async () =>{
  try {
    const response = await fetch('/api/getStylecookie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    if (response.status === 200) {
    const a = response.json();
    a.then(data => {
      head.children[3].href = `http://localhost:3000/home/home-${data.mode}.css`;
      div.classList.add(data.mode);
      console.log(div.classList);

      modeBtn.addEventListener('click',function (e) {
        e.preventDefault();
        if (div.classList.contains('light') === true) {
          div.classList.remove('light');
          head.children[3].href = `http://localhost:3000/home/home-dark.css`;
          div.classList.add('dark');
          actualizarStyleMode('dark'); //<------------------------light or dark | aplicar toggle fn
          console.log('now is dark');
        } else{
          div.classList.remove('dark');
          head.children[3].href = `http://localhost:3000/home/home-light.css`;
          div.classList.add('light');
          actualizarStyleMode('light');
          console.log('now is light');
        }
      })


    })
    } else{
      console.log('no existe la cookie mode, la crearemos en dark por defecto para ti.');
      actualizarStyleMode('dark');
    }
  } catch (error) {
    console.log('error en tratar de obtener la cookie de mode si es que existe-->', error);
  }
}

obtenerStyleMode();