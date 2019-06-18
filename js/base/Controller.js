window.Controller = function (options) {
  let init = options.init
  
  let obj = {
    view: null,
    model: null,
    init: function (view, model) {
      this.view = view
      this.model = model
      this.model.init()
      init.call(this, view, model)
      this.bindEvent()
    },
    bindEvent: function(){}
  }

  for(let key in options){
    if(key !== 'init'){
      obj[key] = options[key]
    }
  }

  return obj

}