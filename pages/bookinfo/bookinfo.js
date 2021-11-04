import { requestGet, bookInfoURL } from "../../utils/reqeust";
Page({
	data: {
		bookinfos: {},
		fold: true,
		id: null,
		value: ""
	},
	fold: function () {
		var value = !this.data.fold;
		this.setData({
			fold: value
		});
	},
	onLoad: function (options) {
		// this.id = options.id;
		this.getBookInfoData();
	},
	async getBookInfoData() {
		const result = await requestGet(bookInfoURL + this.options.id);
		const books = result.ResponseObject[0].module.book;
		const score = books.score;
		this.setData({
			bookinfos: books,
			value: score
		});
	},
	sendid: function () {
		console.log("加入书架成功", this.options.id);
		// var bookid = this.options.id;
		wx.setStorage({
			key: "key",
			data: this.options.id
		});
	}
});
