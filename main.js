var log = console.log.bind(console);

var portfolioEvent = function () {
  portfolio1.onclick = function () {
    portfoliobar.className = "bar bar-state1";
  }
  portfolio2.onclick = function () {
    portfoliobar.className = "bar bar-state2";
  }
  portfolio3.onclick = function () {
    portfoliobar.className = "bar bar-state3";
  }
}

var loadingAnimation = function () {
  //overlay.classList.remove('active');
  setTimeout(function () {
    overlay.classList.remove('active');
  }, 1000);
}

function animate(time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}
requestAnimationFrame(animate);

var enableScrollPosition = function () {
  let aTags = document.querySelectorAll('.topNavBar nav>ul>li>a');
  // log(aTags)
  for (let index = 0; index < aTags.length; index++) {
    const element = aTags[index];
    element.addEventListener('click', function (event) {
      // log(event);
      // log(event.target.href)
      event.preventDefault();
      var a = event.currentTarget;
      var href = a.getAttribute('href');
      if (href !== '#') {
        var targetY = document.querySelector(href).offsetTop - 80;
        //window.scroll(0, targetY - 80);

        // 1s播放24帧以上肉眼不容易识别 24fps
        let n = 25; // 每秒播放的次数
        let duration = 500 / n; // 每次播放的时间间隔
        let currentY = window.scrollY; // 当前文档已经滚动的像素
        
        // let distance = (targetY - currentY) / n; //每次移动的距离
        // let i = 0;
        // let intervalId = setInterval(() => {
        //   if (i === n) {
        //     clearInterval(intervalId)
        //     return;
        //   }
        //   i++;
        //   window.scroll(0, currentY + distance * i);
        // }, duration);

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


var autoStickNavbar = function () {
  var topNavBar = document.querySelector('.topNavBar');
  var stickNavbar = function(){
    if (window.scrollY > 0) {
      topNavBar.classList.add('sticky');
    } else {
      topNavBar.classList.remove('sticky');      
    }
  }
  stickNavbar();
  window.onscroll = function (xxx) {
    stickNavbar()
  }
}

var findNextSibling = function (element) {
  var nextNode = element.nextSibling;
  while (nextNode && nextNode.nextSibling === Node.TEXT_NODE) {
    nextNode = nextNode.nextSibling
  }
  return nextNode;
}

var displaySubmenu = function () {
  var liTags = document.querySelectorAll('.menu > li');
  for (let index = 0; index < liTags.length; index++) {
    const element = liTags[index];
    element.addEventListener('mouseenter', function (event) {      
      event.currentTarget.classList.add('active')
    });
    element.addEventListener('mouseleave', function (event) {
      event.currentTarget.classList.remove('active')
    })
  }
}


var __main = function () {
  loadingAnimation();  
  autoStickNavbar();
  displaySubmenu();
  enableScrollPosition();
  portfolioEvent();
}
__main();