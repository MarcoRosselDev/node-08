
export const msjError = async (mensaje, elem) => {
  elem.classList.add('mistake');
  elem.innerHTML = `
  <p>${mensaje}</p>
  <button class="x">X</button>
  `
  const x = document.querySelector('.x');
  x.addEventListener('click', function (e) {
    e.preventDefault();
    elem.classList.remove('mistake');
    elem.innerHTML = ''
  })
}