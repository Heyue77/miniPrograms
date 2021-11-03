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
                "content-type": "application/json",
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
            fail: function(err) {
                reject(err)
            },
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            complete: function(res) {},
        });
    });
}
export var getBookMenuURL = "https://m.lrts.me/ajax/getBookMenu/";
export var getResourceListURL = "https://m.lrts.me/ajax/getResourceList/";
export var getPlayPathURL = "https://m.lrts.me/ajax/getPlayPath/";
export var getBookDetailURL = "https://m.lrts.me/ajax/getBookDetail/"

// export var getRecommendingURL = "https://m.lrts.me/ajax/getResourceList/";
// export var getChildURL = "https://m.lrts.me/ajax/getResourceList/";
// export var getCaijingURL = "https://m.lrts.me/ajax/getResourceList/";
// export var getWenxueURL = "https://m.lrts.me/ajax/getResourceList/";
// export var getHistoryURL = "https://m.lrts.me/ajax/getResourceList/";
// export var getPlayURL = "https://m.lrts.me/ajax/getResourceList/";
// export var getShuoURL = "https://m.lrts.me/ajax/getResourceList/";
// export var getMusicURL = "https://m.lrts.me/ajax/getResourceList/";
// export var getXiquURL = "https://m.lrts.me/ajax/getResourceList/";




// export var SlidesURL = "https://locally.uieee.com/slides" //GET请求
// export var CategoryesURL = "https://locally.uieee.com/categories" //GET请求
// export var CategoryshopsURL = "https://locally.uieee.com/categories/"; //GET请求  ${this.id}/shops
// export var ShopDetailURL = "https://locally.uieee.com/shops/" //GET请求   :id