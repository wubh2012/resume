window.Model = function (options) {
  let tableName = options.tableName
  return {
    init: function () {
      var APP_ID = 'JgCm0IiBH9kIpUYKSBXRqdxA-gzGzoHsz';
      var APP_KEY = 'KMV2jfE6pWiw4oK7nyPJutem';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    fetch: function () {
      var query = new AV.Query(tableName)
      return query.find();
    },
    save: function (msgObj) {
      let MessageObject = AV.Object.extend(tableName);
      var msgObject = new MessageObject();
      return msgObject.save(msgObj)
    }
  }

}