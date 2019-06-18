! function () {

  let log = console.log.bind(console)
  let view = View('#site-comments')
  let model = Model({
    tableName: 'Message'
  })

  let controller = Controller({
    commentform: null,
    init: function (view, model) {
      this.commentform = view.querySelector('#commentform')
      this.loadMessage()
    },
    bindEvent: function () {
      let formControls = view.querySelectorAll('.form-control')
      formControls.forEach((inputElement) => {
        inputElement.addEventListener('focus', (e) => {
          e.currentTarget.parentElement.classList.add('used')
        })
      })

      this.commentform.addEventListener('submit', (e) => {
        e.preventDefault()
        this.submitData()
      })
    },
    htmlEncodeByRegExp: function (str) {
      var s = "";
      if (str.length == 0) return "";
      s = str.replace(/&/g, "&amp;");
      s = s.replace(/</g, "&lt;");
      s = s.replace(/>/g, "&gt;");
      s = s.replace(/ /g, "&nbsp;");
      s = s.replace(/\'/g, "&#39;");
      s = s.replace(/\"/g, "&quot;");
      return s;
    },
    addNewMessage: function (data) {
      // debugger
      let commentList = view.querySelector('.commentlist')
      let commentHtml = `<li class="comment">
      <div class="comment-body">
        <div class="comment-meta">
          <div class="avatar-box">
            <img src="./images/headimgs/user${Math.floor(Math.random() * 5 + 1)}.png" class="avatar" alt="" srcset="">
          </div>
          ${data.attributes.UserName}
        </div>
        <div class="comment-content">
          <p>${data.attributes.Content}</p>
          🕒 <span class="time">${data.createdAt.toLocaleString()}</span>
        </div>
      </div>
    </li>`;
      commentList.insertAdjacentHTML('beforeend', commentHtml)
    },
    validData: function () {
      let result = true
      let userNameInput = this.commentform.querySelector('input[name=username]')
      let contentInput = this.commentform.querySelector('textarea[name=comment]')

      let userName = this.htmlEncodeByRegExp(userNameInput.value)
      let content = this.htmlEncodeByRegExp(contentInput.value)
      let errorMsg = []
      if (userName === '') {
        userNameInput.focus()
        errorMsg.push('请留下你的大名')
        result = false
      }

      if (content === '') {
        contentInput.focus()
        errorMsg.push('请填写内容')
        result = false
      }

      return {
        result,
        errorMsg,
        userName,
        content
      }

    },
    submitData: function () {
      let {
        result: success,
        errorMsg,
        userName,
        content
      } = this.validData()

      if (success) {
        this.model.save({
          UserName: userName,
          Content: content
        }).then((msgObject) => {
          this.addNewMessage(msgObject)
          this.commentform.querySelector('textarea[name=comment]').value = ''
        });
      } else {
        alert(errorMsg.join('\n'))
      }

    },
    loadMessage: function () {
      this.model.fetch().then((results) => {
        results.forEach((r) => {
          this.addNewMessage(r)
        })
      }, (error) => {
        log('获取数据失败', error)
      })
    }
  })
  
  controller.init(view, model)

}.call()