// 初始不全选
// var isAll = false;
Page({
	data: {
		// id: null,
		bookracklist: [],
		time: "无",
		cellid: [],
		actions: [{ name: "删除" }],
		show: false,
		overlay: false,
		hoverall: "hoverall",
		hovercb: "hovercb",
		isAll: false,
		checked: false,
		tag: true
	},
	//    页面初次加载
	onLoad: function () {
		// var res = wx.getStorageSync("bookstore");
		// console.log(res,"bbbb")
		// this.setData({
		// 	bookracklist: res
		// });
	},
	innerTap: function () {},
	onReady: function () {},

	//    页面展示时
	onShow: function () {
		// 获取缓存中的数据
		let res = wx.getStorageSync("bookstore");
		this.setData({
			bookracklist: res
		});
	},

	//点击阅读
	gopagedata(e) {
		const bookid = e.currentTarget.dataset.id;
		console.log(bookid, "书的id");
		var data = new Date().getTime();
		var res = wx.getStorageSync("bookstore");
		var res2 = wx.getStorageSync("readstore");
		var findIndex = res.findIndex((item) => item.id === bookid);
		if (res2) {
			var findIndex2 = res2.findIndex((item) => item.id === bookid);
			if (findIndex2 != -1) {
				console.log(findIndex2);
				// res2[findIndex2].id = res[findIndex].id;
				// res2[findIndex2].name = res[findIndex].name;
				console.log(res);
				res2[findIndex2].chapterId = res[findIndex].chapterId;
				res2[findIndex2].chapterIndex = res[findIndex].chapterId;
				res2[findIndex2].author = res[findIndex].author;
				res2[findIndex2].cover = res[findIndex].cover;
				res2[findIndex2].isCheck = res[findIndex].isCheck;
				res2[findIndex2].timeStamp = data;
			} else if (findIndex2 == -1) {
				console.log("aaano不存在");
				res2.push({
					id: res[findIndex].id,
					name: res[findIndex].name,
					chapterId: res[findIndex].chapterId,
					chapterIndex: 1,
					author: res[findIndex].author,
					cover: res[findIndex].cover,
					isCheck: res[findIndex].isCheck,
					timeStamp: data
				});
			}
		} else {
			res2 = [];
			res2.push({
				id: res[findIndex].id,
				name: res[findIndex].name,
				chapterId: res[findIndex].chapterId,
				chapterIndex: 1,
				author: res[findIndex].author,
				cover: res[findIndex].cover,
				isCheck: res[findIndex].isCheck,
				timeStamp: data
			});
		}
		if (findIndex != -1) {
			res[findIndex].timeStamp = data;
			res[findIndex].chapterIndex = res2[findIndex].chapterIndex;
		}

		wx.setStorageSync("bookstore", res);
		wx.setStorageSync("readstore", res2);
	},

	//     点击管理
	clickgo: function (e) {
		let list = this.data.bookracklist;
		for (let i = 0; i < list.length; i++) {
			list[i].isCheck = false;
		}
		this.setData({
			// 显示多选框
			hoverall: "",
			hovercb: "",
			// 显示底部弹出菜单
			show: true,
			isAll: false,
			bookracklist: list,
			tag: false
		});
	},
	//   点击全选
	checkAll() {
		let cid = this.data.cellid;
		let list = this.data.bookracklist;
		var isall = this.data.isAll;
		isall = !isall;
		// 全选时
		if (isall) {
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				// 全选时已全部加入删除数组
				cid.push(list[i].id);
				// 勾选每一项
				item.isCheck = true;
				// list.splice(i,1,item);
			}
		}
		// 取消全选时
		else {
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				// 取消每一项
				item.isCheck = false;
				// 清空删除数组
				cid.splice(0, cid.length);
				// list.splice(i,1,item);
			}
		}
		this.setData({
			// 写入数据
			bookracklist: list,
			isAll: isall,
			cellid: cid
		});
	},

	// 单个点击
	chlik: function (e) {
		// currentTarget绑定事件的元素,根据页面设置的data-cellid="{{item.id}}" 在dataset中获取
		//得到被点击的单元格的id
		var cid = e.currentTarget.dataset.cellid;
		var check = e.currentTarget.dataset.checked;
		var list = this.data.bookracklist;
		var isall = this.data.isAll;
		var cellid = this.data.cellid;

		// 遍历找到被勾选的数据
		for (let i = 0; i < list.length; i++) {
			var item = list[i];
			// cid是被点击的元素的id
			if (item.id == cid) {
				// findIndex返回索引值
				var isall = this.data.isAll;
				var findIndex = cellid.findIndex((item) => {
					return item == cid;
				});
				// 点击时
				item.isCheck = !item.isCheck;
				// 如果取消勾选
				if (item.isCheck === false) {
					// 是在全选的前提下
					for (let i = 0; i < list.length; i++) {
						if (list[i].isCheck === false) {
							var all = false;
						}
					}
					if (all === false) {
						var bindex = cellid.findIndex((item) => {
							return item == cid;
						});
						if (bindex != -1) {
							var c = cellid.splice(bindex, 1);
						}
					}
					this.setData({
						cellid: cellid
					});
				}
				this.setData({
					isAll: false
				});

				//    普通单个勾选
				if (item.isCheck === true) {
					// 如果不存在此元素
					if ((findIndex = -1)) {
						//   如果被勾选了，则将此条数据的从首部插入cid数组中，返回的是数组长度
						cellid.push(cid);
						// 写入数据
						this.setData({
							cellid: cellid
						});
					}
				}

				var r1 = wx.getStorageSync("bookstore");
			}
		}
	},

	//    点击取消
	onCancel: function () {
		this.setData({
			// 关闭弹出菜单
			show: false,
			// 隐藏多选框
			hoverall: "hoverall",
			hovercb: "hovercb",
			isAll: true,
			tag: true
		});
		this.checkAll();
	},

	//   点击删除按钮
	onClose() {
		this.setData({
			// 隐藏底部弹出的菜单
			show: false,
			// 隐藏多选框
			hoverall: "hoverall",
			hovercb: "hovercb",
			tag: true
		});
	},

	//    点击删除按钮
	onDelete() {
		// 获取全选状态
		var isall = this.data.isAll;
		// cid要删除的数组
		var cid = this.data.cellid;
		// 获取缓存中的数据
		var list = this.data.bookracklist;
		var r2 = wx.getStorageSync("bookstore");

		// 如果全选

		if (isall === true) {
			list.splice(0, list.length);
			this.setData({
				// 写入数据
				bookracklist: list,
				isAll: !isall
			});

			var r1 = wx.getStorageSync("bookstore");
		}
		// 如果没有全选
		else {
			for (var i = 0; i < cid.length; i++) {
				var indexc = list.findIndex((item) => {
					return item.id == cid[i];
				});

				list.splice(indexc, 1);
			}
			this.setData({
				bookracklist: list
			});
			var r1 = wx.getStorageSync("bookstore");
		}

		var res1 = wx.getStorageSync("bookstore");

		for (let i = 0; i < cid.length; i++) {
			var index = res1.findIndex((item) => {
				return item.id == cid[i];
			});
			if (index != -1) {
				//splice返回被删除的元素
				var result = res1.splice(index, 1);
			}
		}
		wx.setStorageSync("bookstore", res1);

		this.setData({
			cellid: []
		});
	}
});
