var util = require('./base');

/**
     * 获取两个数值的小数点后面数字的长度
     *
     * @inner
     * @param {number} num1 第一个数值
     * @param {number} num2 第二个数值
     * @return {Array} 每个数值小数点后面数字的个数
     */
function decimalLength(num1, num2) {
  var length1;
  var length2;

  try {
    length1 = num1.toString().split('.')[1].length;
  }
  catch (e) {
    length1 = 0;
  }

  try {
    length2 = num2.toString().split('.')[1].length;
  }
  catch (e) {
    length2 = 0;
  }

  return [length1, length2];
}

/**
 * 两个浮点数求和
 *
 * @public
 * @param {number} num1 第一个数值
 * @param {number} num2 第二个数值
 * @return {number} 求和的结果
 */
function add(num1, num2) {
  var result = decimalLength(num1, num2);
  var length1 = result[0];
  var length2 = result[1];
  var times = Math.pow(10, Math.max(length1, length2));
  var n = length1 > length2 ? length1 : length2;

  return +((num1 * times + num2 * times) / times).toFixed(n);
}

/**
 * 两个浮点数相减
 *
 * @param {number} num1 第一个数值
 * @param {number} num2 第二个数值
 * @return {number} 相减的结果
 */
function sub(num1, num2) {
  var result = decimalLength(num1, num2);
  var length1 = result[0];
  var length2 = result[1];
  var times = Math.pow(10, Math.max(length1, length2));
  var n = length1 > length2 ? length1 : length2;
  return +((num1 * times - num2 * times) / times).toFixed(n);
}

/**
 * 两个浮点数相除
 *
 * @public
 * @param {number} num1 第一个数值
 * @param {number} num2 第二个数值
 * @return {number} 相除的结果
 */
function div(num1, num2) {
  var result = decimalLength(num1, num2);
  var length1 = result[0];
  var length2 = result[1];

  var maxLength = Math.max(length1, length2);

  var integer1 = +(num1.toString().replace('.', ''));
  var integer2 = +(num2.toString().replace('.', ''));

  // 默认保留小数点最长的个数
  return (integer1 / integer2) * Math.pow(10, length2 - length1);
}

/**
 * 两个浮点数相乘
 *
 * @public
 * @param {number} num1 第一个数值
 * @param {number} num2 第二个数值
 * @return {number} 相乘的结果
 */
function mul(num1, num2) {
  var totalLength = 0;
  var numString1 = num1.toString();
  var numString2 = num2.toString();

  try {
    totalLength += numString1.split('.')[1].length;
  }
  catch (e) { }

  try {
    totalLength += numString2.split('.')[1].length;
  }
  catch (e) { }

  var integer1 = +(numString1.replace('.', ''));
  var integer2 = +(numString2.replace('.', ''));

  return integer1 * integer2 / Math.pow(10, totalLength);
}


util.mix(util, {compute: {
  div,
  mul,
  add,
  sub
}})