// pages/bookstore/bookstore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slide:[
      {
        id:1,
        name:"分类",
        url:"/pages/classify/classify",
        icon:"/assets/imgs/分类.png",
        link:"navigateTo"
      },
      {
        id:2,
        name:"排行榜",
        url:"/pages/list/list",
        icon:"/assets/imgs/排行榜.png",
        link:"navigateTo"
      },
      {
        id:3,
        name:"听书",
        url:"/pages/listen/listen",
        icon:"/assets/imgs/听书.png",
        link:"switchTab"
      }
     
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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