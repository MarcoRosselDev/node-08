export function eliminar(jwtoken, elem) {

  console.log(elem, 'elemento para eliminar del dom');
  console.log(jwtoken, 'jwt de cookie');
  /* const eliminarBtns =  document.querySelectorAll('.eliminar');

  eliminarBtns.forEach(btn => {
    btn.addEventListener('click', async function (e) {
      e.preventDefault();
      // con esto deveria poder acceder a la id del usuario y del item
      // crear una ruta api/deleteTask para eliminar la tarea con un fetch()
      //console.log(this.parentElement.parentElement.children[0].children);
      const user_id = this.parentElement.parentElement.children[0].children[2].textContent;
      const id_tarea = this.parentElement.parentElement.children[0].children[3].textContent;
      console.log('user_id', user_id);
      console.log('id_tarea', id_tarea);
      const div = document.querySelector('.contenedor-tareas')
      const removeDom = this.parentElement.parentElement
      try {
        const response = await fetch(`/api/tarea/${user_id}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtoken}`,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:JSON.stringify({
            id_task: id_tarea
          })
        })

        if (response.status === 200) {
          div.removeChild(removeDom);
          console.log('status 200');
        }
        // aplicar un if.status
        // then .json() --> y manipular el dom para sacar la tarea
      } catch (error) {
        console.log('error en la linea 17 de eliminar.js, frontend--->', error);
      }
    })
  }) */
}