<<<<<<< HEAD

var app = getApp();

Page({
  data: {
    category: [
      // { name:'前端开发',id:'qianduan'},
      // {name:'后端开发',id:'houduan'},
      // {name:'移动开发',id:'yidong'},
      // {name:'数据库',id:'shujuku'},
      // {name:'人工智能',id:'rengongzhineng'},
      // {name:'云计算',id:'yunjisuan'},
      // {name:'运维测试',id:'yunwei'},
      // {name:'UI设计',id:'ui'},
      // { name: '实战课程', id: 'shizhan' }

    ],
    courselist: [],

    detail: [],
    curIndex: 1,
    isScroll: false,
    toView: 'qianduan'
  },
  // onLoad(){
  //   if (wx.getStorageSync(curIndex) == None) {
  //     curIndex = 1;
  //   } else {
  //     curIndex = wx.getStorageSync(curIndex);  
  //   }
  //   this.setDate({
  //     curIndex : curIndex
  //   })
  // },

  onLoad() {
    var self = this;

    // wx.request({
    //     url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
    //     // url: app.globalData.ServerUrl + 'course/category',
    //     success(res){
    //         self.setData({
    //             detail : res.data
    //         })
    //     }
    // });

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

=======
Page({
    data: {
        category: [
            {name:'果味',id:'guowei'},
            {name:'蔬菜',id:'shucai'},
            {name:'炒货',id:'chaohuo'},
            {name:'点心',id:'dianxin'},
            {name:'粗茶',id:'cucha'},
            {name:'淡饭',id:'danfan'}
        ],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: 'guowei'
    },
    onReady(){
        var self = this;
        wx.request({
            url:'http://www.gdfengshuo.com/api/wx/cate-detail.txt',
            success(res){
                console.log(res.data)
                self.setData({
                    detail : res.data.result
                })
            }
        });
        
    },
    switchTab(e){
        this.setData({
            toView : e.target.dataset.id,
            curIndex : e.target.dataset.index
        })
    }
    
>>>>>>> parent of 68602df... 修复分类滚动bug
})