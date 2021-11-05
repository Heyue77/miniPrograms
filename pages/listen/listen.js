const app = getApp()
import { requestGet, getResourceListURL } from "../../utils/reqeust"
Page({
    data: {

        pageIndex: 1,
        list: [{
                id: 0,
                title: "有声小说",
                entityId: 1
            },
            {
                id: 1,
                title: "儿童",
                entityId: 6
            },
            {
                id: 2,
                title: "文学",
                entityId: 78
            },
            {
                id: 3,
                title: "相声评书",
                entityId: 3
            },
            {
                id: 4,
                title: "历史",
                entityId: 9049
            },
            {
                id: 5,
                title: "财经",
                entityId: 3085
            },
            {
                id: 6,
                title: "戏曲",
                entityId: 4
            },
        ]
    },
    // onLoad() {
    //     console.log(this.data)
    // },
})