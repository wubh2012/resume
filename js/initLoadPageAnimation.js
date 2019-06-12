!function () {
  // 这个功能太简单，不需要用到 MVC 模式
  setTimeout(function () {
    let overlay = document.querySelector('#overlay')
    overlay.classList.remove('active');
  }, 300);
}.call()