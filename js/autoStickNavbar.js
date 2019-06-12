! function () {


  let view = document.querySelector('.topNavBar');
  let controller = {
    view: null,
    init: function () {
      this.view = view
      this.bindEvent()
      this.judgeActive()
    },
    bindEvent: function () {
      window.addEventListener('scroll', () => {
        this.judgeActive()
      });
    },
    judgeActive: function(){
      if (window.scrollY > 0) {
        this.active()
      } else {
        this.deactive()
      }
    },
    active: function () {
      this.view.classList.add('sticky');
    },
    deactive: function () {
      this.view.classList.remove('sticky')
    }
  }
  controller.init()


}.call()