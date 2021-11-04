// pages/classifyinfo/classifyinfo.js
import { requestGet,baseURL } from "../../utils/reqeust";
Page({
	data: {
		title: "",
		booklist:[],
		loading: true,
		pageIndex:1
	},

	onLoad: function (options) {
		// console.log(options);
		this.setData({
			title: options.title
		});
		this.getRankmoreData();
	},
	onClickLeft() {
		wx.navigateTo({
			url: "/pages/classify/classify"
		});
	},
    async getRankmoreData(){
       const result=await requestGet(baseURL+`actionid=${this.options.actionid}&type=${this.options.type}&id=${this.options.id}&name=${this.options.title}&pageindex=${this.data.pageIndex}`);
	//    console.log(result);
	   this.setData({
         booklist:[...this.data.booklist,...result.ResponseObject[0].module.itemList],
		 loading: false
	   })
	},
	// 触底加载
	onReachBottom: function () {
		this.setData({
			pageIndex: ++this.data.pageIndex
		});
		// console.log(this.data.pageIndex);
		this.getRankmoreData();
	},
	// 下拉刷新
	onPullDownRefresh: function () {
		this.setData({
			pageIndex: 1,
			list: []
		});
		//当异步任务有了结果之后，就可以停止下拉刷新
		this.getListData().then(() => {
			wx.stopPullDownRefresh();
		});
	}

});
