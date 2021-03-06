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
// 听书接口
export var getBookMenuURL = "https://m.lrts.me/ajax/getBookMenu/";
export var getResourceListURL = "https://m.lrts.me/ajax/getResourceList?dsize=20&entityType=1&pageNum=1&entityId=";
export var getPlayPathURL = "https://m.lrts.me/ajax/getPlayPath/";
export var getBookDetailURL = "https://m.lrts.me/ajax/getBookDetail/"


// 轮播图接口
export var bannerURL = "https://b.zhuishushenqi.com/category/classifylist?node=bf0a65255a5b4c138052dca8ef065753"; //GET请求
// 首页接口
export var homeURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?gender=0&actionid=9062" //get 请求
// 更多书籍接口
export var listURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9004&id=2&type=3&take=20&pageIndex=" //get 请求
//榜单接口
export var rankURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9008"
// base接口
export var baseURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?"
// 分类接口
export var classifyURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9009"
// 搜索接口
export var searchURL="https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9014&keyword="

export var bookInfoURL = "https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?gender=0&actionid=9002&bookId="   //GET请求bookid=1046177
export var bookPageURL = "https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?sid=1211e0fbc6fdc938a715ff6b68aaf9a7&chl=small_xiaoan&guid=obzfs0K9HrrxhPC_O0GG5oQfuwPI&isSmall=1&platform=1&device=microsoft&sysreleasever=Windows%2010%20x64&gender=0&nonce=46d13766-adc4-eaaa-d010-bd58a2a6f2ae&timestamp=1635840800535&mt=12&over=355&ver=355&appver=3.5.7&x=4&actionid=9007&"  //GET请求 {bookid}?view=chapters
export var chapterURL = "https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9005&bookid="
export var staticURL = "https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?"



