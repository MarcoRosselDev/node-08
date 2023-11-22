const toggleBtn = document.querySelector('.toogleBtn');
const divNav = document.querySelector('.divNav');
const over = document.querySelector('.over');
//Esme_KD

/* toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (divNav.classList.contains('hide')) {
    divNav.classList.remove('hide');
    over.classList.add('over-lide');
    divNav.classList.add('navList');
    divNav.classList.add('divNavToggle');
    //main.classList.add('another');
  } else{
    divNav.classList.add('hide');
    divNav.classList.remove('navList');
    divNav.classList.remove('divNavToggle');
    over.classList.remove('over-lide');
    //main.classList.remove('another')
  }
}) */


toggleBtn.addEventListener('click', function (e) {
  e.preventDefault();

  divNav.classList.toggle('divNavToggle')
  over.classList.toggle('over-lide')
})

over.addEventListener('click', function (e) {
  e.preventDefault();
  divNav.classList.remove('divNavToggle')
  over.classList.remove('over-lide')
})