const app = getApp()
import { requestGet, getResourceListURL } from "../../utils/reqeust"
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
        ids: [],
        list: [{
                id: 0,
                title: "有声小说",
            },
            {
                id: 1,
                title: "儿童",
            },
            {
                id: 2,
                title: "文学",
            },
            {
                id: 3,
                title: "相声评书",
            },
            {
                id: 4,
                title: "历史",
            },
            {
                id: 5,
                title: "财经",
            },
            {
                id: 6,
                title: "戏曲",
            },
        ]
    },

    onLoad() {
        // this.getRecommendingData()
        // this.getChildData()
        // this.getWenxueData()
        // this.getHistoryData()
        // this.getXiquData()
        // this.getShuoData()
        // this.getCaijingData()
        this.getResourceData()
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
            // content: [result, result1, result2, result3, result4, result5, result6]
            con1: result,
            con2: result1,
            con3: result2,
            con4: result3,
            con5: result4,
            con6: result5,
            con7: result6,

        })
    },
    onReachBottom: function() {
        this.setData({
            pageIndex: ++this.data.pageIndex,
        });
        console.log(this.data.pageIndex);
        this.getRecommendingData();
    },

    onPullDownRefresh: function() {
        this.setData({
            pageIndex: 1,
            list: []
        });
        //当异步任务有了结果之后，就可以停止下拉刷新
        this.getRecommendingData().then(() => {
            wx.stopPullDownRefresh();
        });
    },
})