# MSX [![Build Status](https://secure.travis-ci.org/insin/msx.png?branch=master)](http://travis-ci.org/insin/msx)

*The current version of MSX is based on version 0.12.2 of React's JSX Transformer.*

MSX tweaks [React](http://facebook.github.io/react/)'s JSX Transformer to output
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

By default, raw virtual DOM objects - matching the
[`VirtualElement` signature](http://lhorie.github.io/mithril/mithril.render.html#signature)
accepted by `m.render()` - will be generated for known tag names. This
effectively [precompiles](http://lhorie.github.io/mithril/optimizing-performance.html)
your templates for a slight performance tweak.

For unknown tag names, an `m()` call will always be generated. This should allow
you to use MSX if you're also using
[Mithril.Elements](https://github.com/philtoms/mithril.elements) to implement
custom types.

If you make use of [JSX Spread Attributes](http://facebook.github.io/react/docs/jsx-spread.html),
the resulting code will make use of `Object.assign()` to merge attributes - if
your code needs to run in environments which don't implement `Object.assign`
natively, you're responsible for ensuring it's available via a
[shim](https://github.com/ljharb/object.assign), or otherwise.

Other than that, the rest of React's JSX documentation should still apply:

* [JSX in Depth](http://facebook.github.io/react/docs/jsx-in-depth.html)
* [JSX Spread Attributes](http://facebook.github.io/react/docs/jsx-spread.html)
* [JSX Gotchas](http://facebook.github.io/react/docs/jsx-gotchas.html) - with
  the exception of `dangerouslySetInnerHTML`: use
  [`m.trust()`](http://lhorie.github.io/mithril/mithril.trust.html) on contents
  instead.
* [If-Else in JSX](http://facebook.github.io/react/tips/if-else-in-JSX.html)

### In-browser JSX Transform

For development and quick prototyping, an in-browser MSX transform is available.

Download or use it directly from cdn.rawgit.com:

* https://cdn.rawgit.com/insin/msx/master/dist/MSXTransformer.js

Simply include a `<script type="text/msx">` tag to engage the MSX transformer. 

To enable ES6 transforms, use `<script type="text/msx;harmony=true">`. Check out
the [source](https://github.com/insin/msx/blob/master/demo/index.html) of the
[live example of using in-browser JSX + ES6 transforms](http://insin.github.io/msx/).

Here's a handy template you can use:

```html
<meta charset="UTF-8">
<script src="https://cdnjs.cloudflare.com/ajax/libs/mithril/0.1.30/mithril.js"></script>
<script src="https://cdn.rawgit.com/insin/msx/master/dist/MSXTransformer.js"></script>
<script type="text/msx;harmony=true">void function() { 'use strict';

var Hello = {
  controller() {
    this.who = m.prop('World')
  },

  view(ctrl) {
    return <h1>Hello {ctrl.who()}!</h1>
  }
}

m.module(document.body, Hello)

}()</script>
```

### Command Line Usage

```
npm install -g msx
```

```
msx --watch src/ build/
```

To disable precompilation from the command line, pass a `--no-precompile` flag.

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

Transforms XML-like syntax in the given source into object literals compatible
with Mithril's `m.render()` function, or to function calls using Mithril's
`m()` function, returning the transformed source.

To enable [ES6 transforms supported by JSX Transformer](http://kangax.github.io/compat-table/es6/#jsx),
pass a `harmony` option:

```javascript
msx.transform(source, {harmony: true})
```

To disable default precompilation and always output `m()` calls, pass a
`precompile` option:

```javascript
msx.transform(source, {precompile: false})
```

### Examples

Example inputs (using some ES6 features) and outputs are in
[test/jsx](https://github.com/insin/msx/tree/master/test/jsx) and
[test/js](https://github.com/insin/msx/tree/master/test/js), respectively.

An example [gulpfile.js](https://github.com/insin/msx/blob/master/gulpfile.js)
is provided, which implements an `msxTransform()` step using `msx.transform()`.

## Related Modules

* [gulp-msx](https://github.com/insin/gulp-msx) - gulp plugin.
* [grunt-msx](https://github.com/hung-phan/grunt-msx) - grunt plugin.
* [mithrilify](https://github.com/sectore/mithrilify) - browserify transform.
* [msx-loader](https://github.com/sdemjanenko/msx-loader) - webpack loader.

## MIT Licensed
