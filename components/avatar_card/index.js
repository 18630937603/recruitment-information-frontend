Component({
    /**
     * 组件的属性列表
     */
    properties: {
        job: Object,
        isDeleteType: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        gotoDetail() {
            wx.navigateTo({
                url: `/pages/job_detail/job_detail?id=${this.properties.job.id}`,
            })
        },
        async deleteMyself() {
            const jobId = this.properties.job.id
            const result = await wx.cloud.callContainer({
                "config": {
                    "env": "prod-7gnlhvx8047cf6b2"
                },
                "path": "/api/removeJob",
                "header": {
                    "X-WX-SERVICE": "koa-7mby"
                },
                "method": "POST",
                "data": {
                    jobId: jobId
                }
            })
            console.log(result.data)
            if(result.data.code===0) {
                wx.showToast({
                  title: '删除成功',
                })
            } else {
                wx.showToast({
                    title: '删除失败',
                    icon: 'error'
                })
            }
        }
    },
    lifetimes: {
        attached: function () {
            // console.log(this.properties.job)
        }
    }
})