import request from '../utils/request'

export const testLogin = (data) =>
  request({
    url: 'http://192.168.2.194:9000/fas-os/login',
    method: 'post',
    data,
    name: '登录接口',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
