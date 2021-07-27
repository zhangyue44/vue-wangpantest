import { request } from './request'

export function registerUser(opts) {
  return request({
    method: 'post',
    url: '/user',
    data: opts
  })
}

export function loginUser(opts) {
  return request({
    method: 'post',
    url: '/user/login',
    data: opts
  })
}
