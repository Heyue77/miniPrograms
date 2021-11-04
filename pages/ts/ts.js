import { requestGet, getPlayPathURL, getBookMenuURL, getBookDetailURL } from "../../utils/reqeust";
const app = getApp()

Page({
    data: {
        resource: [],
        cover: [],
    },
    onLoad: function(options) {
        console.log(options)
        this.id = options.id
        this.bookId = options.bookId
        this.section = options.sections
        this.cover = options.cover
        console.log(this.section)


        this.getResourceData()
        console.log(this.data)
            // console.log(that)

    },
    async getResourceData() {

        // const result = await requestGet("https://m.lrts.me/ajax/getPlayPath?entityId=36816&entityType=3&opType=1&sections=%5B1%5D&type=0")
        const result = await requestGet(`${getPlayPathURL}`, {
            entityId: this.bookId,
            entityType: 3,
            opType: 1,
            sections: [this.section]
        });
        this.setData({
            resource: result,
            cover: this.cover,
        })

    },
    onReady: function(e) {
        // 使用 wx.createAudioContext 获取 audio 上下文 context
        this.audioCtx = wx.createAudioContext('myAudio')
    },
    audioPlay: function() {
        this.audioCtx.play()
    },
    audioPause: function() {
        this.audioCtx.pause()
    },
})