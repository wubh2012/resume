!function () {
  var animate = function (time) {
    requestAnimationFrame(animate);
    TWEEN.update(time);
  }
  requestAnimationFrame(animate);
  
  let aTags = document.querySelectorAll('.topNavBar nav>ul>li>a');
  for (let index = 0; index < aTags.length; index++) {
    const element = aTags[index];
    element.addEventListener('click', function (event) {
      event.preventDefault();
      var a = event.currentTarget;
      var href = a.getAttribute('href');
      if (href !== '#') {
        var targetY = document.querySelector(href).offsetTop - 80;

        // 1s播放24帧以上肉眼不容易识别 24fps
        let n = 25; // 每秒播放的次数
        let duration = 500 / n; // 每次播放的时间间隔
        let currentY = window.scrollY; // 当前文档已经滚动的像素
        
        // 使用 tween 实现滚动动画
        var coords = {
          y: currentY
        };

        var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
        .to({y: targetY }, 1000) // Move to (200) in 1 second.
        .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
        .onUpdate(function() { // Called after tween.js updates 'coords'.
          window.scroll(0, coords.y); 
        })
        .start(); // Start the tween immediately.
      }
    })
  }

}
