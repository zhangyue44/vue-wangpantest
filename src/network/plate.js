import { request } from './request'

export function testUser(opts) {
  return request({
    method: 'post',
    url: '/user/plate' + opts,
  })
}
