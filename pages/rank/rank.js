// pages/rank/rank.js
import { requestGet, rankURL } from "../../utils/reqeust";
import Toast from "../../components/vant/toast/toast";
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		malehot: [],
		malehoturl: "",
		femalehot: [],
		femalehoturl: "",
		malepop: [],
		malepopurl: "",
		femalepop: [],
		femalepopurl: "",
		module: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getRankData();
	},
	async getRankData() {
		Toast.loading({
			duration: 0,
			message: "加载中...",
			forbidClick: true,
			loadingType: "spinner",
			selector: "#van-toast"
		});
		const result = await requestGet(rankURL);
		console.log(result.ResponseObject[0].module[0].itemList.bookList);
		Toast.clear();
		this.setData({
			module: result.ResponseObject[0].module,
			malehot: result.ResponseObject[0].module[0].itemList.bookList,
			femalehot: result.ResponseObject[0].module[1].itemList.bookList,
			malepop: result.ResponseObject[0].module[2].itemList.bookList,
			femalepop: result.ResponseObject[0].module[3].itemList.bookList,

			malehoturl: result.ResponseObject[0].module[0].more.slice(10),
			femalehoturl: result.ResponseObject[0].module[1].more.slice(10),
			malepopurl: result.ResponseObject[0].module[2].more.slice(10),
			femalepopurl: result.ResponseObject[0].module[3].more.slice(10)
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
