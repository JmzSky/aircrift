(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var dpr = 0;
    var tid;
    var flexible = lib.flexible || (lib.flexible = {});
  
    var isIPhone = win.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = win.devicePixelRatio;
    if (isIPhone) {
      // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
      if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
        dpr = 3;
      } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
        dpr = 2;
      } else {
        dpr = 1;
      }
    } else {
      // 其他设备下，仍旧使用1倍的方案
      dpr = 1;
    }
    docEl.setAttribute('data-dpr', dpr);
  
    function refreshRem() {
      var width = docEl.getBoundingClientRect().width;
      var rem = width / 750 * 100;
      docEl.style.fontSize = rem + 'px';
      flexible.rem = win.rem = rem;
    }
  
    win.addEventListener('resize', function () {
      clearTimeout(tid);
      tid = setTimeout(refreshRem, 300);
    }, false);
    win.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    }, false);
  
    if (doc.readyState === 'complete') {
      doc.body.style.fontSize = 12 * dpr + 'px';
    } else {
      doc.addEventListener('DOMContentLoaded', function(e) {
        doc.body.style.fontSize = 12 * dpr + 'px';
      }, false);
    }
  
  
    refreshRem();
  
    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;
    flexible.rem2px = function (d) {
      var val = parseFloat(d) * this.rem;
      if (typeof d === 'string' && d.match(/rem$/)) {
        val += 'px';
      }
      return val;
    }
    flexible.px2rem = function (d) {
      var val = parseFloat(d) / this.rem;
      if (typeof d === 'string' && d.match(/px$/)) {
        val += 'rem';
      }
      return val;
    }
  
  })(window, window['lib'] || (window['lib'] = {}));
  