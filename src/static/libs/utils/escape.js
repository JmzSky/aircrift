/**
 * @ignore
 * escape of lang
 */

var util = require('./base')

var EMPTY = ''
var htmlEntities = {
  '&amp;': '&',
  '&gt;': '>',
  '&lt;': '<',
  '&#x60;': '`',
  '&#x2F;': '/',
  '&quot;': '"',
  /* jshint quotmark:false */
  '&#x27;': "'"
}
var reverseEntities = {}

for (let k in htmlEntities) {
  reverseEntities[htmlEntities[k]] = k
}

var escapeHtmlReg = getEscapeReg()
var unEscapeHtmlReg = getUnEscapeReg()

function getEscapeReg () {
  let str = EMPTY
  for (let e in htmlEntities) {
    let entity = htmlEntities[e]
    str += entity + '|'
  }
  str = str.slice(0, -1)
  escapeHtmlReg = new RegExp(str, 'g')
  return escapeHtmlReg
}

function getUnEscapeReg () {
  let str = EMPTY
  for (let e in reverseEntities) {
    let entity = reverseEntities[e]
    str += entity + '|'
  }
  str += '&#(\\d{1,5});'
  unEscapeHtmlReg = new RegExp(str, 'g')
  return unEscapeHtmlReg
}
var escape = {
  /**
   * 将字符串经过 html 转义得到适合在页面中显示的内容, 例如替换 < 为 < Note
   * 此函数只会对以下符号进行 escape：& > < / " '`
   * @param str {string} text2html 要显示在页面中的真实内容
   * @member util
   * @return {String} 经过 html 转义后的字符串
   */
  escapeHtml: function (str) {
    if (!str && str !== 0) {
      return ''
    }
    str = '' + str
    if (!/[&<>"'`]/.test(str)) {
      return str
    }
    return (str + '').replace(escapeHtmlReg, function (m) {
      return reverseEntities[m]
    })
  },

  /**
   * 获取用于构造 regexp 的转义 regexp 字符串。
   * @param str
   * @member util
   * @return {String} regexp 字符串
   */
  escapeRegExp: function (str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  },

  /**
   * un-escape html 转 string.
   * 仅仅使用 unescape
   *      &amp; &lt; &gt; &#x60; &#x2F; &quot; &#x27; &#\d{1,5}
   * @param str {string} html字符串
   * @member util
   * @return {String} 去除html后的字符串
   */
  unEscapeHtml: function (str) {
    return str.replace(unEscapeHtmlReg, function (m, n) {
      return htmlEntities[m] || String.fromCharCode(+n)
    })
  }
}

util.mix(util, {escape: escape})
