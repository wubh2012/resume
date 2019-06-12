! function () {
  let log = console.log.bind(console)

  let view = document.querySelector('.topNavBar')
  let controller = {
    view: null,
    init: function () {
      this.view = view
      this.initAnimation()
      this.bindEvent()
    },
    initAnimation: function () {
      let animate = function (time) {
        requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      requestAnimationFrame(animate);
    },
    scrollElement: function (element) {
      let targetY = document.querySelector(element).offsetTop - 80;
      let currentY = window.scrollY; // 当前文档已经滚动的像素
      // 使用 tween 实现滚动动画
      let coords = {
        y: currentY
      };

      let tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
        .to({
          y: targetY
        }, 1000) // Move to (200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function () {
          // Called after tween.js updates 'coords'.
          window.scroll(0, coords.y);
        })
        .start();
    },
    bindEvent: function () {

      let aTags = view.querySelectorAll('nav>ul>li>a');
      for (let index = 0; index < aTags.length; index++) {
        const element = aTags[index];
        element.addEventListener('click', (event) => {
          event.preventDefault();
          let a = event.currentTarget;
          let href = a.getAttribute('href');
          if (href !== '#') {
            this.scrollElement(href)
          }
        })
      }
    }
  }
  controller.init()

}.call()