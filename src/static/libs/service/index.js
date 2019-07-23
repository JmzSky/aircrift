import core from '../core/index'
const config = core.config
const fetch = core.fetch
const noop = function (res) {
	return res
}

class Server {
	filter(ajax, intelligent = noop){
		return new Promise((resolve, reject) => {
			ajax.then(res => {
				console.log(res.data)
				if (res.code == '300008' || res.code == '300010') {
					//token过期或无效
					this.getToken(function (res) {
						//重新发起请求
						filter(ajax, intelligent)
					});
				} else {
					resolve(intelligent(res.data))
				}
			}).catch(err => {
				reject(err)
			})
		})
	}

	/**
	 *登录获取配置信息
	 * @param {*} params
	 * @param {*} [intelligent=noop]
	 * @memberof Service
	 */
	GetConfig(params, intelligent = noop) {
		let url = config.LoginUrl
		return this.filter(fetch({url: url, method: 'get'}), intelligent)
	}
	/**
	 *更新Token
	 * @param {*} params
	 * @memberof Server
	 */
	getToken(params){
		console.log('更新token')
	}
}

export default new Server()

