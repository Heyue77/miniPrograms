// pages/classifyinfo/classifyinfo.js
import { requestGet,baseURL } from "../../utils/reqeust";
Page({
	data: {
		title: "",
		booklist:[]
	},

	onLoad: function (options) {
		console.log(options);
		this.setData({
			title: options.title
		});
		this.getRankmoreData();
	},
	onClickLeft() {
		wx.navigateTo({
			url: "/pages/classify/classify"
		});
	},
    async getRankmoreData(){
       const result=await requestGet(baseURL+`actionid=${this.options.actionid}&type=${this.options.type}&id=${this.options.id}&name=${this.options.title}`);
	   console.log(result);
	   this.setData({
         booklist:result.ResponseObject[0].module.itemList
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
