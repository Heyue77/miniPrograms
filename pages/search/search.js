// pages/search/search.js
import { requestGet, searchURL } from "../../utils/reqeust";
const app = getApp();
const getInf = (str, key) =>
	str
		.toString()
		.replace(new RegExp(`${key}`), `%%${key}%%`)
		.split("%%");
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		value: "",
		booklist: [],
		loading: true,
		pageIndex: 1,
		showtitle: true
		// booklistcopy:[],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(options);
		this.setData({
			value: options.keyword
		});
	},
	onChange(e) {
		this.setData({
			value: e.detail,
			showtitle: false
		});
	},
	onSearch() {
		this.setData({
			showtitle: true
		});

		console.log("搜索" + this.data.value);
		wx.navigateTo({
			url: `/pages/search/search?keyword=${this.data.value}`,
			success: (result) => {},
			fail: () => {},
			complete: () => {}
		});
	},



	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.getSearchData();
	},
	async getSearchData() {
		const result = await requestGet(searchURL + this.data.value);
		console.log(result);
		this.setData({
			booklist: [
				...this.data.booklist,
				...result.ResponseObject[0].module.bookList
			],
			loading: false
		});
		const newData = this.data.booklist;
		for (let i = 0; i < this.data.booklist.length; i++) {
			const dic = this.data.booklist[i];
			const newDic = newData[i];
			const name = dic["name"];
			newDic["name"] = getInf(name, this.data.value);
      const author =dic["author"];
      newDic["author"] = getInf(author, this.data.value);
      const status =dic["status"];
      newDic["status"] = getInf(status, this.data.value);
      // const score =dic["score"];
      // newDic["score"] = getInf(score, this.data.value);
			// var introduce = dic["introduce"];
			// newDic["introduce"] = getInf(introduce, this.data.value);
		}
		this.setData({
			booklist: newData
		});
	},
	// trim: function (s) {
	// 	return s.replace(/(^\s*)|(\s*$)/g, "");
	// },

  onReachBottom: function () {
		this.setData({
			pageIndex: ++this.data.pageIndex
		});
		// console.log(this.data.pageIndex);
		this.getSearchData();
	},

	// 下拉刷新
	onPullDownRefresh: function () {
		this.setData({
			pageIndex: 1,
			list: []
		});
		//当异步任务有了结果之后，就可以停止下拉刷新
		this.getSearchData().then(() => {
			wx.stopPullDownRefresh();
		});
	}
});
