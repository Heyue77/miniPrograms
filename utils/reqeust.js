export function requestGet(url, data) {
	return new Promise((reslove, reject) => {
		wx.request({
			//请求地址
			url: url,
			//请求方式
			method: "get",
			//请求参数
			data: data,
			//设置请求头  如果发送的是post请求，一定要添加请求的content-type
			header: {
				"content-type": "application/json"
			},
			//请求返回结果的数据类型
			dataType: "json",
			//请求回调
			success: ({ statusCode, data }) => {
				if (statusCode === 200) {
					reslove(data);
				} else {
					reject("服务器响应出错");
				}
			},
			// 请求失败执行的回调函数
			fail: function (err) {
				reject(err);
			},
			// 接口调用结束的回调函数（调用成功、失败都会执行）
			complete: function (res) {}
		});
	});
}

// 轮播图接口
export var bannerURL = "https://b.zhuishushenqi.com/category/classifylist?node=bf0a65255a5b4c138052dca8ef065753"; //GET请求
// 首页接口
export var homeURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?gender=0&actionid=9062" //get 请求
// 更多书籍接口
export var listURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9004&id=2&type=3&take=20&pageIndex=5" //get 请求
//榜单接口
export var rankURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9008"
// base接口
export var bsseURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?"



//分类页面接口
export var classifyURL="https://b.zhuishushenqi.com/category/cats"  //GET请求 
