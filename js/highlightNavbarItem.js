!function(){
  
  let dict = []
  let hightlightItems = document.querySelectorAll('[data-x]')
  for (let index = 0; index < hightlightItems.length; index++) {
    const element = hightlightItems[index];
    dict.push({index: index, offsetTop: element.offsetTop, id: element.id})
    element.classList.add('offset')
  }

  // 模拟UserCard初始动画
  setTimeout(() => {
    document.querySelector(`#${dict[0].id}`).classList.remove('offset');    
  }, 600);

  window.addEventListener('scroll',function(){
    let minIndex = 0;
    let minOffsetTop = dict[0].offsetTop
    for (let index = 1; index < dict.length; index++) {
      const data = dict[index];
      if(Math.abs(data.offsetTop - window.scrollY) < Math.abs(minOffsetTop - window.scrollY)){
        minIndex = index
      }
    }

    document.querySelector(`#${dict[minIndex].id}`).classList.remove('offset');

    // 处理导航栏中的 aTag 
    let aTag = document.querySelector(`a[href="#${dict[minIndex].id}"]`)
    let liTag = aTag.parentNode
    let liBrotherNodes = liTag.parentNode.children 
    for (let index = 0; index < liBrotherNodes.length; index++) {
      liBrotherNodes[index].classList.remove('highlight')
    }
    liTag.classList.add('highlight')
  });  

}.call()