import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import routes from './routes';
import { useBaseStore } from '@/store/pinia';
import { IS_SUB_DOMAIN } from '@/config';

// 创建 router 实例
const router = createRouter({
  // 根据是否为子域名选择不同的 history 模式
  history: IS_SUB_DOMAIN ? createWebHashHistory() : createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 滚动行为函数，处理页面切换时的滚动位置
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// 全局前置守卫
router.beforeEach((to, from, next) => {

  const baseStore = useBaseStore();
  // footer 下面的5个按钮，对跳不要用动画
  const noAnimation = ['/', '/home', '/me', '/shop', '/message', '/publish', '/home/live', '/test'];
  if (noAnimation.includes(from.path) && noAnimation.includes(to.path)) {
    return next();
  }

  const toDepth = routes.findIndex((v) => v.path === to.path);
  const fromDepth = routes.findIndex((v) => v.path === from.path);

  // 判断路由深度，确定是前进还是后退
  if (toDepth > fromDepth) {
    if (to.matched && to.matched.length) {
      const toComponentName = to.matched[0].components?.default.name;
      baseStore.updateExcludeNames({ type: 'remove', value: toComponentName });
    }
  } else {
    if (from.matched && from.matched.length) {
      const fromComponentName = from.matched[0].components?.default.name;
      baseStore.updateExcludeNames({ type: 'add', value: fromComponentName });
    }
  }

  // 如果要跳转到home页，检查token
  if ((to.path === '/home' || to.path === '/')) {
    console.log("to---home!!!");
    const token = localStorage.getItem('token'); 
    if (token == null) {
      return next({ path: '/login' });
    }
  }

  return next();
});

export default router;
