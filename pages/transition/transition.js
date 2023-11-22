console.log('transition js test');
const btn = document.querySelector('.btn');
const div = document.querySelector('.contenedor')
const hi = document.querySelector('.hi')

btn.addEventListener('click', function (e) {
  e.preventDefault();
  if (div.classList.contains('contenedor2')) {
    div.classList.remove('contenedor2')
  } else{
    div.classList.add('contenedor2')
  }

})

hi.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('hi clicked');
})