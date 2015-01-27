'use strict';

var visitors = require('./vendor/fbtransform/visitors');
var transform = require('jstransform').transform;
var typesSyntax = require('jstransform/visitors/type-syntax');
var Buffer = require('buffer').Buffer;

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
  transform: function(input, options) {
    var output = innerTransform(input, options);
    var result = output.code;
    if (options && options.sourceMap) {
      var map = inlineSourceMap(
        output.sourceMap,
        input,
        options.sourceFilename
      );
      result += '\n' + map;
    }
    return result;
  },
  transformWithDetails: function(input, options) {
    var output = innerTransform(input, options);
    var result = {};
    result.code = output.code;
    if (options && options.sourceMap) {
      result.sourceMap = output.sourceMap.toJSON();
    }
    return result;
  }
};

function innerTransform(input, options) {
  options = extend({precompile: true}, options);

  var visitorSets = ['react'];
  if (options.harmony) {
    visitorSets.push('harmony');
  }
  if (options.stripTypes) {
    // Stripping types needs to happen before the other transforms
    // unfortunately, due to bad interactions. For example,
    // es6-rest-param-visitors conflict with stripping rest param type
    // annotation
    input = transform(typesSyntax.visitorList, input, options).code;
  }

  var visitorList = visitors.getVisitorsBySet(visitorSets);

  // Patch the react tag visitor to preconfigure the MSX precompile argument
  for (var i = 0; i < visitorList.length ; i++) {
    var visitor = visitorList[i];
    if (visitor === visitReactTag) {
      visitorList[i] = partial(visitor, options.precompile);
      visitorList[i].test = visitor.test;
    }
  }

  return transform(visitorList, input, options);
}

function inlineSourceMap(sourceMap, sourceCode, sourceFilename) {
  var json = sourceMap.toJSON();
  json.sources = [sourceFilename];
  json.sourcesContent = [sourceCode];
  var base64 = Buffer(JSON.stringify(json)).toString('base64');
  return '//# sourceMappingURL=data:application/json;base64,' +
         base64;
}