App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    //开发者服务器地址 
    ServerUrl: 'http://springboot.ngrok.xiaomiqiu.cn/',
    ImageServerUrl: "http://kylin.ngrok.xiaomiqiu.cn",
    //公众号信息

    wxData: {
      appId: 'wxa****79b9c',
      appSecret: '1c97721c***************7441911682',
    }
  }

})
