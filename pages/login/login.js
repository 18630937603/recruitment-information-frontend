// pages/login/login.js
Page({
      data: {
          //判断小程序的API，回调，参数，组件等是否在当前版本可用。
          canIUse: wx.canIUse('button.open-type.getUserInfo')
      },
      onLoad: function () {
        
      },
      getUserProfile: function (e) {
          console.log(e.detail)
          if (e.detail.userInfo) {
              //用户按了允许授权按钮
              var that = this;
              //插入登录的用户的相关信息到数据库
              console.log(e.detail.userInfo)
  //                     openid: getApp().globalData.openid,
  //                     nickName: e.detail.userInfo.nickName,
  //                     avatarUrl: e.detail.userInfo.avatarUrl,
  //                     province:e.detail.userInfo.province,
  //                     city: e.detail.userInfo.city
          } else {
              //用户按了拒绝按钮
              wx.showModal({
                  title:'警告',
                  content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                  showCancel:false,
                  confirmText:'返回授权',
                  success:function(res){
                      if (res.confirm) {
                          console.log('用户点击了“返回授权”')
                      } 
                  }
              })
          }
      },
  })
  