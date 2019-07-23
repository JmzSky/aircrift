/**
 * @ignore
 * object
 */

var util = require('./base')
var undef
var toString = ({}).toString
var COMPARE_MARKER = '__~ks_compared'
var hasEnumBug = !({ toString: 1 }.propertyIsEnumerable('toString'))
var enumProperties = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toString',
  'toLocaleString',
  'valueOf'
]

function hasKey(obj, keyName) {
  return (obj !== null && obj !== undef) && obj[keyName] !== undef
}

function cleanAndReturn(a, b, ret) {
  delete a[COMPARE_MARKER]
  delete b[COMPARE_MARKER]
  return ret
}

function compareObjects(a, b) {
  // 避免循环引用
  if (a[COMPARE_MARKER] === b && b[COMPARE_MARKER] === a) {
    return true
  }
  a[COMPARE_MARKER] = b
  b[COMPARE_MARKER] = a
  for (var property in b) {
    if (!hasKey(a, property) && hasKey(b, property)) {
      return cleanAndReturn(a, b, false)
    }
  }
  for (property in a) {
    if (!hasKey(b, property) && hasKey(a, property)) {
      return cleanAndReturn(a, b, false)
    }
  }
  for (property in b) {
    if (property === COMPARE_MARKER) {
      continue
    }
    if (!util.equals(a[property], b[property])) {
      return cleanAndReturn(a, b, false)
    }
  }
  if (util.isArray(a) && util.isArray(b) && a.length !== b.length) {
    return cleanAndReturn(a, b, false)
  }
  return cleanAndReturn(a, b, true)
}
function isArrayLike(obj) {

  var length = !!obj && "length" in obj && obj.length,
    type = typeof obj;

  if (type === "function" || util.isWindow(obj)) {
    return false;
  }

  return type === "array" || length === 0 ||
    typeof length === "number" && length > 0 && (length - 1) in obj;
}

function buildParams( prefix, obj, traditional, add ) {
  var name;
  var rbracket = /\[\]$/;

  if ( Array.isArray( obj ) ) {

    util.jeach( obj, function( i, v ) {
      if ( traditional || rbracket.test( prefix ) ) {
        add( prefix, v );
      } else {
        buildParams(
          prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
          v,
          traditional,
          add
        );
      }
    } );

  } else if ( !traditional && util.isObject( obj )) {

    // Serialize object item.
    for ( name in obj ) {
      buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
    }

  } else {
    add( prefix, obj );
  }
}

