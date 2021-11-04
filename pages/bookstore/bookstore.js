// pages/bookstore/bookstore.js
import {requestGet,bannerURL, homeURL} from "../../utils/reqeust"
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
        url:"/pages/rank/rank",
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
    likeid:null,
    value:null

  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log('搜索' + this.data.value);
    wx.navigateTo({
      url: `/pages/search/search?keyword=${this.data.value}`,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    this.setData({
      value:''
    })
  },
  onClick() {
    console.log('搜索' + this.data.value);
  },

  onLoad() {
    this.getBannerData();
  },
  async getBannerData() {
    const result = await requestGet(bannerURL);
    const resulth=await requestGet(homeURL);
    this.setData({
      banner: result.data.spread[0].advs,
      shortps:resulth.ResponseObject[0].Cards[2].Data,
      populars:resulth.ResponseObject[0].Cards[3].Data,
      likelist:[...resulth.ResponseObject[0].Cards[1].Data,...resulth.ResponseObject[0].Cards[4].Data],
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
		this.setData({
			flag:true
		})
	},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})