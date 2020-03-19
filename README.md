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
new FRS.Circle().addTo(sketch)
```
若不传入 `canvas` 内部将会创建一个，之后需通过 `appendTo` 添加到页面中。

`unit` 为基准单位(px)，除了 `strokeWidth` 以外的坐标、尺寸都将乘上这个基准单位再输出。

### 按需引入

```js
import Sketch from 'ffxiv-raid-sketch/es/Sketch'
import Circle from 'ffxiv-raid-sketch/es/Circle'

const sketch = new Sketch().appendTo(document.body)
new Circle().addTo(sketch)
```

### 在浏览器中使用

```js
var sketch = new FRS.Sketch().appendTo(document.body) // 圆形场地 new
FRS.Circle().addTo(sketch)
```

## Layer

一切图形继承于 `Layer` 类。

### 方法

#### add 添加子图层

```js
new FRS.Circle().add(new FRS.Rect())
```

将 `Rect` 添加到了 `Circle` 图层里。 `Rect` 将会随着 `Circle` 移动、旋转、缩放、设置不透明度。

相关方法：`addTo`, `remove`

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
new Rect().scale(1.5)
```

将 `Rect` 缩放设为 1.5 倍。

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


#### clone 克隆、复制

```js
const doll = new Monster().add(new Text('狩猎人偶')).addTo(sketch)

const doll2 = doll.clone().addTo(sketch)
```

复制一个 `doll`，对 `doll2` 操作不会影响到 `doll`.

可以将组合好的图层当作**预设模版**，不加入到画布。在需要用的时候进行`clone`。

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
const boss = new Monster().addTo(sketch)
let angle = 0

setInterval(() => {
    angle += 1
    boss.rotate(angle)
}, 100)
```