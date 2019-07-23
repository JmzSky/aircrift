import axios from 'axios'

let undf
let notEmpty = (val) => {
  return val !== '' && val !== null && val !== undf
}

const tosendLog = (config) => {
  let data = {
    Authorization : config.headers.Authorization,
    data : config.data ? config.data :'',
  } 
  let toData = JSON.stringify(data)
  var text = 'tosend:{"url":"' + config.url + '","toData":' + toData + '}';
  console.log(text)
}

class Fetch {
  constructor () {
    this.baseURL = 'http://10.0.4.12:3000'
    this.responseType = ''
    this.timeout = 40000
    this.fetch = null
    this.requestContentType = 'application/json'
  }

  /**
   * 设置请求头部信息
   * @param headers
   * @returns {*}
   */
  httpHeaders (headers) {
    let _headers = {
      'Content-Type': this.requestContentType
    }

    headers = Object.assign(_headers, headers || {})
    return headers
  }

  /**
   * 请求拦截
   * @param config
   * @returns {*}
   */
  injectRequest (config) {
    config.headers = this.httpHeaders(config.headers)
    tosendLog(config)
    return config
  }

  /**
   * 请求结果拦截
   * @param response
   * @returns {*}
   */
  injectResponse (response) {
    return response
  }

  /**
   * 所有错误处理拦截
   * @param err
   * @returns {{message: string, status: number, info: *}}
   */
  injectError (err) {
    let result = {
      status: err && err.response && notEmpty(err.response.status) ? err.response.status : err && notEmpty(err.status) ? err.status : 0,
      message: err && err.message ? err.message : err && err.response && err.response.data && err.response.data.message ? err.response.data.message : null,
      info: err
    }
    if (!result.message) {
      switch (result.status) {
        case 400:
          result.message = '请求错误'
          break
        case 401:
          result.message = '未授权，请重新登录'
          break
        case 403:
          result.message = '拒绝访问'
          break
        case 404:
          result.message = '请求出错'
          break
        case 408:
          result.message = '请求超时'
          break
        case 500:
          result.message = '服务器错误'
          break
        case 501:
          result.message = '服务未实现'
          break
        case 502:
          result.message = '网络错误'
          break
        case 503:
          result.message = '服务不可用'
          break
        case 504:
          result.message = '网络超时'
          break
        case 505:
          result.message = 'HTTP版本不受支持'
          break
      }
    }
    return result
  }

  instance () {
    let instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      responseType: this.responseType
    })

    instance.interceptors.request.use(config => {
      return this.injectRequest(config)
    }, error => {
      return Promise.reject(this.injectError(error))
    })

    instance.interceptors.response.use(response => {
      return this.injectResponse(response)
    }, error => {
      return Promise.reject(this.injectError(error))
    })
    this.fetch = instance
    return instance
  }
}

export default (new Fetch()).instance()

export { Fetch }
