import { requestGet,baseURL } from "../../utils/reqeust";

// pages/rankmore/rankmore.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		title: "",
    resultlist:[]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
    
		this.setData({
			title: options.title
		});
    this.getRankData();
	},
  async getRankData(){
    const result=await requestGet(baseURL+`actionid=${this.options.actionid}&id=${this.options.id}&name=${this.options.name}&type=${this.options.Type}&Channel=${this.options.Channel}`);
    console.log(result)
    this.setData({
      resultlist: result.ResponseObject[0].module.itemList
    })
  },

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
});
