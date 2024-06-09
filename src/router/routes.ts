import Home from '../pages/home/index.vue'

import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // {path: '/', redirect: '/attention'},
  { path: '/', redirect: '/login' },// 【刷视频】-->【登录】redirect: '/home'
  { path: '/publish', component: () => import('@/pages/home/Publish.vue') },// 【发布作品】
  { path: '/home', component: Home },
  { path: '/me', component: () => import('@/pages/me/Me.vue') },
  // {path: '/login', component: Login},
  { path: '/login', component: () => import('@/pages/login/Login.vue') },
  {
    path: '/login/register',
    component: () => import('@/pages/login/Register.vue')
  },
  {
    path: '/video-detail',
    name: 'video-detail',
    component: () => import('@/pages/other/VideoDetail.vue')//从一个主页进去的博主的视频
  },
  // {path: '/album-detail', component: () => import('@/pages/other/AlbumDetail.vue')},
//   {
//     path: '/home/search',
//     component: () => import('@/pages/home/SearchPage.vue')//视频查询
//   },
//   {
//     path: '/login/password',
//     component: () => import('@/pages/login/PasswordLogin.vue')
//   },
//   {
//     path: '/login/verification-code',//验证码
//     component: () => import('@/pages/login/VerificationCode.vue')
//   },
//   {
//     path: '/login/retrieve-password',//找回密码
//     component: () => import('@/pages/login/RetrievePassword.vue')
//   },
//   { path: '/login/help', component: () => import('@/pages/login/Help.vue') },
]

export default routes
