# FFXIV Raid Sketch

封装了方便绘制《最终幻想 14》攻略示意图的 `Canvas` 库。

## 安装

```
$ npm i ffxiv-raid-sketch
```

## 使用方式

### 基础用法

```js
import * as FRS from 'ffxiv-raid-sketch'

// 创建实例 添加到页面上
const sketch = new FRS.Sketch().appendTo(document.body)

// 创建一个半径为40的圆
new FRS.Circle().addTo(sketch)
```

### 按需引入


```js
import Sketch from 'ffxiv-raid-sketch/es/Sketch'
import Circle from 'ffxiv-raid-sketch/es/Circle'

const sketch = new Sketch().appendTo(document.body)
new Circle().addTo(sketch)
```

### 直接在浏览器中使用

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="./ffxiv-raid-sketch.umd.min.js"></script>
    </head>

    <body>
        <script>
            var sketch = new FRS.Sketch().appendTo(document.body)

            // 圆形场地
            new FRS.Circle().addTo(sketch)
        </script>
    </body>
</html>
```