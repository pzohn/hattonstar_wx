var app = getApp()
Page({
  data: {
    j: 1,//帧动画初始图片  
    isSpeaking: false,//是否正在说话  
    voices: [],//音频数组

    recordingTimeqwe: 0,//录音计时
    setInter: ""//录音名称
  },

  onLoad: function () {
    var loginCode = wx.getStorageSync('loginCode');
    if (loginCode == "") {
      app.globalData.loginFlag = false;
    } else {
      app.globalData.loginFlag = true;
      app.globalData.phone = loginCode;
    }
  },


  //录音计时器
  recordingTimer: function () {
    var that = this;
    //将计时器赋值给setInter
    that.data.setInter = setInterval(
      function () {
        var time = that.data.recordingTimeqwe + 1;
        that.setData({
          recordingTimeqwe: time
        })
      }
      , 1000);
  },


  //开始录音
  openRecording: function () {
    var that = this;
    const options = {
      duration: 60000, //指定录音的时长，单位 ms，最大为10分钟（600000），默认为1分钟（60000）
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    //开始录音计时   
    that.recordingTimer();
    //开始录音
    var recorderManager = wx.getRecorderManager();
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('。。。开始录音。。。')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },

  //手指按下  
  touchdown: function () {
    if (app.globalData.loginFlag == false){
      wx.showModal({
        title: '错误提示',
        content: '用户登录,请登录!',
        confirmText: '登录',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../loginnew/loginnew',
            })
          }
        }
      })
      return;
    }
    console.log("手指按下了...")
    console.log("new date : " + new Date)
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })

    _this.openRecording();
  },

  //结束录音
  shutRecording: function () {
    var that = this;
    var recorderManager = wx.getRecorderManager();
    recorderManager.stop();
    recorderManager.onStop((res) => {
      console.log('。。停止录音。。', res.tempFilePath)
      const { tempFilePath } = res;
      //结束录音计时  
      clearInterval(that.data.setInter);
      //上传录音
      wx.uploadFile({
        url: 'https://www.hattonstar.com/upload',
        filePath: tempFilePath,
        name: "file",//后台要绑定的名称
        header: {
          "Content-Type": "multipart/form-data"
        },
        //参数绑定
        formData: {
          'phone': '18303741618'
        },
        success: function (ress) {
          console.log(res);
          wx.showToast({
            title: '保存完成',
            icon: 'success',
            duration: 2000
          })
        },
        fail: function (ress) {
          console.log("。。录音保存失败。。");
        }
      })
    })
  },

  //手指抬起  
  touchup: function () {
    if (app.globalData.loginFlag == false) {
      return;
    }
    console.log("手指抬起了...")
    this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer)
    this.shutRecording();
  },
  //点击播放录音  
})
//麦克风帧动画  
function speaking() {
  var _this = this;
  //话筒帧动画  
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}  