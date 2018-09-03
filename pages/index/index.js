//index.js
const rpn = require("../../utils/rpn.js");
//获取应用实例
const app = getApp()

Page({
  data: {
    calcnum:[
      '退格','清屏','+/-','+',
      '1','2','3','-',
      '4','5','6','×',
      '7','8','9','÷',
      '0','.','历史','='
    ],
    screenData:'0',
  },
  clickCalc:function (e) {
    var index = e.currentTarget.dataset.index;
    var screenData = this.data.screenData;

    if(screenData.length >= 30) {
      wx.showToast({
        title: '长度过大',
        icon: 'none'
      })
    }

    if (index == 0) {
        var screenData = screenData.substr(0, screenData.length - 1);
        var screenData = (screenData == '-' || !screenData) ? '0':screenData;
        this.setData({
          screenData: screenData
        })
    }

    if(index == 1) {
      this.setData({
        screenData: '0'
      })    
    }

    if(index == 2) {
      if(screenData != '0') {
        var first = screenData.substr(0, 1);
        if(first == '-') {
          screenData = screenData.substr(1, screenData.length);
        } else {
          screenData = '-' + screenData;
        }
        this.setData({
          screenData: screenData
        })
      }
    }

    if(index == 3 || index == 7 || index == 11 || index == 15) {
      var arr = ['.','+','-','×','÷'];
      if (screenData != '0' && arr.indexOf(screenData.substr(-1, 1)) == '-1') {
        screenData = screenData + e.currentTarget.dataset.text;
        this.setData({
          screenData: screenData
        })
      }
    }


    if(index > 3 && index < 17 && (index % 4 == 0 || index % 4 == 1 || index % 4 == 2)) {
      if(screenData == '0') {
        screenData = e.currentTarget.dataset.text;
      } else {
        screenData = screenData + e.currentTarget.dataset.text;
      }
      this.setData({
        screenData: screenData
      })
    }

    if (index == 17) {
      var arr = ['.', '+', '-', '×', '÷'];
      if (arr.indexOf(screenData.substr(-1, 1)) == '-1') {
        var offset = screenData.lastIndexOf('.');
        if (offset != '-1') {
          if (screenData.substr(offset + 1).indexOf('+') != '-1' || screenData.substr(offset + 1).indexOf('-') != '-1' || screenData.substr(offset + 1).indexOf('×') != '-1' || screenData.substr(offset + 1).indexOf('÷') != '-1') {
            screenData = screenData + e.currentTarget.dataset.text;
          }
        } else {
          screenData = screenData + e.currentTarget.dataset.text;
        }
        this.setData({
          screenData: screenData
        })
      }
    }

    if (index == 18) {
      wx.navigateTo({
        url: '/pages/logs/logs',
      })
    }

    if(index == 19) {
      var result = rpn.calCommonExp(screenData) + '';
      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || [];
      logs.unshift(screenData + '=' + result);
      wx.setStorageSync('logs', logs);
      this.setData({
        screenData: result
      }) 
    }


  }
})
