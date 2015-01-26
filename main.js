'use strict';

var visitors = require('./vendor/fbtransform/visitors');
var transform = require('jstransform').transform;
var visitReactTag = require('./vendor/fbtransform/transforms/react').visitorList[0];

var slice = Array.prototype.slice;

function partial(func) {
  var partialArgs = slice.call(arguments, 1);
  return function() {
    return func.apply(this, partialArgs.concat(slice.call(arguments)));
  };
}

function extend(dest, src) {
  if (src != null) {
    Object.keys(src).forEach(function(prop) {
      dest[prop] = src[prop];
    });
  }
  return dest;
}

module.exports = {
  transform: function(code, options) {
    options = extend({harmony: false, precompile: true}, options)

    var visitorList;
    if (options.harmony) {
      visitorList = visitors.getAllVisitors();
    } else {
      visitorList = visitors.transformVisitors.react.slice();
    }

    for (var i = 0; i < visitorList.length ; i++) {
      var visitor = visitorList[i];
      if (visitor === visitReactTag) {
        visitorList[i] = partial(visitor, options.precompile);
        visitorList[i].test = visitor.test;
      }
    }

    return transform(visitorList, code).code;
  }
};
