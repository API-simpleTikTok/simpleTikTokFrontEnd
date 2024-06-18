import { createApp } from 'vue'
import App from './App.vue'
import './assets/less/index.less'
import { startMock } from '@/mock'
import router from './router'
import mixin from './utils/mixin'
import VueLazyload from '@jambonn/vue-lazyload'
import { createPinia } from 'pinia'
import { useClick } from '@/utils/hooks/useClick'
import bus, { EVENT_KEY } from '@/utils/bus'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { useBaseStore } from '@/store/pinia'
window.isMoved = false
window.isMuted = true
window.showMutedNotice = true
HTMLElement.prototype.addEventListener = new Proxy(HTMLElement.prototype.addEventListener, {
  apply(target, ctx, args) {
    const eventName = args[0]
    const listener = args[1]
    if (listener instanceof Function && eventName === 'click') {
      args[1] = new Proxy(listener, {
        apply(target1, ctx1, args1) {
          if (window.isMoved) return
          try {
            return target1.apply(ctx1, args1)
          } catch (e) {
            console.error(`[proxyPlayerEvent][${eventName}]`, listener, e)
          }
        }
      })
    }
    return target.apply(ctx, args)
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)  // 确保在使用 store 之前注册 Pinia
app.use(router)
app.use(ElementPlus)

const vClick = useClick()

app.mixin(mixin)
const loadImage = new URL('./assets/img/icon/img-loading.png', import.meta.url).href
app.use(VueLazyload, {
  preLoad: 1.3,
  loading: loadImage,
  attempt: 1
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const baseStore = useBaseStore();
  const token = localStorage.getItem('token')
  if ((to.path === '/' || to.path === '/home') && !token) {
    console.log('需要登录，跳转到登录页面');
    next('/login');
    return;
  }

  // 禁用特定路由之间的过渡动画
  const noAnimationRoutes = ['/', '/home', '/me', '/shop', '/message', '/publish', '/home/live', '/test'];
  if (noAnimationRoutes.includes(from.path) && noAnimationRoutes.includes(to.path)) {
    return next(true);
  }

  // 更新页面切换时的逻辑
  const toDepth = router.resolve(to).matched.length;
  const fromDepth = router.resolve(from).matched.length;

  if (toDepth > fromDepth) {
    const toComponentName = router.resolve(to).matched[0]?.name;
    if (toComponentName) {
      baseStore.updateExcludeNames({ type: 'remove', value: toComponentName });
      console.log('前进，删除', toComponentName);
    }
  } else {
    const fromComponentName = router.resolve(from).matched[0]?.name;
    if (fromComponentName) {
      baseStore.updateExcludeNames({ type: 'add', value: fromComponentName });
      console.log('后退，添加', fromComponentName);
    }
  }

  next(); // 确保调用 next() 表示允许导航继续
});

app.mount('#app')
app.directive('click', vClick)

// 放到最后才可以使用pinia
startMock()
setTimeout(() => {
  bus.emit(EVENT_KEY.HIDE_MUTED_NOTICE)
  window.showMutedNotice = false
}, 2000)
bus.on(EVENT_KEY.REMOVE_MUTED, () => {
  window.isMuted = false
})