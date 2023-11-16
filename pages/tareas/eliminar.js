export function eliminar() {
  const eliminarBtns =  document.querySelectorAll('.eliminar');

  eliminarBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(this.parentElement.parentElement.children[0].children);
    })
  })
}