import {
	requestGet,
	getBookMenuURL,
	getBookDetailURL,
	getPlayPathURL
} from "../../utils/reqeust";
const app = getApp();
const myaudio = wx.createInnerAudioContext({});
Page({
	data: {
		pageIndex: 1,
		resource: [],
		resourcem: [],
		resourceb: [],
		bookId: [],
		section: "",
		id: null,
		url: "",
		tag: false,
		itesection: 0
	},

	onLoad: function (options) {
		console.log(options);
		this.setData({
			id: options.id
		});
		this.getResourceData();
		this.getResourcemData();
	},
	bofang(e) {
		console.log(e.currentTarget.dataset.section, this.data.bookId);
		this.setData({
			section: e.currentTarget.dataset.section
		});
		this.getResourcebData().then(() => {
			myaudio.src = this.data.url;
			// console.log(this.data.url)
			// myaudio.play();
			this.setData({
				tag: !this.data.tag
			});
			if (this.data.tag == false) {
				myaudio.pause();
				this.setData({
					section: 0
				});
			} else if (this.data.tag == true) {
				myaudio.play();
				this.setData({
					btntag: true
				});
			}
		});
	},

	async getResourceData() {
		// const result = await requestGet("https://m.lrts.me/ajax/getBookMenu?bookId=5181&pageNum=1&pageSize=50&sortType=0")
		const result = await requestGet(`${getBookMenuURL}`, {
			bookId: this.data.id,
			pageNum: this.data.pageIndex,
			pagesize: 50,
			_limit: 10
		});
		this.setData({
			resource: [...this.data.resource, ...result.list],
			bookId: this.data.id
		});
	},

	async getResourcemData() {
		const result = await requestGet(`${getBookDetailURL}`, {
			bookId: this.data.id
		});
		this.setData({
			resourcem: result
		});
	},
	// 获取播放资源
	async getResourcebData() {
		// const result = await requestGet("https://m.lrts.me/ajax/getPlayPath?entityId=36816&entityType=3&opType=1&sections=%5B1%5D&type=0")
		const result = await requestGet(`${getPlayPathURL}`, {
			entityId: this.data.id,
			entityType: 3,
			opType: 1,
			sections: [this.data.section]
		});
		// console.log(result.list[0])
		this.setData({
			resourceb: result.list[0],
			url: result.list[0].path
		});
	},

	onReachBottom: function () {
		this.setData({
			pageIndex: ++this.data.pageIndex
		});
		// console.log(this.data.pageIndex);
		this.getResourceData();
	},

	onPullDownRefresh: function () {
		this.setData({
			pageIndex: 1,
			list: []
		});
		//当异步任务有了结果之后，就可以停止下拉刷新
		this.getResourceData().then(() => {
			wx.stopPullDownRefresh();
		});
	}
});
