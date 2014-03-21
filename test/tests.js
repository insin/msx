var test = require('tape').test

var transform = require('../main').transform

test('tag variations', function(t) {
  t.plan(10)
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
  }
  var tags = Object.keys(tagTests)
  tags.forEach(function(tag) {
    var result = transform('/** @jsx m */\n' + tag).split('\n').pop()
    t.equal(result, tagTests[tag], tag + ' -> ' + tagTests[tag])
  })
})
