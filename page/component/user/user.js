// page/component/new-pages/user/user.js
var app = getApp();
Page({
  data: {
    thumb: '',
    nickname: '',
    orders: [],
    hasAddress: false,
    address: {},
    openId: '',
    userId: {},
    weChatUserInfo: {},
    userProfile: {},
  },
  onLoad() {
    var weChatUserInfo = {};
    var self = this;
    var userProfile = {};
    /**
     * 获取用户信息
     */
    wx.login({
      success: function (res) {
        if (res.code) {
          //获取openId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              //小程序唯一标识
              appid: app.globalData.wxData.appId,
              //小程序的 app secret
              secret: app.globalData.wxData.appSecret,
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (openIdRes) {
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              self.setData({
                openId: openIdRes.data.openid,
              })
              var openId = openIdRes.data.openid;
              wx.setStorageSync('userId', openId);
              // 判断openId是否获取成功
              if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {

    

                // 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
                wx.getUserInfo({
                  success: function (res) {
                    // 自定义操作
                    // 绑定数据，渲染页面
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    var gender = userInfo.gender //性别 0：未知、1：男、2：女
                    var userProfile = {
                      nickName: nickName,
                      image_url: avatarUrl,
                      gender: gender,
                      userAccount: openId,
                    };
                    self.setData({
                      userProfile: userProfile,
                      thumb: res.userInfo.avatarUrl,
                      nickname: res.userInfo.nickName
                    });
                    avatarUrl = wx.setStorageSync('avatarUrl', avatarUrl);
                    wx.request({
                      url: app.globalData.ServerUrl + 'user/add',
                      data: userProfile,
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
                      },
                      success(res) {
                        console.log("用户openId保存成功");

                      },

                    });
                  },
                  
                  fail: function (failData) {
                    console.info("用户拒绝授权");
                  }
                });
              } else {
                console.info("获取用户openId失败");
              }

            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }

      }
    }),




      /**
       * 发起请求获取订单列表信息
       */
      wx.request({
        url: 'http://www.gdfengshuo.com/api/wx/orders.txt',
        success(res) {
          self.setData({
            orders: res.data.orders
          })
        }
      });

    
  },




  onShow() {
    var self = this;
    /**
     * 获取本地缓存 地址信息
     */
    wx.getStorage({
      key: 'address',
      success: function (res) {
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })
  },
  /**
   * 发起支付请求
   */
  payOrders() {
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        wx.showModal({
          title: '支付提示',
          content: '<text>',
          showCancel: false
        })
      }
    })
  },



})