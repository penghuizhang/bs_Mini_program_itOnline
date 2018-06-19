var app = getApp();
var questionData=[];
var python = [
  {
    id: 1,
    type: '单选',
    q: 'Python支持使用字典的“键”作为下标来访问字典中的值。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }, { label: 'C', text: '错误' }, { label: 'D', text: '错误' }],
    a: 'A',
    
  },
  {
    id: 2,
    type: '单选',
    q: '列表可以作为字典的“键”。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    
  },
  {
    id: 3,
    type: '单选',
    q: '元组可以作为字典的“键”。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
   
  },
  {
    id: 4,
    type: '单选',
    q: '字典的“键”必须是不可变的。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    
  },
  {
    id: 5,
    type: '单选',
    q: '已知x为非空列表，那么表达式 sorted(x, reverse=True) == list(reversed(x)) 的值一定是True。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
   
  },
  {
    id: 6,
    type: '单选',
    q: '已知x为非空列表，那么x.sort(reverse=True)和x.reverse()的作用是等价的。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    
  },
  {
    id: 7,
    type: '单选',
    q: '生成器推导式比列表推导式具有更高的效率，推荐使用。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
   
  },
  {
    id: 8,
    type: '单选',
    q: 'Python集合中的元素不允许重复。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
   
  },
  {
    id: 9,
    type: '单选',
    q: 'Python集合可以包含相同的元素。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 10,
    type: '单选',
    q: 'Python字典中的“键”不允许重复。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 11,
    type: '单选',
    q: 'Python字典中的“值”不允许重复。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 12,
    type: '单选',
    q: 'Python集合中的元素可以是元组。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 13,
    type: '单选',
    q: 'Python集合中的元素可以是列表。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 14,
    type: '单选',
    q: 'Python字典中的“键”可以是列表。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 15,
    type: '单选',
    q: 'Python字典中的“键”可以是元组。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 16,
    type: '单选',
    q: 'Python列表中所有元素必须为相同类型的数据。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 17,
    type: '多选',
    q: 'Python列表中所有元素必须为相同类型的数据。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }, { label: 'C', text: '未知' }, { label: 'D', text: '不确定' }],
    a: 'B,D',
    isStore: true,
    isAnswer: 0
  },
  {
    id: 18,
    type: '多选',
    q: 'Python列表中所有元素必须为相同类型的数据。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }, { label: 'C', text: '未知' }, { label: 'D', text: '不确定' }],
    a: 'A,B',
    isStore: true,
    isAnswer: 0
  }, 
  {
    id: 19,
    type: '单选',
    q: 'Python列表中所有元素必须为相同类型的数据。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }, { label: 'C', text: '未知' }, { label: 'D', text: '不确定' }],
    a: 'B,C',
    isStore: false,
    isAnswer: 0
  },
  
]
function getData(){
  wx.request({
    url: app.globalData.ServerUrl + 'exam/unit/1',
    success(res) {
      questionData = res.data;
      console.log("iiiiiiiiiiiiiiiiiii=" + questionData);
    }
  })
  return questionData;
}
  

console.log("ddddddddddd=" + questionData);


module.exports = {
  data: python
}