/**
 * @ignore
 * 数组操作类
 */

var undef
var AP = Array.prototype
var indexOf = AP.indexOf
var lastIndexOf = AP.lastIndexOf
var filter = AP.filter
var every = AP.every
var some = AP.some
var util = require('./base')
var map = AP.map
var array = {
  /**
   * 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1
   * @method
   * @param {Array} arr -被查找数组
   * @param {*} item -要查找的元素
   * @param {Number} [fromIndex=0] -开始查找的位置
   * {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf MDN}
   * @return {Number}
   * @member util
   */
  indexOf: indexOf ? function (arr, item, fromIndex) {
    return fromIndex === undef ? indexOf.call(arr, item) : indexOf.call(arr, item, fromIndex)
  } : function (arr, item, fromIndex) {
    for (var i = fromIndex || 0, len = arr.length; i < len; ++i) {
      if (arr[i] === item) {
        return i
      }
    }
    return -1
  },

  /**
   * 返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。
   * 从数组的后面向前查找，从 fromIndex 处开始
   * @method
   * @param {Array} arr -被查找数组
   * @param {*} item -被查找的元素
   * @param {Number} [fromIndex=arr.length-1] -从此位置开始逆向查找,默认为数组的长度减 1
   * @return {number}
   * {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf MDN}
   * @member util
   */
  lastIndexOf: (lastIndexOf) ? function (arr, item, fromIndex) {
    return fromIndex === undef ? lastIndexOf.call(arr, item) : lastIndexOf.call(arr, item, fromIndex)
  } : function (arr, item, fromIndex) {
    if (fromIndex === undef) {
      fromIndex = arr.length - 1
    }
    for (var i = fromIndex; i >= 0; i--) {
      if (arr[i] === item) {
        break
      }
    }
    return i
  },

  /**
   * 返回一个数组的副本，删除重复的条目
   * @param {Array} a -数组找到独特的子集
   * @param {Boolean} [override] -是否保留组后重复数据，例如 override == true, util.unique([a, b, a]) => [b, a].
   * 如果 override == false, util.unique([a, b, a]) => [a, b]
   * @return {Array} -一个数组中删除重复的条目的副本
   * @member util
   */
  unique: function (a, override) {
    let b = a.slice()
    if (override) {
      b.reverse()
    }
    let i = 0
    let n
    let item

    while (i < b.length) {
      item = b[i]
      while ((n = util.lastIndexOf(b, item)) !== i) {
        b.splice(n, 1)
      }
      i += 1
    }

    if (override) {
      b.reverse()
    }
    return b
  },

  /**
   * 检索指定的值是否存在数组中
   * @param {*} item -要搜索的单个项目
   * @param {Array} arr -项目将被搜索的项目的数组
   * @return {Boolean} -是否存在
   * @member util
   */
  inArray: function (item, arr) {
    return util.indexOf(arr, item) > -1
  },

  /**
   * 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素,不会改变原数组
   * @member util
   * @method
   * @param {Array} arr -数组
   * @param {Function} fn -用来测试数组的每个元素的函数。调用时使用参数 (element, index, array),返回true表示保留该元素（通过测试），false则不保留
   * @param {Object} [context] -可选。执行 fn 时的用于 this 的值
   * @return {Array} -一个新的通过测试的元素的集合的数组
   * {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter MDN}
   * @example
   * var filtered = util.filter([1,2,3,4],function(element, index, array){return element >= 2;})
   * //filtered is [3, 4]
   */
  filter: filter ? function (arr, fn, context) {
    return filter.call(arr, fn, context || this)
  } : function (arr, fn, context) {
    let ret = []
    util.each(arr, function (item, i, arr) {
      if (fn.call(context || this, item, i, arr)) {
        ret.push(item)
      }
    })
    return ret
  },

  /**
   * 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果
   * 返回一个新数组，每个元素都是回调函数的结果
   * @method
   * @param {Array} arr -被调用的数组
   * @param {Function} fn -生成新数组元素的函数fn(currentValue, index, array)
   * @param {Object} [context] -执行 fn 函数时 使用的this 值
   * {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map MDN}
   * @return {Array} 一个新数组，每个元素都是回调函数的结果
   * @member util
   * @example
   * var doubles = util.map([1, 5, 10, 15],function(currentValue, index, array){return currentValue * 2;});
   * //doubles is now [2, 10, 20, 30]
   */
  map: map ? function (arr, fn, context) {
    return map.call(arr, fn, context || this)
  } : function (arr, fn, context) {
    let len = arr.length
    let res = new Array(len)
    for (let i = 0; i < len; i++) {
      let el = typeof arr === 'string' ? arr.charAt(i) : arr[i]
      if (el || i in arr) {
        //  ie < 9 in invalid when typeof arr == string
        res[i] = fn.call(context || this, el, i, arr)
      }
    }
    return res
  },

  /**
   * 对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值
   * 返回函数累计处理的结果
   * @method
   * @param {Array} arr -被调用的数组
   * @param {Function} callback -执行数组中每个值的函数
   * @param {number} [initialValue]  -[可选] 用作第一个调用 callback的第一个参数的值。 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错
   * {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce MDN}
   * @return {Array} 返回函数累计处理的结果
   * @member util
   * @example
   * var reduce = util.reduce([0, 1, 2, 3, 4],(prev, curr) => prev + curr );
   * //reduce is 10
   * var reduce = util.reduce([0, 1, 2, 3, 4],(prev, curr) => prev + curr ,10);
   * // reduce is 20
   */
  reduce: function (arr, callback, initialValue) {
    var len = arr.length
    if (typeof callback !== 'function') {
      throw new TypeError('callback is not function!')
    }

    // 如果没有初始值和空数组, 抛出错误
    if (len === 0 && arguments.length === 2) {
      throw new TypeError('arguments invalid')
    }

    let k = 0
    let accumulator
    if (arguments.length >= 3) {
      accumulator = initialValue
    } else {
      do {
        if (k in arr) {
          accumulator = arr[k++]
          break
        }

        // 如果数组不包含值, 则抛出错误
        k += 1
        if (k >= len) {
          throw new TypeError()
        }
      }
      while (true)
    }

    while (k < len) {
      if (k in arr) {
        accumulator = callback.call(undef, accumulator, arr[k], k, arr)
      }
      k++
    }
    return accumulator
  },

  /**
   * 测试数组的所有元素是否都通过了指定函数的测试
   * every 方法为数组中的每个元素执行一次 callback 函数，
   * 直到它找到一个使 callback 返回 false（表示可转换为布尔值 false 的值）的元素。
   * 如果发现了一个这样的元素，every 方法将会立即返回 false。
   * 否则，callback 为每一个元素返回 true，every 就会返回 true。
   * callback 只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用。
   * every 不会改变原数组。
   * @method
   * @param {Array} arr -受测数组
   * @param {Function} callback -用来测试每个元素的函数
   * @param {Object} [context] -执行 callback 时使用的 this 值
   * @return {Boolean} -数组中的所有元素是否都通过所提供的函数实现的测试则返回true,否则false
   * @member util
   * {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every MND}
   * @example
   * var passed = util.every([12, 5, 8, 130, 44],(element, index, array)=> element >= 10);
   * //passed is false
   */
  every: every ? function (arr, fn, context) {
    return every.call(arr, fn, context || this)
  } : function (arr, fn, context) {
    let len = arr && (arr.length || 0)
    for (let i = 0; i < len; i++) {
      if (i in arr && !fn.call(context, arr[i], i, arr)) {
        return false
      }
    }
    return true
  },

  /**
   * 测试数组中的某些元素是否通过由提供的函数实现的测试
   * 为数组中的每一个元素执行一次 callback 函数，直到找到一个使得 callback 返回一个“真值”（即可转换为布尔值 true 的值）
   * 如果找到了这样一个值，some 将会立即返回 true。否则，some 返回 false。
   * callback 只会在那些”有值“的索引上被调用，不会在那些被删除或从来未被赋值的索引上调用。
   * some 被调用时不会改变数组。
   * @method
   * @param {Array} arr -受测数组
   * @param {Function} callback -用来测试每个元素的函数
   * @param {Object} [context] -执行 callback 时使用的 this 值
   * @member util
   * @return {Boolean} whether some element in the array passes the test implemented by the provided function.
   * {@link https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some MND}
   * @example
   * var passed = util.some([2, 5, 8, 1, 4],(element, index, array)=> element >= 10;);
   * // passed is false
   * var passed = util.some([2, 5, 8, 1, 4],(element, index, array)=> element >= 4;);
   * // passed is true
   */
  some: some ? function (arr, fn, context) {
    return some.call(arr, fn, context || this)
  } : function (arr, fn, context) {
    let len = arr && (arr.length || 0)
    for (let i = 0; i < len; i++) {
      if (i in arr && fn.call(context, arr[i], i, arr)) {
        return true
      }
    }
    return false
  },
  /**
   * 将对象转换为真正的数组
   * @param o {object|Array} -对象或者数组
   * @return {Array} 数组
   * @member util
   * @example
   * var arr = util.makeArray({a:1,b:2,c:2});
   * //arr is [1,2,2]
   */
  makeArray: function (o) {
    if (o == null) {
      return []
    }
    if (util.isArray(o)) {
      return o
    }
    let lengthType = typeof o.length
    let oType = typeof o
    if (lengthType !== 'number' ||
      typeof o.nodeName === 'string' ||
      (o != null && o === o.window) ||
      oType === 'string' ||
      (oType === 'function' && !('item' in o && lengthType === 'number'))) {
      return [o]
    }
    let ret = []
    for (let i = 0, l = o.length; i < l; i++) {
      ret[i] = o[i]
    }
    return ret
  },
  // /**
  //  * 将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组。 如果你传递 shallow参数，数组将只减少一维的嵌套。
  //  * @param {Array} array -数组
  //  * @param {Boolean} shallow -数组是否只减少一维的嵌套
  //  * @example
  //  * flatten([1, [2], [3, [[4]]]]); => [1, 2, 3, 4];
  //  * flatten([1, [2], [3, [[4]]]], true); =>[1, 2, 3, [[4]]];
  //  */
  // flatten: function(array, shallow) {
  //   return _.flatten(array, shallow, false);
  // },
  /**
   * 返回传入的 arrays（数组）并集：按顺序返回，返回数组的元素是唯一的，可以传入一个或多个 arrays（数组）。
   * 仅一唯数组才能去重
   * @param {...Array} arrays -多个数组
   * @example
   * union([1, 2, 3], [101, 2, 1, 10], [2, 1]); => [1, 2, 3, 101, 10]
   * union([1, 2, 3], [101, 2, 1, [2,1]], [2, [2,1]]); => [1, 2, 3, 101, 10]
   */
  union: function (...arrays) {
    var list = []
    for (let i = 0; i < arrays.length; i++) {
      list = list.concat(arrays[i])
    }
    return this.unique(list)
  },
  /**
   * 类似于without，但返回的值来自array参数数组，并且不存在于rest 数组.
   * @param {Array} array -被检索数组
   * @param {Array} rest -对比数组
   * @return {Array} 返回array中不包含rest数组的项
   * @example
   * difference([1, 2, 3, 4, 5], [5, 2, 10])=> [1, 3, 4]
   */
  difference: function (array, ...rest) {
    return util.filter(array, function (value) {
      return !util.contains(...rest, value)
    })
  },
  /**
   * 返回一个删除所有...args 值后的 array副本。
   * @param {Array} array -被检索数组
   * @param {...arguments} args -对比的项
   * @return {Array} 删除所有otherArrays 值后的 array副本
   * @example
   * without([1, 2, 1, 0, 3, 1, 4], 0, 1) => [2, 3, 4]
   */
  // without: _.restArgs(function(array, otherArrays) {
  //   return util.difference(array, otherArrays);
  // }),
  without: function (array, ...args) {
    return util.difference(array, args)
  }
}

util.mix(util, array)
