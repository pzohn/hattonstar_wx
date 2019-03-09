// pages/recordcard/recordcard.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111);
    var loginCode = wx.getStorageSync('loginCode');
    if (loginCode == "") {
      app.globalData.loginFlag = false;
    } else {
      app.globalData.loginFlag = true;
      app.globalData.phone = loginCode;
      console.log(app.globalData.phone);
    }
    if (app.globalData.loginFlag == false) {
      wx.showModal({
        content: '用户未登录,请登录!',
        confirmText: '登录',
        showCancel: false,
        success: function (res) {
          app.globalData.goto_flag = 2;
          if (res.confirm) {
            wx.navigateTo({
              url: '../loginnew/loginnew',
            })
          }
        }
      })
      return;
    }
    this.getCard();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getCard:function(){
    var _this = this;
    wx.request({
      url: 'https://www.hattonstar.com/getPostcard',
      data: {
        phone: app.globalData.phone
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        app.globalData.postcard_image_url = res.data.img_url;
        app.globalData.postcard_audio_url = res.data.audio_url;
        _this.setData({
          image_url: app.globalData.postcard_image_url
        });
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请重新登录',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '../loginnew/loginnew',
              })
            }
          }
        })
        return;
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  receive:function(){
    wx.redirectTo({
      url: '../playrecord/playrecord',
    });
  }
})