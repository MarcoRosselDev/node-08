export const actualizarStyleMode = async (mode) =>{
  try {
    const respone = await fetch('/api/crearCookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        clave: "mode",
        valor: `${mode}`
      })
    })

    if (respone.status === 200) return true;
    return false
  } catch (error) {
    console.log('error en el cstch del fetch crear cookie ---> :', error);
  }
}