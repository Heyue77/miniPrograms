// pages/list/list.js
import { requestGet, homeURL, listURL } from "../../utils/reqeust";
import Toast from "../../components/vant/toast/toast";
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		bookid: null,
		resultlist: [],
		pageindex: 5,
		lodflag: false,
		flag: false
	},

	onLoad: function (options) {
		
		this.setData({
			pageindex:options.id
		})
		this.getBooklist()
	},
	async getBooklist() {
		// Toast.loading({
		// 	duration: 0,
		// 	message: "加载中...",
		// 	forbidClick: true,
		// 	loadingType: "spinner",
		// 	selector: "#van-toast"
		// });
		const result = await requestGet(listURL + this.data.pageindex);
		// console.log(result.ResponseObject[0].module.itemList);
	
		this.setData({
			resultlist: [
				...this.data.resultlist,
				...result.ResponseObject[0].module.itemList
			]
		});
	},
	onReady: function () {
		
	},
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
	onReachBottom: function () {
		this.setData({
			pageindex: ++this.data.pageindex,
			lodflag: true
		});
		this.getBooklist()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
});
