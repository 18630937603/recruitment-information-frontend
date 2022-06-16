// pages/character_select/character_select.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    onLoad() {
    },
    jobSeekerTap() {
      wx.setStorageSync('character', '0') // 求职者
      this.jump()
    },
    recruiterTap() {
      wx.setStorageSync('character', '1') // 招工者
      this.jump()
    },
    jump() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
})