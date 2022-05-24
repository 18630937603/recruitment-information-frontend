// app.js
App({
  async onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.cloud.init()
    // 登录
    wx.login({
      success: async (res) => {
        console.log("res.code:",res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const result = await wx.cloud.callContainer({
          "config": {
            "env": "prod-7gnlhvx8047cf6b2"
          },
          "path": "/api/login",
          "header": {
            "X-WX-SERVICE": "koa-7mby"
          },
          "method": "POST",
          "data": {
            code:res.code
          }
        })
        console.log(result)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
