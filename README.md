# msx

[React](http://facebook.github.io/react/)'s JSX Transformer, tweaked to output
calls to [Mithril](http://lhorie.github.io/mithril/)'s `m()` function in the
format it expects, with the tag name in a String and any children present
wrapped in an Array.

Only output has been tweaked, but there's no special treatment for custom tag
names - the transformer will output a warning if it sees an unknown tag name but
output an `m()` call anyway.

Other than that, the test of React's JSX documentation should still apply:

* [React | JSX in Depth](http://facebook.github.io/react/docs/jsx-in-depth.html)

**msx 0.1.0** is based on **JSX Transformer 0.10.0-rc1**.

Install:

```
npm install msx
```

Require:

```
var msx = require('msx')
```

#### `msx.transform(source)`

Transforms XML-like syntax in the given source into native JavaScript function
calls using Mithril's `m()` function, returning the given source.

Put the following jsx pragma at the beginning of files you want to process:

```javascript
/** @jsx m */
```

### Examples

Example inputs and outputs are in [test/jsx](https://github.com/insin/msx/tree/master/test/jsx)
and [test/js](https://github.com/insin/msx/tree/master/test/js), respectively.

An example [gulpfile.js](https://github.com/insin/msx/blob/master/gulpfile.js) is
provided, which implements an `msxTransform()` function using `msx.transform()`.
