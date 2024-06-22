import { request } from '@/utils/request'


//获得二维码
export function getQRcode(params?: any, data?: any) {
  return request({ url: '/user/bindingGoogleTwoFactorValidate', method: 'get', params, data, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), } })
}

//登录

export function userinfo(params?: any, data?: any) {
  return request({ url: '/user/userinfo', method: 'get', params, data, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), } })
}

export function userVideoList(params?: any, data?: any) {
  return request({ url: '/user/video_list', method: 'get', params, data, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), } })
}

export function panel(params?: any, data?: any) {
  return request({ url: '/user/panel', method: 'get', params, data, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), } })
}

export function friends(params?: any, data?: any) {
  return request({ url: '/user/friends', method: 'get', params, data })
}

export function userCollect(params?: any, data?: any) {
  return request({ url: '/user/collect', method: 'get', params, data })
}

export function recommendedPost(params?: any, data?: any) {
  return request({ url: '/post/recommended', method: 'get', params, data })
}

export function recommendedShop(params?: any, data?: any) {
  return request({ url: '/shop/recommended', method: 'get', params, data })
}

export function diggVideo(data?: any) {
  return request({ url: '/user/diggVideo', method: 'post', data, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), } })
}

