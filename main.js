/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';
/*eslint-disable no-undef*/
var visitors = require('./vendor/fbtransform/visitors');
var transform = require('jstransform').transform;
var typesSyntax = require('jstransform/visitors/type-syntax');
var inlineSourceMap = require('./vendor/inline-source-map');

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
    options = processOptions(options);
    var output = innerTransform(input, options);
    var result = output.code;
    if (options.sourceMap) {
      var map = inlineSourceMap(
        output.sourceMap,
        input,
        options.filename
      );
      result += '\n' + map;
    }
    return result;
  },
  transformWithDetails: function(input, options) {
    options = processOptions(options);
    var output = innerTransform(input, options);
    var result = {};
    result.code = output.code;
    if (options.sourceMap) {
      result.sourceMap = output.sourceMap.toJSON();
    }
    if (options.filename) {
      result.sourceMap.sources = [options.filename];
    }
    return result;
  }
};

/**
 * Only copy the values that we need. We'll do some preprocessing to account for
 * converting command line flags to options that jstransform can actually use.
 */
function processOptions(opts) {
  opts = extend({precompile: true}, opts);
  var options = {};

  options.harmony = opts.harmony;
  options.stripTypes = opts.stripTypes;
  options.sourceMap = opts.sourceMap;
  options.filename = opts.sourceFilename;
  options.precompile = opts.precompile;

  if (opts.es6module) {
    options.sourceType = 'module';
  }
  if (opts.nonStrictEs6module) {
    options.sourceType = 'nonStrictModule';
  }

  // Instead of doing any fancy validation, only look for 'es3'. If we have
  // that, then use it. Otherwise use 'es5'.
  options.es3 = opts.target === 'es3';
  options.es5 = !options.es3;

  return options;
}

function innerTransform(input, options) {
  var visitorSets = ['react'];
  if (options.harmony) {
    visitorSets.push('harmony');
  }

  if (options.es3) {
    visitorSets.push('es3');
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
