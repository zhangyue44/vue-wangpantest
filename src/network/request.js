import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: '/pan',
    timeout: 18000
  })
  instance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer' + localStorage.getItem('token');
    return config
  }, err => {
    console.log(err);
  })
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    // console.log(err);
    // if (err && err.message) {
    //   switch (err.response.status) {
    //     case 400:
    //       err.message = '请求错误'
    //       break;
    //     case 401:
    //       err.message = '未授权的访问'
    //       break;
    //   }
    // }
    return err
  })
  return instance(config)
}
