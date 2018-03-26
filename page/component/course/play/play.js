var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {
      id: 1,      
      image: '/image/b4.jpg',
      title: '新鲜梨花带雨',
      price: 0.01,
      stock: '有货',
      detail: '这里是梨花带雨详情。',
      parameter: '125g/个',
      service: '不支持退货'
    },
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    lesson_id:"",
    video:[],
    common:{},

    comment:{},
    note:{},

    avatarUrl:"",
  },
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index,
      avatarUrl: wx.getStorageSync('avatarUrl')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var self = this;
    var video_id = options.id;
    var lesson_id = options.lesson_id;
    console.log("lesson_id为"+lesson_id);
    console.log("play/play页面传过来的id为" + video_id);
    var openId = wx.getStorageSync('userId');
    console.log("播放页面信息打印openid"+openId);
    //进行验证，如果没有登录，进行跳转，跳转到登录页面
    if(openId == ''){
      wx.showModal({
        title: '提示',
        content: '进行登录',
        success: function (res) {
          wx.switchTab({
            url: '/page/component/user/user',
          })
        }
      })
    }else{
      //已经进行登录过，此时可以获取到用户openid，可以进行播放上个页面传过来的视频
      wx.request({
        url: app.globalData.ServerUrl + 'play/video_id/'+video_id+'/lesson_id/'+lesson_id,
        success(res) {
          self.setData({
            video: res.data.data,
            lesson_id:res.data.data.lesson_id,
          })
        }
      })
    }  


    wx.request({
      url: app.globalData.ServerUrl +"note/lists/"+lesson_id,
      success(res){
        self.setData({
          comment:res.data
        })
      }
    })

  },

  // 通过笔记-->添加按钮进行跳转提交自己的笔记
  add_note:function(e){
    var lesson_id = this.data.lesson_id;
    wx.navigateTo({
      url: '../../addnote/addnote?lesson_id='+lesson_id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
        console.log("到底了啦")
        wx.navigateTo({
          url: '../messagelists/messagelists?lesson_id='+this.data.lesson_id,
        })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})