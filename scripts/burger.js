document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.hamburger').classList.toggle('active');
  document.querySelector('.navbar-mobile').classList.toggle('active');
})