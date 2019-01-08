import axios from 'axios'
import qs from 'qs'
import { baseUrl } from '../config/env'
axios.defaults.withCredentials = false

export default class http {
  constructor (store, api) {
    var baseApi = baseUrl
    this.baseApi = baseApi
    this.api = api // 全部接口
    if (store) {
      this.store = store
      this.userAuth()
    }
  }
  get (url, data, isNeedBaseUrl) {
    var options = {
      url: !isNeedBaseUrl ? this.baseApi + url : url,
      data: data || {},
      method: 'get'
    }
    return this.request(options)
  }
  post (url, data, query) {
    var postUrl = this.baseApi
    if (url) {
      postUrl += url
    }
    if (query) {
      postUrl += query
    }
    var options = {
      url: postUrl,
      data: qs.stringify(data),
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }
    return this.request(options)
  }
  all (array) {
    var promiseAll = Promise.all(array)
    return promiseAll
  }
  request (options) {
    var promise = new Promise((resolve) => {
      axios(options)
        .then((result) => {
          if (typeof result.data.return_code === 'undefined') {
            resolve({return_code: '5000', return_message: '系统出错啦'})
          } else {
            resolve(result.data)
          }
        })
        .catch((error) => {
          console.log(error)
          resolve({return_code: '6000', return_message: '网络出错啦'})
        })
    })
    return promise
  }
  userAuth () { // 会员登录认证
    axios.interceptors.response.use(response => {
      return response
    })
  }
}
