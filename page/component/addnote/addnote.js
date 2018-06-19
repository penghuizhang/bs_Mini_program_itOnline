// page/component/course/note/note.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      openid:"",
      code:"",
      lesson_id:"",
      message:"",
      courseNote:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log("notes");
      
      var lesson_id = options.lesson_id;
      console.log("lesson_id"+lesson_id);

      this.setData({
        lesson_id :lesson_id
      })
     
  },


  click:function(e){
    var code="";
    var that = this;
    var message = e.detail.value.message;
    var openid = wx.getStorageSync('userId');
    console.log("打印openid====="+openid);
    var lesson_id = this.data.lesson_id;
    console.log("打印lesson_id=====" + lesson_id);
    var user_id = wx.getStorageSync('userId');
    var courseNote = {
      userAccount_id: openid,
      note_message: message
    }
    wx.request({
      url: app.globalData.ServerUrl +'note/add',
      method: 'POST',
      data:{
        userAccount: openid,
        note_message: message,
        lesson_id : lesson_id,
        user_id: user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success(res){
        console.log("res.data"+res.data);
        if (res.data.data =="写入成功"){
          wx.showToast({ 
            title: '提交成功',
            icon: 'success',
            duration: 4500
          });

          setTimeout(function () {
            wx.navigateBack({
              url: "course/play/play"
            })
          }, 2000)
          
        }
        else{
          wx.showToast({
            title: '提交失败',
            icon: 'error'
          })
        }
      }
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})