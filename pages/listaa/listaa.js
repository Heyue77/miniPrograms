import { requestGet, getBookMenuURL, getBookDetailURL } from "../../utils/reqeust";
const app = getApp()
Page({

    data: {
        pageIndex: 1,
        resource: [],
        resourcem: [],
        bookId: [],

    },

    onLoad: function(options) {
        this.id = options.id;
        console.log(options)
        this.getResourceData();
        this.getResourcemData()
        console.log(this.data)

    },

    async getResourceData() {

        // const result = await requestGet("https://m.lrts.me/ajax/getBookMenu?bookId=5181&pageNum=1&pageSize=50&sortType=0")
        const result = await requestGet(
            `${getBookMenuURL}`, { bookId: this.id, pageNum: this.data.pageIndex, pagesize: 50, _limit: 10 }
        );
        this.setData({
            resource: result,
            bookId: this.id
        })
    },

    async getResourcemData() {
        const result = await requestGet(
            `${getBookDetailURL}`, { bookId: this.id }
        );
        this.setData({
            resourcem: result
        })
    },

    onReachBottom: function() {
        this.setData({
            pageIndex: ++this.data.pageIndex,
        });
        console.log(this.data.pageIndex);
        this.getResourceData();
    },

    onPullDownRefresh: function() {
        this.setData({
            pageIndex: 1,
            list: []
        });
        //当异步任务有了结果之后，就可以停止下拉刷新
        this.getResourceData().then(() => {
            wx.stopPullDownRefresh();
        });
    },
})