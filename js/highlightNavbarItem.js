!function () {

  let dict = []
  let initDictData = function () {
    let hightlightItems = document.querySelectorAll('[data-x]')
    for (let index = 0; index < hightlightItems.length; index++) {
      const element = hightlightItems[index];
      dict.push({
        index: index,
        offsetTop: element.offsetTop,
        id: element.id
      })
      element.classList.add('offset')
    }
  }

  let processNavBarATag = function(elementId){
    let aTag = document.querySelector(`a[href="#${elementId}"]`)
    let liTag = aTag.parentNode
    let liBrotherNodes = liTag.parentNode.children
    for (let index = 0; index < liBrotherNodes.length; index++) {
      liBrotherNodes[index].classList.remove('highlight')
    }
    liTag.classList.add('highlight')
  }

  let findClosetAndRemoveOffset = function () {
    let minIndex = 0;
    let minOffsetTop = dict[0].offsetTop
    for (let index = 1; index < dict.length; index++) {
      const data = dict[index];
      if (Math.abs(data.offsetTop - window.scrollY) < Math.abs(minOffsetTop - window.scrollY)) {
        minIndex = index
      }
    }
    document.querySelector(`#${dict[minIndex].id}`).classList.remove('offset')
    document.querySelector(`#${dict[(minIndex - 1 < 0 ? 0 : minIndex - 1) ].id}`).classList.remove('offset')


    // 处理导航栏中的 aTag 
    processNavBarATag(dict[minIndex].id)
  }

  let bindEvent = function () {
    window.addEventListener('scroll', function () {
      findClosetAndRemoveOffset()
    });
  }

  let __main = function () {
    initDictData()
    bindEvent()
  }

  __main()

}.call()