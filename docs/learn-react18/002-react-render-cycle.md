import ReactSourceHighlight from '@site/src/components/ReactSource';

# React 渲染周期

``` js
root.render(App);
```

react的渲染从`root.render`开始，`root.render`方法调用了`updateContainer`方法，我们深入看看`updateContainer`的实现

<ReactSourceHighlight path="packages/react-reconciler/src/ReactFiberReconciler.old.js#L321-L388" />

`OpaqueRoot`目前就是`FiberRoot`
<ReactSourceHighlight path="packages/react-reconciler/src/ReactFiberReconciler.old.js#L117" />