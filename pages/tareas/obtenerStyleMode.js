const head = document.querySelector('head');
import {actualizarStyleMode} from './actualizarStyleMode.js';
const div = document.querySelector('.directorio');
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
      head.children[3].href = `https://marcorossel.com/tareas/tareas-${data.mode}.css`;
      div.classList.add(data.mode);
      if (data.mode === 'light') {
        modeBtn.innerText = 'dark mode';
      } else{
        modeBtn.innerText = 'light mode';
      }

      modeBtn.addEventListener('click',function (e) {
        e.preventDefault();
        if (div.classList.contains('light') === true) {
          div.classList.remove('light');
          head.children[3].href = `https://marcorossel.com/tareas/tareas-dark.css`;
          div.classList.add('dark');
          actualizarStyleMode('dark'); //<------------------------light or dark | aplicar toggle fn
          modeBtn.innerText = 'light mode';
        } else{
          div.classList.remove('dark');
          head.children[3].href = `https://marcorossel.com/tareas/tareas-light.css`;
          div.classList.add('light');
          actualizarStyleMode('light');
          modeBtn.innerText = 'dark mode';
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