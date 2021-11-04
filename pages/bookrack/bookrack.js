import { requestGet, bookInfoURL } from "../../utils/reqeust";
// var isAll=false;
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		id: null,
		bookID: null,
		bookracklist: [],
		// newarray:[],
		resarr: [],
		bookid: null
	},
	onLoad(options) {
		var id = wx.getStorageSync("bookid"); //wx.getStorageSync(key)，获取本地缓存
		this.setData({
			bookid: id
		});
		// console.log(this.data.bookid)
		
		this.getbookRackData();
	},
	async getbookRackData() {
		var id = this.data.testnum;
		const result = await requestGet(bookInfoURL + id);
		this.data.resarr.unshift(result.ResponseObject[0].module.book);
		this.setData({
			bookracklist: [...this.data.bookracklist, ...this.data.resarr],
			bookID: result.ResponseObject[0].module.book.bookId
		});
		console.log(this.data.bookracklist);
		console.log(this.data.resarr);
	}
});
