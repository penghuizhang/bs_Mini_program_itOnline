
var app = getApp();

Page({
  data: {
    category: [],
    courselist: [],
    curIndex: 1,
    isScroll: false,
    toView: 'qianduan',
    
  },
 

  onLoad() {
    var self = this;

    wx.request({
      url: app.globalData.ServerUrl + 'course/category',
      success(res) {
        self.setData({
          category: res.data.data,
        })
      }
    }),

    wx.request({
      url: app.globalData.ServerUrl + '/course/category/' + self.data.curIndex + '/lists',
      success: function (res) {
        self.setData({
          courselist: res.data.data
        })
      }
    })
  },
  switchTab(e) {
    const self = this;
    this.setData({
      isScroll: true
    })
    setTimeout(function () {
      self.setData({
        toView: e.target.dataset.id,
        curIndex: e.target.dataset.index,

      }),
        wx.request({
          url: app.globalData.ServerUrl + '/course/category/' + self.data.curIndex + '/lists',
          success: function (res) {
            self.setData({
              courselist: res.data.data
            })
          }
        })
    }, 0)

    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)


  }

})