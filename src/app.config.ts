export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/me/info',
    'pages/node/index',
    'pages/me/index',
    'pages/me/name',
    'pages/me/setting',
    'pages/feedback/index',
    'pages/me/login',
    'pages/node/show',
    'pages/msg/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#0FB99F',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white',
    backgroundColor: '#ed7373', // 窗口的背景色 WTF? https://taro-docs.jd.com/docs/app-config#window
  },
  tabBar: {
    // custom: true,
    color: '#808080',
    selectedColor: '#3d67c9',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": './icons/home.0.png',
        "selectedIconPath": './icons/home.1.png',
      },
      {
        "pagePath": "pages/node/index",
        "text": "资讯",
        "iconPath": './icons/faxian.0.png',
        "selectedIconPath": './icons/faxian.1.png'
      },
      {
        "pagePath": "pages/node/show",
        "iconPath": './icons/plus-circle.png',
        "selectedIconPath": './icons/plus-circle-fill.png'
      },
      {
        "pagePath": "pages/msg/index",
        "text": "消息",
        "iconPath": './icons/message.0.png',
        "selectedIconPath": './icons/message.1.png'
      },
      {
        "pagePath": "pages/me/index",
        "text": "我的",
        "iconPath": './icons/myself.0.png',
        "selectedIconPath": './icons/myself.1.png'
      },
    ]
  },
 requiredPrivateInfos: [
   "getLocation",
 ],
 permission: {
   'scope.userLocation': {
     desc: "你的位置信息将用于显示距离"
   }
 },
 lazyCodeLoading: 'requiredComponents',
})
