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
    // ServerUrl: 'http://i933uod.hk1.mofasuidao.cn/library/',
    ServerUrl: 'http://kylin.viphk.ngrok.org/',
    ImageServerUrl: 'http://kylin5221.free.ngrok.cc',
    //公众号信息

    wxData: {
      appId: 'wxa24993353a279b9c',
      appSecret: '1c97721c79ffc2ddaa10cc7441911682',
    }
  }

})
