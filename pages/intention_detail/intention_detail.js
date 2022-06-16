// pages/intention_detail/intention_detail.js
Page({
    data: {
        intentionDetailData: null
    },
    async onLoad(options) {
        const intentionId = options.id
        const result = await wx.cloud.callContainer({
            "config": {
                "env": "prod-7gnlhvx8047cf6b2"
            },
            "path": "/api/intentionDetail",
            "header": {
                "X-WX-SERVICE": "koa-7mby"
            },
            "method": "POST",
            "data": {
                intentionId
            }
        })
        this.setData({
            intentionDetailData: result.data.data
        })
        console.log(this.data.intentionDetailData);
    },
    contact() {
        console.log('phoneCall')
        wx.makePhoneCall({
          phoneNumber: this.data.intentionDetailData.contact,
        })
    }
})