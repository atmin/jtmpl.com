{% raw %}

## Frequently Asked Questions





### Why another framework?

I didn't find an existing one, that implements well the concept of a templating engine,
that updates its result continuously and predictably as data model evolves,
thus completely automating the most error-prone process in GUI development:
managing state.




### Is it used in production?

Currently only in internal projects. It's labeled 1.0.0, because the API and
approach are now stable.



### Browser compatibility?

jtmpl is compatible with IE9+ and all modern browsers. Check [GitHub page](https://github.com/atmin/jtmpl)
for browsers badge. Opera is unofficially supported, as well, but currently can't make it run the
automated tests (and probably won't bother).



### How is data-binding handled?

`jtmpl` operates on the DOM level. For each Mustache tag, it figures out how data model changes can affect the DOM and vice-versa, and registers reactors and event listeners, which keep data and view synchronized at all times.




### How to use it?

Define a target element, a template source, an optional model source via `data-` attributes and include `jtmpl` somewhere in your page. Template source is Mustache + HTML, model is a plain JavaScript object.

Template describes the _what_ of your application, Mustache tags serve much like instructions in a functional language.

Model describes the _how_ of the data fields by simple values or functions for dynamic behavior.

`jtmpl` is the glue and doesn't get into your way. It's just a natural generalization of the
Mustache templating engine into the web applications realm.





### How do the model functions refer to model itself?

Traditionally, object methods refer to properties and other methods via the `this`
context, like `this.foo`. `jtmpl` takes a functional approach: `this` is the current
context accessor function, so `this('foo')` returns `foo` value and `this('foo', 'bar')`
sets it to "bar". It works recursively all the way down, so `this('nestedContext')('deeperNestedContext')('someProperty')` would be equivalent to traditional
`this.nestedContext.deeperNestedContext.someProperty`. You have access to parent and
root contexts, too.

This allows interesting possibilities:

```js
{
  prop: 'a simple property',

  getProp: function() {
    // A computed property.
    // Dependency graph is constructed automatically,
    // so when `prop` changes, `getProp` change
    // listeners will be notified, too
    return this('prop');
  },

  getPropAsync: function(callback) {
    // Functional properties can be asynchronous
    var that = this;
    setTimeout(function() {
      return that('prop');
    });
  },

  setProp: function(newValue) {
    // And they can also be setters
    // `newValue` can be anything, but a function
    // (so it's distinguished from async get)
    this('prop', newValue);
  },

  propPlusProp: function() {
    // Simple and computed properties are
    // treated the same way
    return this('prop') + this('getProp');
  }
}
```

Interested only on this part? It's a separate project:
[Freak](https://github.com/atmin/freak),
functional reactive object wrapper.




### Performance?

Not specifically tested, but should be fast enough. jtmpl compiles your templates once to
pure JavaScript functions, that emit DOM structure and bindings and then uses them. Whenever
a model property changes, only the relevant DOM bit is updated.




### How do I structure my application?

Use partials. Unlike Mustache, you have the option to attach a data object to any partial (via the `data-model` attribute of the container tag). When partial is included, current context inherits partial's context, so partials serve as components. There's no difference between
the application and a partial, a component can serve both roles.




### Tell me more about partials

Partials can be static (provide string literal as source) or dynamic (variable source, partial is reloaded on change). Partials can be referenced by id, loaded from an URL or referenced by id from external document.

You can go low-level and construct HTML yourself, too, just use the triple Mustache tag to
output an unescaped var.




### How can I help?

Glad you asked. jtmpl needs functional testing strategy, comprehensive test suite,
documentation, examples and visibility. You can [open an issue](https://github.com/atmin/jtmpl/issues)
or reach me at fr33rider (at) gmail (dotcom).




{% endraw %}
