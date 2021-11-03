import { requestGet, getResourceListURL } from "../../utils/reqeust";

Page({

    data: {
        pageIndex: 1,
        con1: [],
        con2: [],
        con3: [],
        con4: [],
        con5: [],
        con6: [],
        con7: [],

    },
    onLoad: function(options) {
        this.id = options.id;
        console.log(options)
        this.getResourceData();
        console.log(this.data)
    },
    async getResourceData() {

        const result = await requestGet(
            `${getResourceListURL}`, { dsize: 20, entityId: 1, entityType: 1, pageNum: 1, _limit: 20 }
        );
        const result1 = await requestGet(

            `${getResourceListURL}`, { dsize: 20, entityId: 6, entityType: 1, pageNum: 1, _limit: 20 }
        );
        const result2 = await requestGet(
            `${getResourceListURL}`, { dsize: 20, entityId: 78, entityType: 1, pageNum: 1, _limit: 20 }
        );
        const result3 = await requestGet(

            `${getResourceListURL}`, { dsize: 20, entityId: 3, entityType: 1, pageNum: 1, _limit: 20 }
        );
        const result4 = await requestGet(
            `${getResourceListURL}`, { dsize: 20, entityId: 9049, entityType: 1, pageNum: 1, _limit: 20 }
        );
        const result5 = await requestGet(
            `${getResourceListURL}`, { dsize: 20, entityId: 3085, entityType: 1, pageNum: 1, _limit: 20 });
        const result6 = await requestGet(
            `${getResourceListURL}`, { dsize: 20, entityId: 4, entityType: 1, pageNum: 1, _limit: 20 }

        );
        this.setData({
            con1: result,
            con2: result1,
            con3: result2,
            con4: result3,
            con5: result4,
            con6: result5,
            con7: result6,
            ids: this.id
        })
    },
    // onReachBottom: function() {
    //     this.setData({
    //         pageIndex: ++this.data.pageIndex,
    //     });
    //     console.log(this.data.pageIndex);
    //     this.getRecommendingData();
    // },

    // onPullDownRefresh: function() {
    //     this.setData({
    //         pageIndex: 1,
    //         list: []
    //     });
    //     //当异步任务有了结果之后，就可以停止下拉刷新
    //     this.getRecommendingData().then(() => {
    //         wx.stopPullDownRefresh();
    //     });
    // },
})