var test = require('tape').test

var transform = require('../main').transform

test('tag variations (default options)', function(t) {
  t.plan(12)
  var tagTests = {
    '<br/>': '{tag: "br", attrs: {}}'
  , '<div/>': '{tag: "div", attrs: {}}'
  , '<div></div>': '{tag: "div", attrs: {}}'
  , '<div>X</div>': '{tag: "div", attrs: {}, children: ["X"]}'
  , '<div>{X}</div>': '{tag: "div", attrs: {}, children: [X]}'
  , '<div id="test"/>': '{tag: "div", attrs: {id:"test"}}'
  , '<div id="test" className="test">X</div>': '{tag: "div", attrs: {id:"test", className:"test"}, children: ["X"]}'
  , '<div>X{X} X {X}</div>': '{tag: "div", attrs: {}, children: ["X",X, " X ", X]}'
  , '<div><p/></div>': '{tag: "div", attrs: {}, children: [{tag: "p", attrs: {}}]}'
  , '<div><p id="test">X</p></div>': '{tag: "div", attrs: {}, children: [{tag: "p", attrs: {id:"test"}, children: ["X"]}]}'
  , '<unknown>X</unknown>': 'm("unknown", ["X"])'
  , '<unknown id="test">X</unknown>': 'm("unknown", {id:"test"}, ["X"])'
  }
  var tags = Object.keys(tagTests)
  tags.forEach(function(tag) {
    var result = transform('/** @jsx m */\n' + tag).split('\n').pop()
    t.equal(result, tagTests[tag], tag + ' -> ' + tagTests[tag])
  })
})

test('tag variations (precompile: false)', function(t) {
  t.plan(12)
  var tagTests = {
    '<br/>': 'm("br")'
  , '<div/>': 'm("div")'
  , '<div></div>': 'm("div")'
  , '<div>X</div>': 'm("div", ["X"])'
  , '<div>{X}</div>': 'm("div", [X])'
  , '<div id="test"/>': 'm("div", {id:"test"})'
  , '<div id="test" className="test">X</div>': 'm("div", {id:"test", className:"test"}, ["X"])'
  , '<div>X{X} X {X}</div>': 'm("div", ["X",X, " X ", X])'
  , '<div><p/></div>': 'm("div", [m("p")])'
  , '<div><p id="test">X</p></div>': 'm("div", [m("p", {id:"test"}, ["X"])])'
  , '<unknown>X</unknown>': 'm("unknown", ["X"])'
  , '<unknown id="test">X</unknown>': 'm("unknown", {id:"test"}, ["X"])'
  }
  var tags = Object.keys(tagTests)
  tags.forEach(function(tag) {
    var result = transform('/** @jsx m */\n' + tag, {precompile: false}).split('\n').pop()
    t.equal(result, tagTests[tag], tag + ' -> ' + tagTests[tag])
  })
})
