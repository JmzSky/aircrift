/**
 * @ignore
 * string 操作类
 */

var util = require('./base')
var undef
// IE 的字符不包括非空间 (0xa0)
// 类 (根据 ECMAScript 规范7.2 节的要求), 我们明确
// 将其包括在 regexp 中以强制执行一致的跨浏览器行为。
var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g
var EMPTY = ''

var RE_TRIM = /^[\s\xa0]+|[\s\xa0]+$/g
var trim = String.prototype.trim

var RE_DASH = /-([a-z])/ig

function upperCase () {
  return arguments[1].toUpperCase()
}

var string = {
  /**
   * 判断 str 是否以 prefix 开头
   * @param {String} str 查找字符串
   * @param {String} 前缀字符串
   * @return {Boolean} str 是否以 prefix 开头
   * @member util
   */
  startsWith: function (str, prefix) {
    return str.lastIndexOf(prefix, 0) === 0
  },

  /**
   * 判断str是否已suffix结尾
   * @param {String} str 查找的字符串
   * @param {String} 后缀字符创
   * @return {Boolean} str是否以suffix结尾
   * @member util
   */
  endsWith: function (str, suffix) {
    var ind = str.length - suffix.length
    return ind >= 0 && str.indexOf(suffix, ind) === ind
  },

  /**
   * 去除字符串两端的空白字符
   * @param {String} str -原始字符串
   * @return {String} 去除空白后新的字符串
   * @method
   * @member util
   */
  trim: trim ? function (str) {
    return str == null ? EMPTY : trim.call(str)
  } : function (str) {
    return str == null ? EMPTY : (str + '').replace(RE_TRIM, EMPTY)
  },

  /**
   * 调用 encodeURIComponent 对 url 组件进行编码
   * @param {String} s url
   * @return {String} 编码后的URL地址
   * @member util
   */
  urlEncode: function (s) {
    return encodeURIComponent(String(s))
  },

  /**
   * 调用 decodeURIComponent 以解码 url 组件, 并将 "+" 替换为空格
   * @param {String} s 需要解码的URL
   * @return {String} 解码后的url
   * @member util
   */
  urlDecode: function (s) {
    return decodeURIComponent(s.replace(/\+/g, ' '))
  },

  camelCase: function (name) {
    if (name.indexOf('-') === -1) {
      return name
    }
    return name.replace(RE_DASH, upperCase)
  },
  /**
   * 将字符串中的占位符替换为对应的键值
   * @param {String} str -包含数据占位符的模板字符串, 占位符用 {} 包起来
   * @param {Object} o -Json 数据
   * @param {RegExp} [regexp] -自定义正则匹配
   * @return {String} 模板和数据结合起来的最终字符串
   * @member util
   * @example
   * var str = '{name} is {prop_1} and {prop_2}.',
   * obj = {name: 'Jack Bauer', prop_1: 'our lord', prop_2: 'savior'};
   *
   * Util.substitute(str, obj); // => 'Jack Bauer is our lord and savior.'
   */
  substitute: function (str, o, regexp) {
    if (typeof str !== 'string' || !o) {
      return str
    }

    return str.replace(regexp || SUBSTITUTE_REG, function (match, name) {
      if (match.charAt(0) === '\\') {
        return match.slice(1)
      }
      return (o[name] === undef) ? EMPTY : o[name]
    })
  },

  /** 大写的第一个字符
   * @member util
   * @param {String} s 原字符串
   * @return {String} 第一个字符大写后的字符串
   */
  ucfirst: function (s) {
    s += ''
    return s.charAt(0).toUpperCase() + s.substring(1)
  },
  /**
   * @description 对目标字符串进行格式化
   * @function
   * @name util.format
   * @param {String} str 目标字符串
   * @param {String|Object} options 提供相应数据的对象或多个字符串，参数为object时，替换目标字符串中的#{property name}部分；参数为String时，替换目标字符串中的#{0}、#{1}...部分
   * @return {String} 格式化后的字符串
   * @example
   * util.format(str, options)
   * util.format('要格式化{0},{1}的内容',...,1)
   */
  format: function (str, args) {
    let result = str
    if (typeof (args) === 'object') {
      for (let key in args) {
        if (args[key] !== undef) {
          let reg = new RegExp('({' + key + '})', 'g')
          result = result.replace(reg, args[key])
        }
      }
    } else {
      for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] !== undef) {
          let reg = new RegExp('({[' + i + ']})', 'g')
          result = result.replace(reg, arguments[i])
        }
      }
    }
    return result
  },
  /**
   * @description -计算字符串长度（英文占一个字符，中文汉字占2个字符）
   * @function
   * @name util.getLength(str)
   * @return {int} -字符串的长度
   * @example
   * util.getLength('获取字符串长度Get string length include chinese')
   */
  getLength: function (str) {
    if (typeof str === 'undefined' || str === null) return 0
    let len = 0
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i)
      if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
        len++
      } else {
        len += 2
      }
    }
    return len
  },
  isEmptyOrNull: function (str) {
    return (str === '' || str === null || str === undef)
  }
}

util.mix(util, {string: string})
