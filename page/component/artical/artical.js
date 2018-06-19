// page/component/artical/artical.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articalList:[],
    articalCount:"",
    isShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: app.globalData.ServerUrl+'artical/index',
      success:function(res){
        self.setData({
          articalList: res.data.data
        })
      }
    });
    wx.request({
      url: app.globalData.ServerUrl +'artical/count',
      success(res){
        self.setData({
          articalCount: res.data.data
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
    var self = this;
    var articalList = this.data.articalList;
    console.log("上拉触发==="+articalList.length);
    wx.request({
      url: app.globalData.ServerUrl + 'artical/index',
      success: function (res) {
        self.setData({
          articalList: res.data.data
        })
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      var self = this;
      var totalcount = this.data.articalCount
      //获取到当前列表中多少条数据，下次更新将新的7条数据进行拼接
      var id = this.data.articalList.length;
      var articaList = this.data.articalList;
      if(articaList.length == totalcount){
        this.setData({
          isShow:true
        })
      }else{
        wx.request({
          url: app.globalData.ServerUrl + '/artical/addData/' + id,
          success: function (res) {
            var newArticalList = res.data.data;
            var returnList = articaList.concat(newArticalList);
            self.setData({
              articalList: returnList
            })
          }
        })
      }
      
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})