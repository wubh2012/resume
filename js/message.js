! function () {

  var log = console.log.bind(console)
  let view = document.querySelector('#site-comments')

  let controller = {
    view: null,
    commentform: null,
    messageObject: null,
    tableName: 'Message',
    init: function () {
      this.view = view
      this.commentform = view.querySelector('#commentform')
      this.initLeanCloud()
      this.bindEvent()
      this.fetchData()
    },
    initLeanCloud: function () {
      var APP_ID = 'JgCm0IiBH9kIpUYKSBXRqdxA-gzGzoHsz';
      var APP_KEY = 'KMV2jfE6pWiw4oK7nyPJutem';

      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });

      this.messageObject = AV.Object.extend(this.tableName);
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
    addNewData: function (data) {
      let commentList = view.querySelector('.commentlist')
      let commentHtml = `<li class="comment">
      <div class="comment-body">
        <div class="comment-meta">
          <div class="avatar-box">
            <img src="./images/headimgs/user1.png" class="avatar" alt="" srcset="">
          </div>
          ${data.attributes.UserName}
        </div>
        <div class="comment-content">
          <p>${data.attributes.Content}</p>
          🕒 <span class="time">${data.createdAt}</span>
        </div>
      </div>
    </li>`;
      commentList.insertAdjacentHTML('beforeend', commentHtml)
    },
    submitData: function () {
      var msgObject = new this.messageObject();
      msgObject.set('UserName', this.htmlEncodeByRegExp(this.commentform.querySelector('input[name=username]').value));
      msgObject.set('Content', this.htmlEncodeByRegExp(this.commentform.querySelector('textarea[name=comment]').value));
      if(msgObject.attributes.Content === ''){
        this.commentform.querySelector('textarea[name=comment]').focus()
        alert('不说点什么吗？')
        return;
      }
      if(msgObject.attributes.UserName === ''){
        this.commentform.querySelector('input[name=username]').focus()
        alert('请留下你的大名')
        return;
      }

      msgObject.save()
        .then(function (msgObject) {
          log('数据提交成功', msgObject)
        }, function (error) {
          log('数据提交失败', error)
        })
        .then(() => {
          this.addNewData(msgObject)
          this.commentform.querySelector('textarea[name=comment]').value = ''
        });
    },
    fetchData: function () {
      var query = new AV.Query(this.tableName)
      query.find().then((results) => {
        results.forEach((r) => {
          this.addNewData(r)
        })
      }, (error) => {
        log('获取数据失败', error)
      })
    }
  }

  controller.init()

}.call()