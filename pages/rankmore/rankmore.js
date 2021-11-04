import { requestGet, baseURL } from "../../utils/reqeust";
import Toast from "../../components/vant/toast/toast";

// pages/rankmore/rankmore.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		title: "",
		pageindex: 1,
		resultlist: [],
		flag:false
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
	onClickLeft() {
		wx.navigateBack({
			delta: 1
		});
	},
	async getRankData() {
		Toast.loading({
			duration: 0,
			message: "加载中...",
			forbidClick: true,
			loadingType: "spinner",
			selector: "#van-toast"
		});
		const result = await requestGet(
			baseURL +
				`actionid=${this.options.actionid}&id=${this.options.id}&name=${this.options.name}&type=${this.options.Type}&Channel=${this.options.Channel}&pageindex=${this.data.pageindex}`
		);
		// console.log(result)
		Toast.clear();
		this.setData({
			resultlist: [
				...this.data.resultlist,
				...result.ResponseObject[0].module.itemList
			]
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
	onReachBottom: function () {
		this.setData({
			pageindex: ++this.data.pageindex,
			flag:true
		});
		this.getRankData();
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
});
