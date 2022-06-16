// pages/index/index.js
Page({
    data: {
        version: null, // 0为求职版，1为招工版
        jobsList: [],
        intentionsList: []
    },
    async onLoad(options) {
        this.setData({
            version: Number(wx.getStorageSync('character'))
        })
        //   console.log(this.data.version);
        wx.setNavigationBarTitle({
            title: this.data.version ? '招工广场' : '求职广场',
        })
    },
    async onShow() {
        if (this.data.version === 0) {
            const result = await wx.cloud.callContainer({
                "config": {
                    "env": "prod-7gnlhvx8047cf6b2"
                },
                "path": "/api/jobsList",
                "header": {
                    "X-WX-SERVICE": "koa-7mby"
                },
                "method": "POST",
                "data": {
                    startIndex: 0,
                    endIndex: 10
                }
            })
            console.log(result.data)
            this.setData({
                jobsList: result.data.data
            })
        } else {
            const result = await wx.cloud.callContainer({
                "config": {
                    "env": "prod-7gnlhvx8047cf6b2"
                },
                "path": "/api/intentionsList",
                "header": {
                    "X-WX-SERVICE": "koa-7mby"
                },
                "method": "POST",
                "data": {
                    startIndex: 0,
                    endIndex: 10
                }
            })
            console.log(result.data)
            this.setData({
                intentionsList: result.data.data
            })
        }
    },
})