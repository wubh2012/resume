!function () {
  var view = document.querySelector('.topNavBar');
  var controller = {
    view: null,
    init: function (view) {
      this.view = view
      this.bindEvent()
    },
    bindEvent: function () {
      let subMenuItems = view.querySelectorAll('.menu>li')
      for (let index = 0; index < subMenuItems.length; index++) {
        const element = subMenuItems[index];
        element.addEventListener('mouseenter', (event) => {
          this.active(event.currentTarget)
        });
        element.addEventListener('mouseleave', (event) => {
          this.deactive(event.currentTarget)
        })
      }
    },
    active: function (element) {
      element.classList.add('active')
    },
    deactive: function (element) {
      element.classList.remove('active')
    }
  }
  controller.init(view)


}.call()