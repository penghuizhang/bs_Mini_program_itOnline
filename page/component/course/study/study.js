var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courselists:[],
    courseId:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
      console.log(options.id);
      var id= options.id;
      // http  @GetMapping
      wx.request({
        //将点击的课程的id进行传递到下一个播放页面，或者跳转更新这个页面，播放其他课程章节
        url: app.globalData.ServerUrl + 'study/'+id +'/lists',
        success(res){
          self.setData({
            courselists:res.data.data,
            courseId:res.data.data[0].id
          })
        }
      })
      wx.setStorageSync("current_lessonId", self.data.courseId);
      //点击了这个页面，进行记录信息
  },
  study_start:function(e){
    console.log("点击了视频文件");
    var Id = e.currentTarget.id;
    wx.setStorageSync("current_video_id", Id)
    console.log(Id);
    var student_id = wx.getStorageSync('userId');
    console.log(student_id);
    //提交数据，上传数据为课程名id，用户id，写到数据库中
    wx.request({
      url: app.globalData.ServerUrl + 'user/userlist/add',
      data:{
        useraccount:student_id,
        courseId: this.data.courseId
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success(res){
        console.log("11111111");
        console.log("添加成功");
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
    console.log("到底了")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
  

})