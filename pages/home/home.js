const toggleBtn = document.querySelector('.toogleBtn');
const navList = document.querySelector('.navList');
const styleMode = document.querySelector('.styleMode');

console.log(styleMode);
styleMode.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('light mode');
  // crear una cookie con el key=style, value=dark|light 
})

toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (navList.classList.contains('hide')) {
    navList.classList.remove('hide')
  } else{
    navList.classList.add('hide')
  }
})

