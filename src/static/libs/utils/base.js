var guid = 0
var EMPTY = ''
/**
 * utilities.
 * Provides Dom helper methods.
 * @class util
 * @singleton
 */
module.exports = {
  mix: function (to, from) {
    for (var i in from) {
      to[i] = from[i]
    }
    return to
  },
  /*
   * Generate a global unique id.
   * @param {String} [pre] guid prefix
   * @return {String} the guid
   */
  guid: function (pre) {
    return (pre || EMPTY) + guid++
  }
}
