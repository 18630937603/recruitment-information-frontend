// app.js
App({
  async onLaunch() {
    if(wx.getStorageSync('character')) {
      wx.switchTab({
        url: 'pages/index/index',
      })
    }
    wx.cloud.init()
    const result = await wx.cloud.callContainer({
      "config": {
        "env": "prod-7gnlhvx8047cf6b2"
      },
      "path": "/api/login",
      "header": {
        "X-WX-SERVICE": "koa-7mby"
      },
      "method": "GET",
    })
    if(result.data.code===0) {
        this.globalData.userInfo.nickname = result.data.data.nickname
        this.globalData.userInfo.avatarURL = result.data.data.avatarURL
    }
    console.log(result.data)

    wx.authorize({
      scope: 'scope.userLocation',
    })

  },
  globalData: {
    userInfo: {
        nickname: '',
        avatarURL: ''
    },
  }
})
