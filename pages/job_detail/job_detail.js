// pages/job_detail/job_detail.js
Page({
    data: {
        jobDetailData: null
    },
    async onLoad(options) {
        const jobId = options.id
        const result = await wx.cloud.callContainer({
            "config": {
                "env": "prod-7gnlhvx8047cf6b2"
            },
            "path": "/api/jobDetail",
            "header": {
                "X-WX-SERVICE": "koa-7mby"
            },
            "method": "POST",
            "data": {
                jobId
            }
        })
        this.setData({
            jobDetailData: result.data.data
        })
        console.log(this.data.jobDetailData);
    },
    async favouriteClick() {
        const result = await wx.cloud.callContainer({
            "config": {
                "env": "prod-7gnlhvx8047cf6b2"
            },
            "path": "/api/favourite",
            "header": {
                "X-WX-SERVICE": "koa-7mby"
            },
            "method": "POST",
            "data": {
                jobId: this.data.jobDetailData.id,
                op: this.data.jobDetailData.favourite ? 'remove' : 'add'
            }
        })
        if(result.data.code===0) {
            this.setData({
                'jobDetailData.favourite': !this.data.jobDetailData.favourite
            })
            wx.showToast({
              title: `${this.data.jobDetailData.favourite? '收藏成功':'取消收藏成功'}`,
              icon: 'success',
              duration: 2000
            })
        }
        console.log(result);
    },
    contact() {
        console.log('phoneCall')
        wx.makePhoneCall({
          phoneNumber: this.data.jobDetailData.contact,
        })
    }
})