import { requestGet, bookInfoURL } from "../../utils/reqeust";
var util = require("../../utils/util.js");
Page({
	data: {
		bookinfos: {},
		fold: true, //默认简介折叠
		id: null,
		value: "",
		hobits: [], //相似推荐
		comments: [], //书评
		msg: "加入书架",
		tag: false,
		time: "",
		readdata: "",
		chapterIndex: ""
	},
	//简介折叠
	fold: function () {
		var value = !this.data.fold;
		this.setData({
			fold: value
		});
	},
	onLoad: function (options) {
		this.id = this.options.id;
		this.getBookInfoData();
		var res1 = wx.getStorageSync("bookstore");
		for (let i = 0; i < res1.length; i++) {
			if (this.options.id == res1[i].id) {
				this.setData({
					tag: true,
					msg: res1[i].msg
				});
			}
		}
		// var uname = wx.setStorageSync('uname');
		// if (uname == null || uname == 'undefined') {
		//   this.login = false;
		// } else {
		//   this.login = true;
		// }
	},
	async getBookInfoData() {
		const result = await requestGet(bookInfoURL + this.id);
		const books = result.ResponseObject[0].module.book;
		const score = books.score;
		const hobitlist = books.hobitList.Data;
		const commentlist = result.ResponseObject[0].module.commentList;
		this.setData({
			bookinfos: books,
			value: score,
			hobits: hobitlist,
			comments: commentlist
		});
	},
	// 放入缓存渲染书架页面
	sendid: function () {
		var loding = wx.getStorageSync("key");
		console.log(loding);
		if (loding) {
			this.setData({
				msg: "已加入书架",
				tag: true
			});
			var bookid = this.options.id;
			//1.先获取原来书架数组
			var res = wx.getStorageSync("bookstore");
			if (!res) {
				res = [];
			}
			//获取阅读数据里的阅读时间
			var reads = wx.getStorageSync("readstore");
			if (reads) {
				var findIndex = reads.findIndex((item) => item.id === bookid);
				if (findIndex != -1) {
					this.setData({
						readdata: reads[findIndex].timeStamp,
						chapterIndex: reads[findIndex].chapterIndex
					});
				} else {
					this.setData({
						readdata: "",
						chapterIndex: ""
					});
				}
			} else {
				this.setData({
					chapterIndex: ""
				});
			}

			var findIndex = res.findIndex((item) => item.id === bookid);
			if (findIndex != -1) return;
			res.push({
				id: bookid,
				name: this.data.bookinfos.name,
				author: this.data.bookinfos.author,
				cover: this.data.bookinfos.cover,
				chapterId: this.data.bookinfos.chapterId,
				isCheck: false,
				msg: "已加入书架",
				timeStamp: this.data.readdata,
				chapterIndex: this.data.chapterIndex
			});

			console.log(res, "aaaaa");
			wx.setStorageSync("bookstore", res);
		} else {
			wx.switchTab({
				url: "/pages/mine/mine"
			});
		}
	},

	// 将阅读记录存进缓存渲染浏览记录页面
	startid: function () {
		// var data = util.formatTime(new Date());
		var data = new Date().getTime();
		console.log(data);
		this.setData({
			time: data
		});
		// console.log("阅读")
		var bookid = this.options.id;
		//1.先获取原来阅读数据数组
		var res = wx.getStorageSync("readstore");
		if (!res) {
			res = [];
		} else {
			var findIndex = res.findIndex((item) => item.id === bookid);
			if (findIndex != -1) {
				res[findIndex].timeStamp = this.data.time;
			} else {
				res.push({
					id: bookid,
					name: this.data.bookinfos.name,
					chapterId: this.data.bookinfos.chapterId,
					author: this.data.bookinfos.author,
					cover: this.data.bookinfos.cover,
					isCheck: false,
					timeStamp: this.data.time,
					chapterIndex: 1
				});
			}
		}

		wx.setStorageSync("readstore", res);
		var res2 = wx.getStorageSync("bookstore");
		if (!res2) {
			res2 = [];
		}
		var findIndex = res2.findIndex((item) => item.id === bookid);
		if (findIndex != -1) {
			res2[findIndex].timeStamp = this.data.time;
		}
		wx.setStorageSync("bookstore", res2);
	}
});
