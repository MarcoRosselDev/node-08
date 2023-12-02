export const mensajes = (mensaje, status) => {
  const mensajes_fetch = document.querySelector('.mensajes-fetch');

/*   console.log(mensajes_fetch.classList.contains('tarea-error'));
  console.log(mensajes_fetch.classList.contains('tarea-exito')); */

  if (mensajes_fetch.classList.contains('tarea-error') === true || mensajes_fetch.classList.contains('tarea-error') === true) {
    mensajes_fetch.classList.remove('tarea-error');
    mensajes_fetch.classList.remove('tarea-exito');
    mensajes_fetch.innerHTML = '';
  }

  if (status === 'error') {
    const p = document.createElement('p');
    p.innerText = mensaje;
    p.classList.add('p-mensaje');
    mensajes_fetch.classList.add('tarea-error');
    mensajes_fetch.append(p)
  } else if (status === 'exito') {
    const p = document.createElement('p');
    p.innerText = mensaje;
    p.classList.add('p-mensaje');
    mensajes_fetch.classList.add('tarea-exito');
    mensajes_fetch.append(p);
  }

  setTimeout(() =>{
    mensajes_fetch.classList.remove('tarea-error');
    mensajes_fetch.classList.remove('tarea-exito');
    mensajes_fetch.innerHTML = '';
  }, 1500)
}

//mensajes('random text msj', 'error')
//mensajes('random text msj', 'exito')