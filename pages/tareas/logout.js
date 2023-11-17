import { response } from "express";

export async function logout () {

  // 1--- borrar las cookies relacionadas a este usuario especialmente la jwt
  // 2--- redireccionarlo a /login
  // 3--- 

  try {
    const response = await fetch('/api/del-cookie', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })


    console.log(response);
    if (response.status(200)) {
      console.log('cookies eliminadas- ---> manipular dom y redicc');
      window.location.href = `http://localhost:3000/login/`;
    }
  } catch (error) {
    console.log(error);
  }
  
  console.log('working wit logout fn');
}