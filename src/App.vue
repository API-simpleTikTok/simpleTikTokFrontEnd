<template>
  <router-view v-slot="{ Component }">
    <transition :name="transitionName">
      <keep-alive :exclude="store.excludeNames">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script setup lang="ts">
/*
* try {navigator.control.gesture(false);} catch (e) {} //UC浏览器关闭默认手势事件
try {navigator.control.longpressMenu(false);} catch (e) {} //关闭长按弹出菜单
* */
import routes from './router/routes'
import { useBaseStore } from '@/store/pinia.js'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import BaseMask from '@/components/BaseMask.vue'
import { BASE_URL } from '@/config'

const store = useBaseStore()
const route = useRoute()
const transitionName = ref('go')

// watch $route 决定使用哪种过渡
watch(
  () => route.path,
  (to, from) => {
    store.setMaskDialog({ state: false, mode: store.maskDialogMode })
    //底部tab的按钮，跳转是不需要用动画的
    // 决定是否需要过渡动画
    let noAnimation = [
      '/',
      '/home',
      '/slide',
      '/me',
    //   '/shop',
    //   '/message',
      '/publish',
    //   '/home/live',
      'slide',
    //   '/test'
    ]
    if (noAnimation.indexOf(from) !== -1 && noAnimation.indexOf(to) !== -1) {
      return (transitionName.value = '')
    }
    // /// 根据路由深度决定动画方向
    const toDepth = routes.findIndex((v: RouteRecordRaw) => v.path === to)
    const fromDepth = routes.findIndex((v: RouteRecordRaw) => v.path === from)
    transitionName.value = toDepth > fromDepth ? 'go' : 'back'
  }
)

function resetVhAndPx() {
    //// 动态设置根元素字体大小和高度单位   
  let vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 375 + 'px'
}

onMounted(() => {
  store.init()
  resetVhAndPx()
  // 监听resize事件 视图大小发生变化就重新计算1vh的值
  window.addEventListener('resize', () => {
    location.href = BASE_URL + '/'
    resetVhAndPx()
  })
})
</script>

<style lang="less">
@import './assets/less/index';

* {
  user-select: none;
}

#app {
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 14rem;
}

@media screen and (min-width: 500px) {
  #app {
    width: 500px !important;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}

.go-enter-from {
  transform: translate3d(100%, 0, 0);
}

//最终状态
.back-enter-to,
.back-enter-from,
.go-enter-to,
.go-leave-from {
  transform: translate3d(0, 0, 0);
}

.go-leave-to {
  transform: translate3d(-100%, 0, 0);
}

.go-enter-active,
.go-leave-active,
.back-enter-active,
.back-leave-active {
  transition: all 0.3s;
}

.back-enter-from {
  transform: translate3d(-100%, 0, 0);
}

.back-leave-to {
  transform: translate3d(100%, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
