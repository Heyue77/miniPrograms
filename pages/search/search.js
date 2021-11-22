// pages/search/search.js
import { requestGet, searchURL } from "../../utils/reqeust";
const app = getApp();
// const getInf = (str, key) =>
// 	str
// 		.toString()
// 		.replace(new RegExp(`${key}`), `%%${key}%%`)
// 		.split("%%");
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
		this.getSearchData()
	},

	async getSearchData() {
		const result = await requestGet(searchURL + this.data.value);
		console.log(result);
		this.setData({
			booklist: [...this.data.booklist,...result.ResponseObject[0].module.bookList]||[],
			loading: false
		});
		var searchList = this.data.booklist;
		searchList.forEach(v=>{    
			v.name = v.name.replace(new RegExp(this.data.value,"g"),"<span style='color: #c74343f6;'>"+this.data.value+"</span>")
			v.name = `<div class="tp">${v.name}</div>`
			v.author = v.author.replace(new RegExp(this.data.value,"g"),"<span style='color: #c74343f6;'>"+this.data.value+"</span>")
			v.author = `<div class="tp">${v.author}</div>`
			v.status = v.status.replace(new RegExp(this.data.value,"g"),"<span style='color: #c74343f6;'>"+this.data.value+"</span>")
			v.status = `<div class="tp">${v.status}</div>`
			v.introduce = v.introduce.replace(new RegExp(this.data.value,"g"),"<span style='color: #c74343f6;'>"+this.data.value+"</span>")
			v.introduce = `<div class="tp">${v.introduce}</div>`
		  })
		this.setData({
			booklist: searchList
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
			value: this.data.value,
			showtitle: true
		});

		console.log("搜索" + this.data.value);
		// this.getSearchData();
		// console.log(this.data.booklist)
		wx.reLaunch({
			url: `/pages/search/search?keyword=${this.data.value}`,
			success: (result) => {},
			fail: () => {},
			complete: () => {}
		});
	},

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
