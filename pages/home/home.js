const toggleBtn = document.querySelector('.toogleBtn');
const divNav = document.querySelector('.divNav');
const styleMode = document.querySelector('.styleMode');

console.log(styleMode);
styleMode.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('light mode');
  console.log(this.parentElement);
  // crear una cookie con el key=style, value=dark|light 
})

toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (divNav.classList.contains('hide')) {
    divNav.classList.remove('hide');
    divNav.classList.add('navList');
  } else{
    divNav.classList.add('hide');
    divNav.classList.remove('navList');
  }
})

