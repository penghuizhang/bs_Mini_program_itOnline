// page/component/new-pages/user/user.js
var app = getApp();
var current_time = require("../../../util/util.js");
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
    brand: '',
    model: '',
    flag: true,
    hiddenModal: true,
    email:"",
    isLogin:false,
    courseList:[]
  },

  onLoad() {
    wx.startPullDownRefresh();
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
                    var nickname = wx.getStorageInfoSync("nickname");
                    if (nickname == null || nickname == undefined || nickname == '') {
                      self.setData({
                        isLogin: false
                      })
                    } else {
                      var xx = self;
                      wx.request({
                        url: app.globalData.ServerUrl + 'user/course/lists',
                        data: {
                          openId: wx.getStorageSync('userId'),
                        },
                        success(res) {
                          xx.setData({
                            isLogin: true,
                            courseList:res.data
                          })
                          console.log("输出学生的学习课程");
                        } 
                      })
                    };
                    var userProfile = {
                      nickName: nickName,
                      imageUrl: avatarUrl,
                      gender: gender,
                      useraccount: wx.getStorageSync('userId'),
                      city: userInfo.city,
                      province: userInfo.province,
                      country : userInfo.country
                    };
                    var studentProfile = userProfile;
                    self.setData({
                      studentProfile: studentProfile,
                      thumb: res.userInfo.avatarUrl,
                      nickname: res.userInfo.nickName,
                      flag:false
                    });
                    nickName = wx.setStorageSync('nickname', nickName);
                    avatarUrl = wx.setStorageSync('avatarUrl', avatarUrl);
                    wx.request({
                      url: app.globalData.ServerUrl + 'user/add',
                      data: studentProfile,
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
          });
          wx.request({
            url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
            data:{
              appid: app.globalData.wxData.appId,
              secret: app.globalData.wxData.appSecret
            },
            method:'GET',
            header: { 'content-type': 'application/json' },
            success: function(res){
                var obj = {};
                obj.access_token = res.data.access_token;
                obj.expires_in = Date.now()+res.data.expires_in*1000-600000;
                wx.setStorageSync('accessToken', obj);
            }
          })
        }
      }
    })
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
  submit: function (e) {
    /**
     * 获取到当前的form_id 写到数据库中
     */
   var  formId = e.detail.formId;
    wx.request({
      url: app.globalData.ServerUrl + 'common/formId',
      data: {
        formId: formId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      method: 'POST',
      success: function (res) {
        console.log(formId);
        console.log(res);
      },
      fail: function (res) {
        console.log(formId)
        console.log(err);
      }
    });


    var tourse= wx.getStorageSync('userId');
    var token = wx.getStorageSync('accessToken').access_token;
    console.log("..................")
    wx.getSystemInfo({
      success: function(res) {
        wx.setStorageSync('model', res.model)
      },
     
    })
    //向用户发送登录成功的数据，在此前，系统未获得该用户任何数据
    var date = new Date();
    var times = date.getFullYear() + "年" + date.getMonth()+1 + "月" + date.getDate();
   
    var datas = {
      touser: tourse,
      template_id: '7Pj4SMb8cAy0YdrLZh4RBDElIHEjbbT7yWUVlXejYBw',
      form_id: e.detail.formId,
      data: {
        'keyword1': {
          'value': wx.getStorageSync('nickname'),
          // 'color':,
        },
        'keyword2': {
          'value': times,
          // 'color': '',
        },
        'keyword3': {
          'value': wx.getStorageSync('model'),
          // 'color': '',
        },
        'keyword4': {
          'value': '如果不是本人登录系统，请检查安全',
          // 'color': '',
        },
        emphasis_keyword: 'keyword1.DATA'  
      }
    }
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token,
      data:datas,
      method:'POST',
      success:function(res){
        console.log("push msg");
        console.log(res);
      },
      fail:function(res){
        console.log("push err")
        console.log(err);
      }
    })
  },
  /**
   * 添加用户的邮箱，发邮件
   */
  
    listenerButton: function () {
      this.setData({
        hiddenModal: !this.data.hiddenModal
      })
    },

    confirm: function (e) {
      this.setData({
        hiddenModal: !this.data.hiddenModal
      })
      wx.request({
        url: app.globalData.ServerUrl + 'user/email/add',
        data: {
          email: this.data.email,
          openId: this.data.openId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        method: 'POST',
        success: function (res) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (res) {
          wx.showToast({
            title: '失败',
            icon: 'fail',
            duration: 2000
          })
        }
      });
     
    },

    cancel: function () {
      this.setData({
        email:""
      })
    },
    onBindInput:function(e){
      var email = e.detail.value;
      this.setData({
        email:email
      })
    }
})
