// pages/mine/mine.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
      version: null,
      nickname: '',
      avatarURL: '',
      isEditingNickname: false,
      nicknameValue: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({
        version: Number(wx.getStorageSync('character')),
        nickname: getApp().globalData.userInfo.nickname,
        avatarURL: getApp().globalData.userInfo.avatarURL,
      })
    },
    versionSwitch() {
      console.log("version switch")
      wx.setStorageSync('character', Number(wx.getStorageSync('character')) ? '0' : '1')
      wx.reLaunch({
        url: '/pages/mine/mine',
      })
    },
    async modifyAvatarConfirm(e) {
        console.log(e.detail.avatarUrl);
        const result = await wx.cloud.callContainer({
            "config": {
                "env": "prod-7gnlhvx8047cf6b2"
            },
            "path": "/api/editProfile",
            "header": {
                "X-WX-SERVICE": "koa-7mby"
            },
            "method": "POST",
            "data": {
                avatarURL: e.detail.avatarUrl,
            }
        })
        if(result.data.code===0) {
            this.setData({
                avatarURL: e.detail.avatarUrl
            })
            wx.showToast({
              title: '头像修改成功',
            })
        }
    },
    modifyNicknameClick() {
        this.setData({
            isEditingNickname: true
        })
    },
    async modifyNicknameConfirm(e) {
        const newNickName = this.data.nicknameValue
        if(newNickName.length > 0 && newNickName.length < 10) {
            console.log(newNickName)
            const result = await wx.cloud.callContainer({
                "config": {
                    "env": "prod-7gnlhvx8047cf6b2"
                },
                "path": "/api/editProfile",
                "header": {
                    "X-WX-SERVICE": "koa-7mby"
                },
                "method": "POST",
                "data": {
                    nickname: newNickName,
                }
            })
            console.log(result.data)
            if(result.data.code === 0) {
                this.setData({
                    nickname: this.data.nicknameValue,
                    nicknameValue: '',
                    isEditingNickname: false
                })
                wx.showToast({
                  title: '昵称修改成功',
                })
            } else {
                wx.showToast({
                    title: '服务器错误',
                    icon: 'error'
                })
            }
        } else {
            wx.showToast({
                title: '长度不符合要求',
                icon: 'error'
            })
        }

    },
    modifyNicknameInput(e) {
        this.setData({
            nicknameValue: e.detail.value
        })
    },
    modifyNicknameBlur() {
        this.setData({
            // nicknameValue: '',
            isEditingNickname: false
        })
    },
    bugReportClick() {
        wx.showModal({
          title:'开发者联系方式',
          content:'QQ2334855783'
        })
    }
})