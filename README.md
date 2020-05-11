# FFXIV Raid Sketch

封装了方便绘制《最终幻想 14》攻略示意图的 `Canvas` 库。

## 文档

文档打包在了`docs`文档中，也可以直接访问
[API Document](https://aweikalee.github.io/ffxiv-raid-sketch/) 。

由于文档也是通过源码中的 注释 和 类型 生成的，所以也可以直接看源码。

## 安装

### 使用 npm

```
$ npm i ffxiv-raid-sketch
```

### 浏览器引入

```html
<script src="./ffxiv-raid-sketch.umd.min.js"></script>
```

## 基础用法

### 标准用法

```js
import * as FRS from 'ffxiv-raid-sketch'

// 创建实例 添加到页面上
const sketch = new FRS.Sketch({
    canvas: document.getElementById('canvas'), // 绑定的 Canvas DOM
    w: 400, // 画布宽度（px）
    h: 400, // 画布高度（px）
    unit: 4 // 基础单位（px）
})

// 创建一个半径为40的圆
new FRS.Circle().addTo(sketch.layer)
```
若不传入 `canvas` 内部将会创建一个，之后需通过 `appendTo` 添加到页面中。

`unit` 为基准单位(px)，除了 `strokeWidth` 以外的坐标、尺寸都将乘上这个基准单位再输出。

### 按需引入

```js
import Sketch from 'ffxiv-raid-sketch/es/Sketch'
import Circle from 'ffxiv-raid-sketch/es/Circle'

const sketch = new Sketch().appendTo(document.body)
new Circle().addTo(sketch.layer)
```

### 在浏览器中使用

```js
var sketch = new FRS.Sketch().appendTo(document.body) // 圆形场地 new
FRS.Circle().addTo(sketch.layer)
```

## Layer 图层

一切图形继承于 `Layer` 类。

### state 图层状态
可通过以下方法进行设置。

#### 实例化参数
```js
const layer = new Layer({
    x: 0, // 图层位置 坐标x
    y: 0, // 图层位置 坐标y
    rotate: 0, // 图层旋转角度
    scaleX: 1, // 图层x轴缩放
    scaleY: 1, // 图层y轴缩放
    opacity: 1, // 不透明度
    fill: '#000000', // 填充色
    stroke: '#000000', // 描边色
    strokeWidth: 2, // 描边宽度（px）
    visible: true, // 可见（设为不可见将会跳过渲染 节省开支）
})
```
坐标、尺寸的单位都是 `Sketch.options.unit`，
只有一个例外——`strokeWidth`，单位是 `px`。

#### 实例方法
```js
const layer = new Layer()
layer.xy(0, 0)
    .rotate(0)
    .scale(1, 1)
    .opacity(1)
    .fill('#000')
    .stroke('#000')
    .strokeWidth(2)
    .show() // visible = true
    .hide() // visible = false
```

#### 实例属性
```js
const layer = new Layer()
layer.state.x = 0
layer.state.y = 0
layer.state.rotate = 0
layer.state.scaleX = 1
layer.state.scaleY = 1
layer.state.opacity = 1
layer.state.fill = '#000'
layer.state.stroke = '#000'
layer.state.strokeWidth = 2
layer.state.visible = true
```

### parent, children 父图层, 子图层

#### 图层操作
```js
const a = new Circle()
const b = new Rect()

a.add(b) // 将 b 添加到 a
b.addTo(a) // 将 b 添加到 a
b.parent = a // 将 b 添加到 a
a.children.push(b) // 将 b 添加到 a

a.remove(b) // 将 b 从 a 中移除
a.removeAll() // 移除 a 所有子图层
```
`a.children` 是一个数组，添加的时候用数组方法是毫无问题的。
如果通过数组方法删除，无法将 `b.parent` 修改为 `null`。
虽然也没什么大问题，但建议还是通过 `remove` 方法进行删除。

### 图层状态的继承
图层嵌套，子图层状态将会在父图层状态下，再进行计算。
与一般的图形处理软件的图层嵌套类似。

比如：
```js
const a = new Circle({
    x: 10,
    y: 10,
    rotate: 45,
    scaleX: 2,
    scaleY: 2,
    opacity: 0.5
})
const b = new Rect({
    x: -10,
    y: -10,
    rotate: -45,
    scaleX: 0.5,
    scaleY: 0.5,
    opacity: 0.5
}).addTo(a)
```

最后渲染时的状态就会变成：
```js
a.state = {
    x: 10,
    y: 10,
    rotate: 45,
    scaleX: 2,
    scaleY: 2,
    opacity: 0.5
}

b.state = {
    x: 0,
    y: 0,
    rotate: 0,
    scaleX: 1,
    scaleY: 1,
    opacity: 0.25
}
```
注：`fill`, `stroke`, `storkeWidth` 不受父图层影响。

### 其他方法
#### getLayerStatus 获得图层状态
```js
new Rect().addTo(sketch.layer).getLayerStatus()
```
获得图层当前在画布中的状态（位置、被旋转角度、透明度、缩放）。

更多说明：[图层状态的继承](#图层状态的继承)


#### turnTo 转向
```js
const mt = new Player().job('战士').addTo(sketch.layer).xy(0, 20)
const boss = new Monster().addTo(sketch.layer).turnTo(mt)
```
将 `boss` 转向MT。(`boss`图层的北面)

如需背对则可以使用 `turnTo(mt, 180)`，即面朝MT后再转180度。

一次性的，移动后请重新调用。

注：这个方法是建立在`getLayerStatus`基础上的，不要在添加到画布上之前调用 `turnTo`。


#### clone 克隆、复制

```js
const doll = new Monster()
    .addTo(sketch.layer)
    .add(new Text().value('狩猎人偶'))

const doll2 = doll.clone().addTo(sketch.layer)
```

复制一个 `doll`，对 `doll2` 操作不会影响到 `doll`.

可以将组合好的图层当作**预设模版**，不加入到画布。在需要用的时候进行`clone`。

但是只能`clone`只能简单地复制外表，事件之类的是无法复制的。如有需求可以使用用工厂函数的形式进行创建。

#### 事件

可以通过 `on`, `off`, `emit` 添加事件监听、移除事件监听、发起事件。

```js
const boss = new Monster()

const fn = (a, b) => {
    console.log(a, b)
}

// 添加事件监听
boss.on('test', fn)

// 发起事件
boss.emit('test', ['参数1', '参数2']) // 将会输出: 参数1, 参数2

// 移除事件监听
boss.off('test', fn)
```

### 图形类（继承于 Layer）
每种图形类有独有的属性和操作方法，请到 [API Document](https://aweikalee.github.io/ffxiv-raid-sketch/) 进行查询。

图形类独有的属性都放入了 `props` 中。`props` 和 `state` 一样可以通过 3 种方法设置（见 [state 图层状态](#state-图层状态)）。


## 动画

虽然本身不支持动画，但是可以通过操作图形实例实现动画。

```js
const boss = new Monster().addTo(sketch.layer)
let angle = 0

setInterval(() => {
    angle += 1
    boss.rotate(angle)
}, 100)
```

## Alias 别名
以`Player`举例，

```js
new Player('吟游诗人')

Player.setAlias('吟游诗人', '诗人')

new Player('诗人')
```

为 `吟游诗人` 设置别名 `诗人` 之后，设置职业时就可以用 `诗人` 代替 `吟游诗人`了。

`Mark`, `Waymark`, `Player` 都有别名系统，最终都会定向到预设好的官方英文全名。