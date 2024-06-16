# Tiktok App

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 项目结构
- components
    - slide
        - SLideVerticalInfinite// 竖直滑动的响应
        - ItemToolbar 侧边几个元素的响应（通过总线bus发请求，比如喜欢 收藏...
        - **BaseVideo** 展示视频内容,
- pages
    - home
        - components
            - FollowSettings
            - FollowSettings2
            - IndicatorHome // 导航栏 热点/长视频/关注/经验之类的
            - LoadingCircle
        - Slide
            - Community
            - Slide0 // 视频最上方的附近游玩
            - Slide2
            - Slide4
            - SlideList
        - index.vue // 启动
        - Publish.vue //发布视频
        - Report.vue
        - SearchPage.vue

src/utils/index/tsx 调用 BaseVideo

- Slide4是一个滑块，可以展示视频, 调用recommendedVideo
- 发送请求的为：src/api/video.ts

- SlideList.vue里面getData：await props.api发送请求
到时候只需要修改apis里面的请求地址即可