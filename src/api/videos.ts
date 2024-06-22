import { request } from '@/utils/request'

export function recommendedVideo(params?: any, data?: any) {
  return request({ url: '/video/recommended', method: 'get', params, data, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), } })
}

export function recommendedLongVideo(params?: any, data?: any) {
  return request({ url: '/video/long/recommended/', method: 'get', params, data })
}

export function myVideo(params?: any, data?: any) {
  return request({ url: '/video/my', method: 'get', params, data, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), } })
}

export function privateVideo(params?: any, data?: any) {
  return request({ url: '/video/private', method: 'get', params, data })
}

export function likeVideo(params?: any, data?: any) {
  return request({ url: '/video/like', method: 'get', params, data, headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), } })
}