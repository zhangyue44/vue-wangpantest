import { request } from './request'

export function testUser() {
  return request({
    method: 'get',
    url: '/user/username'
  })
}

export function uploadfile(opts) {
  return request({
    method: 'post',
    url: '/plate/file',
    data: opts,
    // headers: {  // 上传文件要设置请求头类型，multipart/form-data
    //   'Content-Type': 'multipart/form-data'
    // }
  })
}

export function getfile(opts) {
  return request({
    method: 'post',
    url: '/plate/test',
    responseType: 'blob',
    data: opts,
  })
}
