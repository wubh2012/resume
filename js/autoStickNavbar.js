!function() {

  var topNavBar = document.querySelector('.topNavBar');
  var stickNavbar = function () {
    if (window.scrollY > 0) {
      topNavBar.classList.add('sticky');
    } else {
      topNavBar.classList.remove('sticky');
    }
  }
  stickNavbar();
  window.addEventListener('scroll', function () {
    stickNavbar()
  });

}.call()