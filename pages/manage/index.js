// pages/manage/index.js
Page({
    data: {
        version: null, // 0为求职版，1为招工版
        favJobsList: [],
        publishedIntentionsList: [],
        publishedJobsList: []
    },
    async onShow(options) {
        this.setData({
            version: Number(wx.getStorageSync('character'))
        })
        if (this.data.version === 0) {
            const result = await wx.cloud.callContainer({
                "config": {
                    "env": "prod-7gnlhvx8047cf6b2"
                },
                "path": "/api/favJobsList",
                "header": {
                    "X-WX-SERVICE": "koa-7mby"
                },
                "method": "POST",
                "data": {
                    startIndex: 0,
                    endIndex: 10
                }
            })
            const result2 = await wx.cloud.callContainer({
                "config": {
                    "env": "prod-7gnlhvx8047cf6b2"
                },
                "path": "/api/publishedIntentionsList",
                "header": {
                    "X-WX-SERVICE": "koa-7mby"
                },
                "method": "POST",
            })
            console.log(result.data)
            console.log(result2.data)
            this.setData({
                favJobsList: result.data.data,
                publishedIntentionsList: result2.data.data
            })
        } else {
            const result = await wx.cloud.callContainer({
                "config": {
                    "env": "prod-7gnlhvx8047cf6b2"
                },
                "path": "/api/publishedJobsList",
                "header": {
                    "X-WX-SERVICE": "koa-7mby"
                },
                "method": "POST",
            })
            console.log(result.data)
            this.setData({
                publishedJobsList: result.data.data
            })
        }
    },
})