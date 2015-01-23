var test = require('tape').test

var transform = require('../main').transform

test('tag variations', function(t) {
  t.plan(10)
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
  }
  var tags = Object.keys(tagTests)
  tags.forEach(function(tag) {
    var result = transform('/** @jsx m */\n' + tag).split('\n').pop()
    t.equal(result, tagTests[tag], tag + ' -> ' + tagTests[tag])
  })
})
