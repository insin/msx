var test = require('tape').test

var transform = require('../main').transform

test('tag variations (default options)', function(t) {
  t.plan(20)
  var tagTests = {
    '<br/>': '{tag: "br", attrs: {}}'
  , '<div/>': '{tag: "div", attrs: {}}'
  , '<div></div>': '{tag: "div", attrs: {}}'
  , '<div>X</div>': '{tag: "div", attrs: {}, children: ["X"]}'
  , '<div>{X}</div>': '{tag: "div", attrs: {}, children: [X]}'
  , '<div id="test"/>': '{tag: "div", attrs: {id:"test"}}'
  , '<div id="test" className="test">X</div>': '{tag: "div", attrs: {id:"test", className:"test"}, children: ["X"]}'
  , '<div>X{X} X {X}</div>': '{tag: "div", attrs: {}, children: ["X", X, " X ", X]}'
  , '<div><p/></div>': '{tag: "div", attrs: {}, children: [{tag: "p", attrs: {}}]}'
  , '<div><p id="test">X</p></div>': '{tag: "div", attrs: {}, children: [{tag: "p", attrs: {id:"test"}, children: ["X"]}]}'
  , '<unknowntag>X</unknowntag>': '{tag: "unknowntag", attrs: {}, children: ["X"]}'
  , '<unknowntag id="test">X</unknowntag>': '{tag: "unknowntag", attrs: {id:"test"}, children: ["X"]}'
  , '<unknown-tag>X</unknown-tag>': '{tag: "unknown-tag", attrs: {}, children: ["X"]}'
  , '<unknown-tag id="test">X</unknown-tag>': '{tag: "unknown-tag", attrs: {id:"test"}, children: ["X"]}'
  , '<Component/>': 'Component'
  , '<Component></Component>': 'Component'
  , '<Component>X</Component>': 'm.component(Component, {}, ["X"])'
  , '<Component id="test"/>': 'm.component(Component, {id:"test"})'
  , '<Component id="test">X</Component>': 'm.component(Component, {id:"test"}, ["X"])'
  , '<Component id="test">X{X} X {X}</Component>': 'm.component(Component, {id:"test"}, ["X", X, " X ", X])'
  }
  var tags = Object.keys(tagTests)
  tags.forEach(function(tag) {
    var result = transform(tag).split('\n').pop()
    t.equal(result, tagTests[tag], tag + ' -> ' + tagTests[tag])
  })
})

test('tag variations (precompile: false)', function(t) {
  t.plan(14)
  var tagTests = {
    '<br/>': 'm("br")'
  , '<div/>': 'm("div")'
  , '<div></div>': 'm("div")'
  , '<div>X</div>': 'm("div", ["X"])'
  , '<div>{X}</div>': 'm("div", [X])'
  , '<div id="test"/>': 'm("div", {id:"test"})'
  , '<div id="test" className="test">X</div>': 'm("div", {id:"test", className:"test"}, ["X"])'
  , '<div>X{X} X {X}</div>': 'm("div", ["X", X, " X ", X])'
  , '<div><p/></div>': 'm("div", [m("p")])'
  , '<div><p id="test">X</p></div>': 'm("div", [m("p", {id:"test"}, ["X"])])'
  , '<unknown>X</unknown>': 'm("unknown", ["X"])'
  , '<unknown id="test">X</unknown>': 'm("unknown", {id:"test"}, ["X"])'
  , '<unknown-tag>X</unknown-tag>': 'm("unknown-tag", ["X"])'
  , '<unknown-tag id="test">X</unknown-tag>': 'm("unknown-tag", {id:"test"}, ["X"])'
  }
  var tags = Object.keys(tagTests)
  tags.forEach(function(tag) {
    var result = transform(tag, {precompile: false}).split('\n').pop()
    t.equal(result, tagTests[tag], tag + ' -> ' + tagTests[tag])
  })
})
