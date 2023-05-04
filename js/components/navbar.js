const icon = document.querySelector('.icon');
const headerMenu = document.querySelector('.navbar-menu-m');

icon.addEventListener('click', (event) => {
  icon.classList.toggle("open");
  headerMenu.classList.toggle("display");
});