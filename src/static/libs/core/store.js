
class store {
  constructor () {
    this.prefix = '20190626'
  }

  /**
   * 写入本地localStorage
   * @param {String} key -key
   * @param {*} val -值
   */
  setItem (key, val) {
    let tmp = {
      val: val
    }
    key = this.prefix + key
    window.localStorage.setItem(key, JSON.stringify(tmp))
  }

  /**
   * 读取本地localStorage信息
   * @param {String} key
   * @returns {*}
   */
  getItem (key) {
    let val = null
    key = this.prefix + key
    let item = window.localStorage.getItem(key)
    if (item !== null) {
      try {
        val = JSON.parse(item).val
      } catch (e) {
        val = item
      }
    }
    return val
  }

  /**
   * 删除本地localStorage信息
   * @param {String} key
   * @returns {*}
   */
  remove (key) {
    let val = null
    key = this.prefix + key
    window.localStorage.removeItem(key)
  }

  /**
   * 清空localStorage信息
   * @param {String} key
   * @returns {*}
   */
  clear () {
    window.localStorage.clear()
  }

}
export default new store()
