!function () {
  var liTags = document.querySelectorAll('.topNavBar .menu > li');
  for (let index = 0; index < liTags.length; index++) {
    const element = liTags[index];
    element.addEventListener('mouseenter', function (event) {      
      event.currentTarget.classList.add('active')
    });
    element.addEventListener('mouseleave', function (event) {
      event.currentTarget.classList.remove('active')
    })
  }
}.call()