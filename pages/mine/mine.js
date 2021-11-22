const app = getApp();
Page({
	data: {
		tag: true
	},

	help() {
		wx.navigateTo({
			url: "/pages/help/help"
		});
	},

	feedback() {
		wx.navigateTo({
			url: "/pages/feedback/feedback"
		});
	},

	login1() {
		// var loding=true;
		// wx.setStorage("key",loding)
		var that = this;
		// 查看是否授权
		wx.getSetting({
			success: function (res) {
				if (res.authSetting["scope.userInfo"]) {
					wx.getUserInfo({
						success: function (res) {
							that.setData({
								tag: false
							});
							var loding=true;
							wx.setStorage({
 
								key:"key",
							   
								data:loding
							   
							  })
							  
						}
					});
				} else {
					// 用户没有授权
					wx.navigateTo({
						url: "/pages/login/login"
					});
				}
			}
		});
	},

	loginout() {
		var that = this;
		wx.showModal({
			title: "提示",
			content: "您确定要退出登录吗",
			success: function (res) {
				if (res.confirm) {
					console.log("用户点击确定");
					wx.removeStorageSync('key');
					that.setData({
						tag: true
					});
				} else {
					console.log("用户点击取消");
				}
			}
		});
	}
});
