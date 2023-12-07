export const logout_fn = async () =>{
  try {
    const eliminar_cookie = await fetch('/api/delcookie', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (eliminar_cookie.status === 200) return window.location.href = `https://marcorossel.com/login/`;
    console.log('cookie no eliminada');
  } catch (error) {
    console.log('error en la fn logout:', error);
  }
}