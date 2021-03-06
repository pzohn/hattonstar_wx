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
    wx.request({
      url: 'https://www.hattonstar.com/user/save',
      data: {
        type: 'update',
        PHONE: this.data.phone,
        NAME: e.detail.value.name,
        AGE: e.detail.value.age,
        // FATHER: e.detail.value.father,
        // MOTHER: e.detail.value.mother,
        // ADDRESS: e.detail.value.address,
        SCHOOL: e.detail.value.school,
        CLASS: e.detail.value.scclass,
        CODECARD: e.detail.value.codecard,
        CARDID: 0,
        CARDNUM: 0
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        if (res.data == 0) {
          wx.showModal({
            title: '错误提示',
            content: '更新失败，请重新提交信息！',
            showCancel: false
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '更新成功！',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                app.globalData.name = e.detail.value.name;
                app.globalData.age = e.detail.value.age;
                app.globalData.school = e.detail.value.school;
                app.globalData.scclass = e.detail.value.scclass;
                app.globalData.codecard = e.detail.value.codecard;
                wx.redirectTo({
                  url: '../information/information',
                })
              }
            }
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    if (app.globalData.sex == 1) {
      this.setData({ sex: 'Boy' });
    }
    this.setData({ phone: app.globalData.phone });
    this.setData({ name: app.globalData.name });
    this.setData({ age: app.globalData.age });
    this.setData({ father: app.globalData.father });
    this.setData({ mother: app.globalData.mother });
    this.setData({ address: app.globalData.address });
    this.setData({ school: app.globalData.school });
    this.setData({ scclass: app.globalData.scclass });
    this.setData({ codecard: app.globalData.codecard });
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