var app = getApp();
Page({
  data: {
    imgUrls: [],
    timeList: {},
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
  },
  onLoad:function(){
    var self = this;
    wx.request({
      url: app.globalData.ServerUrl +'index/lunbo',
      success(res) {
        self.setData({
          imgUrls: res.data.data
        })
      }
    });

    wx.request({
      url: app.globalData.ServerUrl+"index/timeList",
      success(res){
        self.setData({
          timeList:res.data.data
        })
      }
    })
  }

})