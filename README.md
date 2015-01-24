# msx [![Build Status](https://secure.travis-ci.org/insin/msx.png?branch=master)](http://travis-ci.org/insin/msx)

[React](http://facebook.github.io/react/)'s JSX Transformer, tweaked to output
contents compatible with [Mithril](http://lhorie.github.io/mithril/)'s
`m.render()` function, allowing you to use HTML-like syntax in your Mithril
templates, like this:

```html
var todos = ctrl.list.map(function(task, index) {
  return <li className={task.completed() && 'completed'}>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        onclick={m.withAttr('checked', task.completed)}
        checked={task.completed()}
      />
      <label>{task.title()}</label>
      <button className="destroy" onclick={ctrl.remove.bind(ctrl, index)}/>
    </div>
    <input className="edit"/>
  </li>
})
```

Put the following jsx pragma at the beginning of files you want to process:

```javascript
/** @jsx m */
```

For known tag names, raw virtual DOM objects will be gnerated, matching the
[`VirtualElement` signature](http://lhorie.github.io/mithril/mithril.render.html#signature)
accepted by `m.render()` - this effectively
[precompiles](http://lhorie.github.io/mithril/optimizing-performance.html) your
templates for a slight performance tweak.

For unknown tag names, an `m()` call will be generated. This should allow you to
use msx if you're also using [Mithril.Elements](https://github.com/philtoms/mithril.elements)
to implement custom types.

Other than that, the rest of React's JSX documentation should still apply:

* [React | JSX in Depth](http://facebook.github.io/react/docs/jsx-in-depth.html)

The current version of msx is based on version 0.10.0 of React's JSX Transformer.

### Command Line Usage

```
npm install -g msx
```

```
msx --watch src/ build/
```

Run `msx --help` for more information.

### Module Usage

```
npm install msx
```

```javascript
var msx = require('msx')
```

#### Module API

##### `msx.transform(source: String[, options: Object])`

Transforms XML-like syntax in the given source into native JavaScript function
calls using Mithril's `m()` function, returning the transformed source.

To enable the subset of ES6 transforms supported by JSX Transformer, pass a
`harmony` option like so:

```javascript
msx.transform(source, {harmony: true})
```

### Examples

Example inputs and outputs are in [test/jsx](https://github.com/insin/msx/tree/master/test/jsx)
and [test/js](https://github.com/insin/msx/tree/master/test/js), respectively.

An example [gulpfile.js](https://github.com/insin/msx/blob/master/gulpfile.js) is
provided, which implements an `msxTransform()` function using `msx.transform()`.

---

Apache 2.0 Licensed, as per React
