var test = require('tape').test

var transform = require('../main').transform

test('tag variations', function(t) {
  t.plan(10)
  var tagTests = {
    '<br/>': '{tag: "br"}'
  , '<div/>': '{tag: "div"}'
  , '<div></div>': '{tag: "div"}'
  , '<div>X</div>': '{tag: "div", children: ["X"]}'
  , '<div>{X}</div>': '{tag: "div", children: [X]}'
  , '<div id="test"/>': '{tag: "div", attrs: {id:"test"}}'
  , '<div id="test" className="test">X</div>': '{tag: "div", attrs: {id:"test", className:"test"}, children: ["X"]}'
  , '<div>X{X} X {X}</div>': '{tag: "div", children: ["X",X, " X ", X]}'
  , '<div><p/></div>': '{tag: "div", children: [{tag: "p"}]}'
  , '<div><p id="test">X</p></div>': '{tag: "div", children: [{tag: "p", attrs: {id:"test"}, children: ["X"]}]}'
  }
  var tags = Object.keys(tagTests)
  tags.forEach(function(tag) {
    var result = transform('/** @jsx m */\n' + tag).split('\n').pop()
    t.equal(result, tagTests[tag], tag + ' -> ' + tagTests[tag])
  })
})
