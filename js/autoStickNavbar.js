! function () {
  let view = View('.topNavBar')
  let model = {
    init: function(){}
  }
  let controller = Controller({
    init: function (view, model) {
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
  })
  controller.init(view, model)


}.call()