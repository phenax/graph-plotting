# Graph
Javascript library that lets you plot points and lines based on the Cartesian system with a very simple api, on an html5 canvas.

[Preview](http://htmlpreview.github.io/?https://github.com/phenax/graph-plotting/blob/master/index.html)


## API

* Create the graph
```javascript
  const ctx= canvas.getContext('2d');

  const graph= new Graph({
    context: ctx,
    labels: {
      x: 'foo',
      y: 'bar'
    },
    dimens: {
      width: $canvas.width,
      height: $canvas.height,
    }
  });
```

* Set the axes for the graph(This will also determine the scale for the graph)
```javascript

  graph
    .setAxisX([-100, 100])
    .setAxisY([-100, 100]);

```

* Plot a point on the graph
```javascript
  graph.plot(x, y);
```

* Plot a line

  - Standard form
    ```javascript
      graph.plotLine({ 'standard': { m: 1, c: 20 }});
    ```

  - 2 Point form
    ```javascript
      graph.plotLine({ '2 points': [ [ 0, 0 ], [ 2, 1 ] ]});
    ```

* Show the graph
```javascript
  graph.show();
```
