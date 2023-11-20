export const obtenerStyleMode = async (head) =>{
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
      console.log(data.mode);
      head.children[3].href = `http://localhost:3000/home/home-${data.mode}.css`
      //div.classList.add(data.mode)
    })
    } else{
      console.log('no existe la cookie mode');
    }
  } catch (error) {
    console.log('error en tratar de obtener la cookie de mode si es que existe-->', error);
  }
}