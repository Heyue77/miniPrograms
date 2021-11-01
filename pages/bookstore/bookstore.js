// pages/bookstore/bookstore.js
import {requestGet,bannerURL} from "../../utils/reqeust"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[],
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
     
    ],
    shortps:[],
    populars:[],
    likelist:[],
    shortpid:null,
    popid:null,
    likeid:null

  },

  onLoad() {
    this.getBannerData();
  },
  async getBannerData() {
    const result = await requestGet(bannerURL);
    this.setData({
      banner: result.data.spread[0].advs,
      shortps:result.data.nodes[0].books.slice(0,2),
      populars:result.data.nodes[1].books.slice(0,4),
      likelist:result.data.nodes[2].books,
      shortpid: result.data.nodes[0]._id,
      popid:result.data.nodes[1]._id,
      likeid: result.data.nodes[2]._id
    });
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