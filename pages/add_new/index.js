// pages/add_new/index.js
Page({
    data: {
        version: null,
        errorMsg: '', // 错误信息
        eduIndex: 0,
        eduArray: ['不限', '中专', '大专', '本科', '硕士', '博士'],
        jobFormData: {
            jobName: '',
            minSalary: '',
            maxSalary: '',
            city: '',
            companyName: '',
            address: '',
            educationalRequirements: '不限',
            jobRequirements: '',
            jobIntroduction: '',
            contact: ''
        },
        intentionFormData: {
            preferredJobType: '',
            salaryExpectation: '',
            cityExpectation: '',
            description: '',
            contact: '',
            bindResume: false
        },
        jobFormRules: [{
            name: 'jobName',
            rules: {
                required: true,
                message: '请填写职位名称'
            },
        }, {
            name: 'minSalary',
            rules: {
                required: true,
                message: '请填写最低月薪'
            }
        }, {
            name: 'maxSalary',
            rules: {
                required: true,
                message: '请填写最高月薪'
            }
        }, {
            name: 'city',
            rules: {
                required: true,
                message: '请填写工作城市'
            }
        }, {
            name: 'companyName',
            rules: {
                required: true,
                message: '请填写公司名称'
            }
        }, {
            name: 'contact',
            rules: {
                required: true,
                message: '请填写联系电话'
            }
        }],
        intentionFormRules: [{
            name: 'preferredJobType',
            rules: {
                required: true,
                message: '请填写期望工作'
            },
        },{
            name: 'salaryExpectation',
            rules: {
                required: true,
                message: '请填写期望月薪'
            },
        },{
            name: 'cityExpectation',
            rules: {
                required: true,
                message: '请填写期望城市'
            },
        },{
            name: 'contact',
            rules: {
                required: true,
                message: '请填写联系电话'
            },
        }]
    },
    onLoad(options) {
        this.setData({
            version: Number(wx.getStorageSync('character'))
        })
    },
    jobFormInputChange(e) {
        const {
            field
        } = e.currentTarget.dataset
        this.setData({
            [`jobFormData.${field}`]: e.detail.value
        })
    },
    intentionFormInputChange(e) {
        const {
            field
        } = e.currentTarget.dataset
        this.setData({
            [`intentionFormData.${field}`]: e.detail.value
        })
    },
    eduPickerChange(e) {
        const index = e.detail.value
        this.setData({
            eduIndex: index,
            ['jobFormData.educationalRequirements']: this.data.eduArray[index]
        })
    },
    bindResumeSwitchChange(e) {
        this.setData({
            ['intentionFormData.bindResume']: e.detail.value
        })
    },
    submitJobForm() {
        this.selectComponent('#form').validate((valid, errors) => {
            if (!valid) {
                console.log(errors)
                this.setData({
                    errorMsg: errors[0].message
                })
            } else {
                console.log(`${JSON.stringify(this.data.jobFormData)}已发送到后端`)
                wx.cloud.callContainer({
                    "config": {
                        "env": "prod-7gnlhvx8047cf6b2"
                    },
                    "path": "/api/addJob",
                    "header": {
                        "X-WX-SERVICE": "koa-7mby"
                    },
                    "method": "POST",
                    "data": this.data.jobFormData
                }).then((res) => {
                    if (res.data.code === 0) {
                        wx.showModal({
                            title: "成功",
                            content: res.data.msg,
                            showCancel: false,
                        })
                    }
                })
            }
        })
    },
    submitIntentionForm() {
        this.selectComponent('#form2').validate((valid, errors) => {
            if (!valid) {
                console.log(errors)
                this.setData({
                    errorMsg: errors[0].message
                })
            } else {
                console.log(`${JSON.stringify(this.data.intentionFormData)}已发送到后端`)
                wx.cloud.callContainer({
                    "config": {
                        "env": "prod-7gnlhvx8047cf6b2"
                    },
                    "path": "/api/addIntention",
                    "header": {
                        "X-WX-SERVICE": "koa-7mby"
                    },
                    "method": "POST",
                    "data": this.data.intentionFormData
                }).then((res) => {
                    if (res.data.code === 0) {
                        wx.showModal({
                            title: "成功",
                            content: res.data.msg,
                            showCancel: false,
                        })
                    }
                })
            }
        })
    }
})