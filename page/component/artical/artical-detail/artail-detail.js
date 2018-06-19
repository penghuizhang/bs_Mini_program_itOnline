// page/component/artical/artical-detail/artail-detail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    artical:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var self = this;
      console.log(options.id);
      var id = options.id;
      //用户进行阅读，阅读数+1
      wx.request({
        url: app.globalData.ServerUrl + 'artical/addReadNum/' + id
      })
      wx.request({
        url: app.globalData.ServerUrl +'artical/getartical/'+id,
        success(res){
          self.setData({
            artical:res.data.data
          })
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