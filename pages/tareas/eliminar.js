export function eliminar() {
  const eliminarBtns =  document.querySelectorAll('.eliminar');

  eliminarBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      // con esto deveria poder acceder a la id del usuario y del item
      // crear una ruta api/deleteTask para eliminar la tarea con un fetch()
      console.log(this.parentElement.parentElement.children[0].children);
    })
  })
}