console.log('comprovacion');

export const msjErrorTareas = (mensaje, elem) =>{
  const finalElem = document.createElement('div');
  finalElem.classList.add('mistake');
  finalElem.innerHTML = `
  <p>${mensaje}</p>
  <button class="x">X</button>
  `
  elem.prepend(finalElem);

  const x = document.querySelector('.x');
  x.addEventListener('click', function (e) {
    e.preventDefault();
    finalElem.classList.remove('mistake');
    finalElem.innerHTML = ''
  })

}