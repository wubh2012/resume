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

var enableScrollPosition = function () {
  let aTags = document.querySelectorAll('.topNavBar nav>ul>li>a');
  log(aTags)
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

        // 1s播放24帧，肉眼不容易识别
        let n = 25;
        let duration = 1000 / n; // 多少时间执行
        let currentY = window.scrollY;
        let distance = (targetY - currentY) / n; //每次移动的距离
        let i = 0;
        let intervalId = setInterval(() => {
          if (i === n) {
            clearInterval(intervalId)
            return;
          }
          i++;
          window.scroll(0, currentY + distance * i);
        }, duration);
      }
    })
  }
}

var autoStickNavBar = function () {
  var topNavBar = document.querySelector('.topNavBar');
  window.onscroll = function (xxx) {
    if (window.scrollY > 0) {
      topNavBar.classList.add('sticky');
    } else {
      topNavBar.classList.remove('sticky');
    }
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
      //log(event.target)
      // log(event.currentTarget)
      var currentElement = event.currentTarget
      //log(currentNode.nextSibling.nodeType, Node.TEXT_NODE)
      //var submenu = currentNode.querySelectorAll('ul')[0]
      currentElement.classList.add('active')

    });
    element.addEventListener('mouseleave', function (event) {
      var currentElement = event.currentTarget
      //var submenu = currentNode.querySelectorAll('ul')[0]
      currentElement.classList.remove('active')
    })
  }
}



var __main = function () {
  loadingAnimation();
  autoStickNavBar();
  displaySubmenu();
  enableScrollPosition();
  portfolioEvent();
}
__main();