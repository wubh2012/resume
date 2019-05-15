var log = console.log.bind(console);

var toggleClass = function(element, className){
  if(element.classList.contains(className)){
    element.classList.remove(className)
  }else{
    element.classList.add(className)
  }
}

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
  }, 300);
}

var animate = function (time) {
  requestAnimationFrame(animate);
  TWEEN.update(time);
}

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
  window.addEventListener('scroll', function(){
    stickNavbar()
  });
  
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
      //event.currentTarget.classList.add('active')
      toggleClass(event.currentTarget, 'active')
    });
    element.addEventListener('mouseleave', function (event) {
      // event.currentTarget.classList.remove('active')
      toggleClass(event.currentTarget, 'active')
    })
  }
}

var highlightElement = function(){
  
  let dict = []
  let hightlightItems = document.querySelectorAll('[data-x]')
  for (let index = 0; index < hightlightItems.length; index++) {
    const element = hightlightItems[index];
    dict.push({index: index, offsetTop: element.offsetTop, id: element.id})
    //element.classList.add('offset')
    toggleClass(element, 'offset')
  }

  // 模拟UserCard初始动画
  setTimeout(() => {
    //document.querySelector(`#${dict[0].id}`).classList.remove('offset');    
    toggleClass(document.querySelector(`#${dict[0].id}`), 'offset')
  }, 600);
  //log('当前所有特殊元素信息', dict)
  window.addEventListener('scroll',function(){
    let minIndex = 0;
    let minOffsetTop = dict[0].offsetTop
    for (let index = 1; index < dict.length; index++) {
      const data = dict[index];
      if(Math.abs(data.offsetTop - window.scrollY) < Math.abs(minOffsetTop - window.scrollY)){
        minIndex = index
      }
    }

    // for (let index = 0; index < dict.length; index++) {
    //   document.querySelector(`#${dict[index].id}`).classList.add('offset');
    // }
    document.querySelector(`#${dict[minIndex].id}`).classList.remove('offset');

    // 处理导航栏中的 aTag 
    let aTag = document.querySelector(`a[href="#${dict[minIndex].id}"]`)
    let liTag = aTag.parentNode
    let liBrotherNodes = liTag.parentNode.children 
    for (let index = 0; index < liBrotherNodes.length; index++) {
      liBrotherNodes[index].classList.remove('highlight')
      // toggleClass(liBrotherNodes[index], 'highlight')
    }
    liTag.classList.add('highlight')
    // toggleClass(liTag, 'highlight')
  });  

}

var __main = function () {
  // tween 需要的
  requestAnimationFrame(animate);

  loadingAnimation();  
  autoStickNavbar();
  displaySubmenu();
  enableScrollPosition();
  portfolioEvent();
  highlightElement();
}
__main();