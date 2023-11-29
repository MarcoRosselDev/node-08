export async function logout () {

  // 1--- borrar las cookies relacionadas a este usuario especialmente la jwt
  // 2--- redireccionarlo a /login
  // 3--- 

  console.log('antes del try catch en login');
  try {
    const resp = await fetch('/api/delcookie', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })

    console.log(resp);
    if (resp.status === 200) {
      console.log('cookies eliminadas- ---> manipular dom y redicc');
      window.location.href = `http://localhost:3000/login/`;
    } else{
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
  
  console.log('working wit logout fn');
}