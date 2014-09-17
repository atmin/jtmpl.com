{% raw %}

## What

jtmpl is an extensible, modular, functional reactive DOM templating engine.
It makes complex GUI development fun and productive.
It's simple conceptually and can be [grasped quickly](tutorial).


## Features


* Familiar [Mustache syntax](https://mustache.github.io/mustache.5.html).

* Automatic, context-based, bi-directional data-binding.
No need to touch the DOM: it's the result of your template + current model state.

* 100% declarative, zero boilerplate.

* Plain JavaScript object model, CommonJS modules support.

* Dynamic partials, requests, distributed applications.

* Computed properties, automatic dependency tracking.

* Plugin support, batteries included:

  * Event handling

  * Routes _(coming soon)_

  * Validators _(coming soon)_

* Predictable, plays nice with others: generated DOM is stable and only necessary parts
are updated synchronously with model updates.

* Lightweight.






## Hello, world


###### code

```html
<!DOCTYPE html>

<!--(1) Define your target(s)

    [data-jtmpl] elements are
    automatically processed.

    Supported template source formats:

  * "#element-id"
  * "url"
  * "url#element-id"
-->
<div data-jtmpl="#template">
  You can provide content for search engines
  and JavaScript-less agents here.
</div>


<!--(2) Provide a template

    Template is usually linked to a data model.
    [data-model] format is the same as [data-jtmpl]
-->
<script id="template"
  data-model="#model"
  type="text/template">

  <label>
    Greet goes to
    <input value="{{who}}">
  </label>
  <h3>Hello, {{who}}</h3>
</script>


<!--(3) The data model is a POJO.

    And optional. If you don't provide one,
    an empty model is implied.

    Literal JavaScript objects and CommonJS
    modules supported
    (though require function is not provided, for now)
-->
<script id="model" type="text/model">
  {
    who: 'world'
  }
</script>


<!--(4) Just include jtmpl somewhere,
    it will take care of the rest
-->
<script src="jtmpl.js"></script>
```


{% endraw %}
