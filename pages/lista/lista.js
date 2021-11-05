import { requestGet, getResourceListURL } from "../../utils/reqeust";

Page({

    data: {
        pageIndex: 1,
        con1: [],
    },
    onLoad: function(options) {
        console.log(options)
        this.getResourceData();
    },
    async getResourceData() {
        const result=await requestGet(getResourceListURL+this.options.entityId)
        this.setData({
            con1: result,
            ids: this.id
        })
    },
})