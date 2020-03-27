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
    canvas: document.getElementById('canvas'),
    w: 400,
    h: 400,
    unit: 4
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

## Layer

一切图形继承于 `Layer` 类。

### 方法

#### add 添加子图层

```js
new Circle().add(new FRS.Rect())
```

将 `Rect` 添加到了 `Circle` 图层里。 `Rect` 将会随着 `Circle` 移动、旋转、缩放、设置不透明度。

相关方法：`addTo`, `remove`, `removeAll`

#### xy 坐标

```js
new Rect().xy(10, 10)
```

将 `Rect` 设置在相对坐标(10, 10)的位置。

#### rotate 旋转

```js
new Rect().rotate(45)
```

将 `Rect` 顺时针旋转 45 度。

#### scale 缩放

```js
new Rect().scale(1.5, 2)
```

将 `Rect` 横向缩放设为 1.5 倍，纵向缩放设为2倍。

#### opacity 不透明度

```js
new Rect().scale(0.5)
```

将 `Rect` 不透明度设为 0.5。

#### fill 填充颜色
```js
new Rect().fill('#f00')
```

#### stroke 描边颜色
```js
new Rect().stroke('#f00')
```

#### stokeWidth 描边宽度
```js
new Rect().strokeWidth(4)
```
`strokeWidth` 不受 `unit` 影响，设为 4 就是 4px。

#### show, hide 设置可见 / 不可见
```js
const boss = new Monster()

boss.hide()

boss.show()
```
设为不可见后，渲染时将会被跳过，节省开销。


#### getLayerStatus 获得图层状态
```js
new Rect().addTo(sketch.layer).getLayerStatus()
```
获得图层当前在画布中的状态（位置、被旋转角度、透明度、缩放）。

主要针对嵌套图层，嵌套图层将会进行多次位移、旋转、改透明度、缩放。该方法则是多次嵌套后，计算得到最终状态。

属性从自身累加到最顶层的父图层。如果图层没有父图层，获得的值就等于自身的`props`。


#### turnTo 转向
```js
const mt = new Player('战士').addTo(sketch.layer).xy(0, 20)
const boss = new Monster().addTo(sketch.layer).turnTo(mt)
```
将 `boss` 转向MT。(`boss`图层的北面)

如需背对则可以使用 `turnTo(mt, 180)`，即面朝MT后再转180度。

一次性的，移动后请重新调用。

注：这个方法是建立在`getLayerStatus`基础上的，不建议在添加到画布上之前调用 `turnTo`。


#### clone 克隆、复制

```js
const doll = new Monster().add(new Text('狩猎人偶')).addTo(sketch.layer)

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

#### 其他

每种图形类有独有的属性和操作方法，请到 [API Document](https://aweikalee.github.io/ffxiv-raid-sketch/) 进行查询。

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
而 `Img` 的别名系统则就是一个字符串映射。