/**
 * @ignore
 * number 操作类
 */
var util = require('./base')

var number = {
  /**
   * @description 为目标数字添加逗号分隔
   * @function
   * @name util.comma
   * @param {Number} source -需要处理的数字
   * @param {Number} length -两次逗号之间的数字位数，默认为3位
   * @return {String} 添加逗号分隔后的字符串
   * @example util.comma(source,length)
   */
  comma: function (source, length) {
    if (!length || length < 1) {
      length = 3
    }

    source = String(source).split('.')
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), '$1,')
    return source.join('.')
  },
  /**
   * @description 对目标数字进行0补齐处理
   * @function
   * @name util.pad
   * @param {Number} -source 需要处理的数字
   * @param {Number} -len 需要输出的长度
   * @return {String} 对目标数字进行0补齐处理后的结果
   * @example util.pad(source,len)
   */
  pad: function (source, length) {
    let pre = ''
    let negative = (source < 0)
    let string = String(Math.abs(source))

    if (string.length < length) {
      pre = (new Array(length - string.length + 1)).join('0')
    }
    return (negative ? '-' : '') + pre + string
  },
  //生成从minNum到maxNum的随机数
  randomNum: function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
        break;
    }
  }
}

util.mix(util, { number: number })
