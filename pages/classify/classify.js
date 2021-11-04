// pages/classify/classify.js
import { requestGet, classifyURL } from "../../utils/reqeust";
Page({
	/**
	 * 页面的初始数据
	 */

	data: {
		active: 0,
		currentTab: 0,
		male:[],
		female:[]
	},
	switchNav: function (e) {
		var page = this;
		var id = e.target.id;
		if (this.data.currentTab == id) {
			return false;
		} else {
			page.setData({
				currentTab: id
			});
		}
		page.setData({
			active: id
		});
	},

	onLoad: function (options) {
		this.getClassifyData();
	},
	async getClassifyData() {
		const result = await requestGet(classifyURL);
		// console.log(result);
		this.setData({
			male: result.ResponseObject[0].module[0].id=1?result.ResponseObject[0].module[0].itemList:result.ResponseObject[0].module[1].itemList,
			female: result.ResponseObject[0].module[1].id=2?result.ResponseObject[0].module[1].itemList:result.ResponseObject[0].module[0].itemList
		});
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
