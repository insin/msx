# msx

(React)[http://facebook.github.io/reac]'s JSX Transformer, tweaked to output
calls to (Mithril)[http://lhorie.github.io/mithril/]'s `m()` function in the
format it expects, with the tag name in a String and any children present
wrapped in an Array.