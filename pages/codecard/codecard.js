var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: 'Girl',
    phone:'',
    codecard:''
  },
  formSubmit: function(e){
    if (e.detail.value.codecard == '') {
      wx.showModal({
        title: '错误提示',
        content: '身份证不能为空',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      return;
    }
    app.globalData.codecard = e.detail.value.codecard
    wx.navigateBack({
      delta: 1
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  
  }
})