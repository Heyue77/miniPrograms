// pages/list/list.js
import { requestGet, homeURL,listURL } from "../../utils/reqeust";
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		bookid: null,
		resultlist: []
	},

	onLoad: function (options) {
		// console.log(options);
		// this.id = options.id;
		this.getBooklist();
	},
	async getBooklist() {
		const result = await requestGet(listURL);
		console.log(result.ResponseObject[0].module.itemList);
		this.setData({
			resultlist: result.ResponseObject[0].module.itemList,
			// bookid: result.ranking.books._id
		});
	},

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
