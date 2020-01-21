var app = getApp();
Page({

  data: {
    cards:[
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.shopId != 0){
      this.init(2);
    }else{
      this.init(1);
    }
  },

  init:function(id) {
    var page = this;
    wx.request({
      url: 'https://www.hattonstar.com/getCards',
      data: {
        netflag:id
      },
      method: 'POST',
      success: function (res) {
        var cards = [];
        for (var i in res.data) {
          var object = new Object();
          object.id = res.data[i].id;
          object.title = res.data[i].title;
          object.pic = '/images/list/star' + res.data[i].pic_id + '.jpg';
          object.imageNo = res.data[i].pic_id;
          object.price = res.data[i].price;
          object.usetype = res.data[i].usetype;
          object.playtype = res.data[i].playtype;
          object.palynum = res.data[i].palynum;
          object.index = i;
          cards[i] = object;
        }
        page.setData({ cards: cards})
      },
      fail: function (res) {
        wx.showModal({
          title: '错误提示',
          content: '服务器无响应，请联系工作人员!',
          success: function (res) {
            if (res.confirm) {
              return;
            }
          }
        })
      }
    })
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
  
  },

  detail:function(e) {
    var card = this.data.cards[e.currentTarget.id];
    app.globalData.cardprice = card.price;
    if (card.playtype == '半日场') {
      app.globalData.cardtype = 1
    }else{
      app.globalData.cardtype = 2
    }
    app.globalData.playnum = card.palynum;
    app.globalData.body = card.title;
    app.globalData.detailid = card.id;
    app.globalData.imageNo = card.imageNo;
    wx.redirectTo({
      url: '../card/card',
    })
  }
})