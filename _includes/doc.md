{% raw %}


## Documentation

Documentation currently is a stub.



### Hello, world


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
