/**
 * @ignore
 * 数据类型检测
 */
var util = require('./base')
var class2type = {}
var FALSE = false
var undef
var OP = Object.prototype
var toString = OP.toString

function hasOwnProperty (o, p) {
  return OP.hasOwnProperty.call(o, p)
}

function shallowProperty (key) {
  return function (obj) {
    return obj === null ? void 0 : obj[key]
  }
}

var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1
var getLength = shallowProperty('length')
/**
 * 集合方法的帮助器, 用于确定集合是否应作为数组或对象进行迭代
 * @param collection
 * @returns {boolean}
 */
function isArrayLike (collection) {
  var length = getLength(collection)
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX
}

util.mix(util, {
  /**
   * 获取对象类型
   * @member util
   */
  isType: function (o) {
    return o == null ? String(o) : class2type[toString.call(o)] || 'object'
  },

  /**
   * 检查对象是否为纯对象 (created using '{}' or 'new Object()' but not 'new FunctionClass()')
   * @member util
   */
  isPlainObject: function (obj) {
    if (!obj || util.isType(obj) !== 'object' || obj.nodeType || obj.window === obj) {
      return FALSE
    }

    let key
    let objConstructor

    try {
      if ((objConstructor = obj.constructor) && !hasOwnProperty(obj, 'constructor') && !hasOwnProperty(objConstructor.prototype, 'isPrototypeOf')) {
        return FALSE
      }
    } catch (e) {
      return FALSE
    }
    for (key in obj) {
    }
    return ((key === undef) || hasOwnProperty(obj, key))
  },
  /**
   * 给定的数组、字符串或对象是否为空？"空" 对象没有可枚举的属性。
   * @param obj
   * @returns {boolean}
   */
  isEmpty: function (obj) {
    if (obj === null || obj === undef) return true
    if (util.isNumber(obj) || util.isBoolean(obj)) return false;
    if (isArrayLike(obj) && (util.isArray(obj) || util.isString(obj) || util.isArguments(obj))) return obj.length === 0
    return util.keys(obj).length === 0
  },
  /**
   * 给定值是否为 DOM 元素？
   * @param obj
   * @returns {boolean}
   */
  isElement: function (obj) {
    return !!(obj && obj.nodeType === 1)
  },
  /**
   * 是否有限数值
   * @param obj
   * @returns {boolean}
   */
  isFinite: function (obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj))
  },
  isWindow: function (obj) {
    return obj != null && obj === obj.window;
  }
})

var types = 'Boolean Number String Function Date RegExp Object Array Null Undefined'.split(' ')
for (let i = 0; i < types.length; i++) {
  (function (name, lc) {
    class2type['[object ' + name + ']'] = (lc = name.toLowerCase())
    util['is' + name] = function (o) {
      return util.isType(o) === lc
    }
  })(types[i], i)
}
/**
 * 是否是参数类型
 */
util.isArguments = function (arg) {
  let result = Object.prototype.toString.call(arg) === '[object Arguments]'
  if (!result) {
    result = arg != null && hasOwnProperty(arg, 'callee')
  }
  return result
}

util.isArray = Array.isArray || util.isArray