var extend = function () {
  let options
  let name
  let src
  let copy
  let copyIsArray
  let clone
  let target = arguments[0] || {}
  let i = 1
  let length = arguments.length
  let deep = false

  if (typeof target === 'boolean') {
    deep = target
    target = arguments[i] || {}
    i++
  }
  if (typeof target !== 'object' && !util.isFunction(target)) {
    target = {}
  }
  if (i === length) {
    target = this
    i--
  }
  for (; i < length; i++) {
    if ((options = arguments[i]) != null) {
      for (name in options) {
        src = target[name]
        copy = options[name]
        if (target === copy) {
          continue
        }
        if (deep && copy && (util.isPlainObject(copy) ||
          (copyIsArray = util.isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && util.isArray(src) ? src : []
          } else {
            clone = src && util.isPlainObject(src) ? src : {}
          }
          // Never move original objects, clone them
          target[name] = extend(deep, clone, copy)
          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }
  return target
}

var method = {
  /**
   * 检查两个对象是否相等
   * @param {*} a
   * @param {*} b
   * @member util
   */
  equals: function (a, b) {
    if (a === b) {
      return true
    }
    if (a === undef || a === null || b === undef || b === null) {
      // need type coercion
      return a == null && b == null
    }
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime()
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return (a === b)
    }
    if (typeof a === 'number' && typeof b === 'number') {
      return (a === b)
    }
    if (typeof a === 'object' && typeof b === 'object') {
      return compareObjects(a, b)
    }
    return (a === b)
  },
  /**
   * 会返回一个由一个给定对象的自身可枚举属性组成的数组
   * @param {Object} o -要返回其枚举自身属性的对象
   * @return {Array} -一个表示给定对象的所有可枚举属性的字符串数组
   * @member util
   * {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys MDN}
   */
  keys: Object.keys || function (o) {
    let result = []
    let p
    let i
    for (p in o) {
      if (o.hasOwnProperty(p)) {
        result.push(p)
      }
    }
    if (hasEnumBug) {
      for (i = enumProperties.length - 1; i >= 0; i--) {
        p = enumProperties[i]
        if (o.hasOwnProperty(p)) {
          result.push(p)
        }
      }
    }
    return result
  },
  /**
   * 返回object对象所有的属性值
   * @param obj -要返回其枚举自身属性的对象
   * @return {Array} -一个表示给定对象的所有可枚举属性的值数组
   * @example
   * values({one: 1, two: 2, three: 3}) => [1, 2, 3]
   */
  values: function (obj) {
    let keys = this.keys(obj)
    let length = keys.length
    let values = Array(length)
    for (let i = 0; i < length; i++) {
      values[i] = obj[keys[i]]
    }
    return values
  },
  /**
   * 如果list包含指定的value则返回true（注：使用===检测）。如果list 是数组，内部使用indexOf判断
   * @param {Array|Object} obj -可枚举的对象或数组
   * @param {*} item -需要查找的内容
   * @param {Number} [fromIndex=0] -开始查找的索引
   * @return {boolean} -是否存在此item
   * @example
   * contains([1, 2, 3], 3) =>true;
   * contains({a:1,b:2,c:3}, 3) =>true
   */
  contains: function (obj, item, fromIndex) {
    obj = this.values(obj)
    if (typeof fromIndex !== 'number') fromIndex = 0
    return util.indexOf(obj, item, fromIndex) >= 0
  },
  /**
   * 遍历
   * @param {Object} object -要循环访问的对象
   * @param {Function} fn -要在每个项上执行的函数。该函数接收三参数: value:值、index:索引、array:完整数组。
   * @param {Object} [context] - fn方法中this的指向
   * @member util
   */
  each: function (object, fn, context) {
    if (object) {
      let key
      let val
      let keys
      let i = 0
      let length = object && object.length
      let isObj = length === undef || toString.call(object) === '[object Function]'

      context = context || null

      if (isObj) {
        keys = util.keys(object)
        for (; i < keys.length; i++) {
          key = keys[i]
          if (fn.call(context, object[key], key, object) === false) {
            break
          }
        }
      } else {
        for (val = object[0]; i < length; val = object[++i]) {
          if (fn.call(context, val, i, object) === false) {
            break
          }
        }
      }
    }
    return object
  },
  jeach: function (obj, callback) {
    var length, i = 0;

    if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    }

    return obj;
  },
  /**
   * 检查对象是否为空
   * @member util
   */
  isEmptyObject: function (o) {
    for (var p in o) {
      if (p !== undef) {
        return false
      }
    }
    return true
  },
  isNullOrEmpty: function (o) {
    return o === undef || o === null || o === ''
  },
  param: function (a, traditional) {
    var prefix,
      s = [],
      add = function( key, valueOrFunction ) {

        var value = util.isFunction( valueOrFunction ) ?
          valueOrFunction() :
          valueOrFunction;

        s[ s.length ] = encodeURIComponent( key ) + "=" +
          encodeURIComponent( value == null ? "" : value );
      };
    if ( Array.isArray( a ) || ( a && !util.isPlainObject( a ) ) ) {
      util.jeach( a, function() {
        add( this.name, this.value );
      } );

    } else {

      for ( prefix in a ) {
        buildParams( prefix, a[ prefix ], traditional, add );
      }
    }
    // Return the resulting serialization
    return s.join( "&" );
  },
  cmbUrl: function (url, str) {
    if (util.isObject(str)){
      str = util.param(str);
    }
    if(url.indexOf('?') >= 0) {
      return url +'*'+ str;
    }else {
      return url +'?'+str;
    }
  },
  extend,
  /**
     * 将src中的数据copy到dist中，并保留dist的结构
     * @param src
     * @param dist
     */
  copyValue(src, dist) {
    if (!src || typeof (src) !== 'object' || typeof (dist) !== 'object') {
      return;
    }

    let keys = Object.keys(dist)
    if (keys && keys.length > 0 && isNaN(keys[0])) {
      keys.forEach(key => {
        let value = dist[key]
        let srcVal = src[key]

        // 判断是不是对象，如果是则继续遍历，不是则开始赋值或忽略
        if (value !== undefined && typeof (value) === 'object' && srcVal && typeof (srcVal) === 'object' && srcVal[0] === undefined) {
          copyValue(srcVal, value)
        } else if (value !== undefined && srcVal && typeof (value) == typeof (srcVal)) {
          // 如果源数据存在，并且类型一致，则开始赋值
          dist[key] = src[key]
        }
      })
    }

  }
};

util.mix(util, method)
