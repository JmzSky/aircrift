/**
 * @ignore
 * escape of lang
 */

var util = require('./base')
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var dateFormat = function (date, format) {
  date = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  //var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
};

var parse = function (o) {
  o = o.replace(getRegExp('/T/g'), ' ').replace(getRegExp('/\.[\d]{3}Z/'), '').replace(getRegExp('/-/g'), "/");
  o = Date.parse(o);
  var time = new Date(o);
  return time;
};

util.mix(util, { dateFormat: dateFormat, dateParse: parse})
