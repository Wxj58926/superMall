module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375,  //视口宽度
      viewportHeight:667,  //视口高度
      unitPrecision: 5,    //保留小数位数
      viewportUnit: 'vw',
      selectBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],   //对数组里的这些不进行缩放
      minPixelValue: 1,       //小于或等于1px的不需要转化
      mediaQuery: false,       //允许在媒体查询中转换px
      exclude: [/TabBar/]
    }
  }
};
