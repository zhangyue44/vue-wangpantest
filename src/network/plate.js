import { request } from './request'

export function testUser() {
  return request({
    method: 'get',
    url: '/user/username'
  })
}
