const toggleBtn = document.querySelector('.toogleBtn');
const divNav = document.querySelector('.divNav');
const styleMode = document.querySelector('.styleMode');
const lightMode = document.querySelector('.light-mode');
const over = document.querySelector('.over')

toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (divNav.classList.contains('hide')) {
    divNav.classList.remove('hide');
    over.classList.add('over-lide');
    divNav.classList.add('navList');
    //main.classList.add('another');
  } else{
    divNav.classList.add('hide');
    divNav.classList.remove('navList');
    over.classList.remove('over-lide');
    //main.classList.remove('another')
  }
})

lightMode.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('you are clicked light mode');
  // ahora crear una cookie con la clave valor:
  // mode = night|light
})

over.addEventListener('click', function (e) {
  e.preventDefault();
  divNav.classList.remove('navList')
  divNav.classList.add('hide');
  over.classList.remove('over-lide')
  console.log('click main');
})