import Home from '../pages/home/index.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // 默认重定向到登录页
  { path: '/', redirect: '/home' },
  // 发布作品页
  { path: '/publish', component: () => import('@/pages/home/Publish.vue') },
  // 首页
  { path: '/home', component: Home },
  // 个人中心页
  { path: '/me', component: () => import('@/pages/me/Me.vue') },
  // 登录页
  { path: '/login', component: () => import('@/pages/login/Login.vue') },
  // 注册页
  {
    path: '/login/register',
    component: () => import('@/pages/login/Register.vue')
  },
  // 视频详情页
  {
    path: '/video-detail',
    name: 'video-detail',
    component: () => import('@/pages/other/VideoDetail.vue')
  },
]

export default routes
