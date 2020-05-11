(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.FRS = {}));
}(this, (function (exports) { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  /**
   * 向量相对y轴的旋转角
   *
   * 注意：此处坐标是图层坐标 不是数学坐标（y轴方向相反）
   * @ignore
   * */
  function rotationAngleY(x, y) {
    var angle = Math.acos(-y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
    return x > 0 ? angle : -angle;
  }
  /**
   * @ignore
   */

  function rotateVector(x, y, angle) {
    return [Math.cos(angle) * x - Math.sin(angle) * y, Math.sin(angle) * x + Math.cos(angle) * y];
  }

  /**
   * 合并对象, b将会合并到a
   * @ignore
   */
  function merge(a, b) {
    return Object.assign(a, b);
  }

  /**
   * @ignore
   */
  var hasOwnProperty = Object.hasOwnProperty.call.bind(Object.hasOwnProperty);
  /**
   * @ignore
   */

  function hasOwn(target, key) {
    return hasOwnProperty(target, key);
  }

  /**
   * @ignore
   */
  var Subscribe = /*#__PURE__*/function () {
    function Subscribe() {
      _classCallCheck(this, Subscribe);

      this.map = new Map();
    }

    _createClass(Subscribe, [{
      key: "on",
      value: function on(type, event) {
        if (!this.map.has(type)) {
          this.map.set(type, []);
        }

        var arr = this.map.get(type);
        var index = arr.indexOf(event);

        if (index !== -1) {
          arr.splice(index, 1);
        }

        arr.push(event);
      }
    }, {
      key: "once",
      value: function once(type, event) {
        var _this = this;

        var fn = function fn() {
          event.apply(void 0, arguments);

          _this.off(type, fn);
        };

        this.on(type, fn);
      }
    }, {
      key: "off",
      value: function off(type, event) {
        if (!this.map.has(type)) {
          return;
        }

        var arr = this.map.get(type);
        var index = arr.indexOf(event);

        if (index !== -1) {
          arr.splice(index, 1);
        }
      }
    }, {
      key: "emit",
      value: function emit(type, args) {
        if (!this.map.has(type)) {
          return;
        }

        this.map.get(type).forEach(function (event) {
          event.apply(void 0, _toConsumableArray(args));
        });
      }
    }]);

    return Subscribe;
  }();

  /**
   * @ignore
   */

  function proxy(target, onChange) {
    var isArray = Array.isArray(target);
    return new Proxy(target, {
      set: function set(target, key, value, receiver) {
        var oldValue = target[key];
        var hadChange = oldValue !== value;
        var hasOwnBeforeChange = hasOwn(target, key);
        var res = Reflect.set(target, key, value, receiver);

        if (hadChange && hasOwn(target, key)) {
          try {
            onChange(key, oldValue, value, target);
          } catch (err) {
            if (hasOwnBeforeChange) {
              target[key] = oldValue;
            } else {
              if (isArray) {
                target.splice(key, 1);
              } else {
                delete target[key];
              }
            }

            throw err;
          }
        }

        return res;
      },
      deleteProperty: function deleteProperty(target, key) {
        var oldValue = target[key];
        var res = Reflect.deleteProperty(target, key);

        if (!isArray) {
          try {
            onChange(key, oldValue, undefined, target);
          } catch (err) {
            target[key] = oldValue;
            throw err;
          }
        }

        return res;
      }
    });
  }

  /**
   * @ignore
   */
  function createValidator(validators) {
    return function (key, newValue, oldValue) {
      if (key in validators) {
        return validators[key](newValue, oldValue);
      } else {
        return true;
      }
    };
  }
  /**
   * @ignore
   */

  function isNumber(value) {
    return typeof value === 'number';
  }
  /**
   * @ignore
   */

  function isString(value) {
    return typeof value === 'string';
  }
  /**
   * @ignore
   */

  function isBoolean(value) {
    return typeof value === 'boolean';
  }
  /**
   * @ignore
   */

  function isCanvasGradient(value) {
    return value instanceof CanvasGradient;
  }
  /**
   * @ignore
   */

  function isCanvasPattern(value) {
    return value instanceof CanvasPattern;
  }
  /**
   * @ignore
   */

  function isCanvasTextAlign(value) {
    return ['center', 'end', 'left', 'right', 'start'].includes(value);
  }
  /**
   * @ignore
   */

  function isArray(value, typeCheck) {
    return Array.isArray(value) && (typeCheck ? value.every(function (v) {
      return typeCheck(v);
    }) : true);
  }

  /**
   * 深拷贝
   *
   * 暂时只支持 普通object/array
   * @param target object/array
   * @ignore
   */
  function deepClone(target) {
    if (_typeof(target) === 'object' && target !== null) {
      var cloneTarget = Array.isArray(target) ? [] : {};

      for (var key in target) {
        cloneTarget[key] = deepClone(target[key]);
      }

      return cloneTarget;
    } else {
      return target;
    }
  }

  /**
   * @ignore
   */
  function defineImmutable(o, p, target) {
    return Object.defineProperty(o, p, {
      get: function get() {
        return target;
      },
      set: function set() {
        console.log(o);
        throw new Error("".concat(p, " is immutable"));
      }
    });
  }
  /**
   * @ignore
   */

  function defineProperties(o, properties) {
    return Object.defineProperties(o, properties);
  }

  var validator = createValidator({
    x: function x(value) {
      if (!isNumber(value)) {
        throw new Error('x must be a number');
      }

      return true;
    },
    y: function y(value) {
      if (!isNumber(value)) {
        throw new Error('y must be a number');
      }

      return true;
    },
    rotate: function rotate(value) {
      if (!isNumber(value)) {
        throw new Error('rotate must be a number');
      }

      return true;
    },
    scaleX: function scaleX(value) {
      if (!isNumber(value)) {
        throw new Error('scaleX must be a number');
      }

      return true;
    },
    scaleY: function scaleY(value) {
      if (!isNumber(value)) {
        throw new Error('scaleY must be a number');
      }

      return true;
    },
    opacity: function opacity(value) {
      if (!isNumber(value)) {
        throw new Error('opacity must be a number');
      }

      return true;
    },
    fill: function fill(value) {
      if (!(isString(value) || isCanvasGradient(value) || isCanvasPattern(value))) {
        throw new Error('fill must be a string/CanvasGradient/CanvasPattern');
      }

      return true;
    },
    stroke: function stroke(value) {
      if (!(isString(value) || isCanvasGradient(value) || isCanvasPattern(value))) {
        throw new Error('stroke must be a string/CanvasPattern/CanvasPattern');
      }

      return true;
    },
    strokeWidth: function strokeWidth(value) {
      if (!isNumber(value)) {
        throw new Error('strokeWidth must be a number');
      }

      return true;
    },
    visible: function visible(value) {
      if (!isBoolean(value)) {
        throw new Error("visible must be a boolean");
      }

      return true;
    }
  });
  /**
   * 图层
   *
   * 基础类，其他形状、图形类都是继承自 [[Layer]]
   */

  var Layer = /*#__PURE__*/function () {
    function Layer() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Layer);

      this.subscribe = new Subscribe();
      var theState = proxyState(this, {
        x: 0,
        y: 0,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        fill: '#000000',
        stroke: '#000000',
        strokeWidth: 2,
        visible: true
      });
      var parent = proxyParent(this, null);
      var children = proxyChildren(this, []);
      defineImmutable(this, 'state', theState);
      defineProperties(this, {
        parent: {
          get: function get() {
            return parent.value;
          },
          set: function set(v) {
            parent.value = v;
          }
        },
        children: {
          get: function get() {
            return children.value;
          },
          set: function set(v) {
            children.value = v;
          }
        }
      });
      merge(this.state, state);
    }
    /**
     * 添加子图层
     */


    _createClass(Layer, [{
      key: "add",
      value: function add(layer) {
        if (!isLayer(layer)) {
          throw new Error("add(value), value must be a Layer");
        }

        layer.parent = this;
        return this;
      }
      /**
       * 添加到父图层
       */

    }, {
      key: "addTo",
      value: function addTo(layer) {
        if (!isLayer(layer)) {
          throw new Error("addTo(value), value must be a Layer");
        }

        this.parent = layer;
        return this;
      }
      /**
       * 移除子图层
       */

    }, {
      key: "remove",
      value: function remove(layer) {
        if (!isLayer(layer)) {
          throw new Error("remove(value), value must be a Layer");
        }

        layer.parent = null;
        return this;
      }
      /**
       * 移除全部子图层
       */

    }, {
      key: "removeAll",
      value: function removeAll() {
        var _this = this;

        this.children.forEach(function (child) {
          return _this.remove(child);
        });
        return this;
      }
      /**
       * 克隆
       */

    }, {
      key: "clone",
      value: function clone() {
        var clone = this._clone();

        this.children.forEach(function (v) {
          clone.add(v.clone());
        });
        this.emit('clone', [clone]);
        return clone;
      }
      /**
       * 渲染
       */

    }, {
      key: "render",
      value: function render(ctx, utils) {
        if (!this.state.visible) return;
        var _this$state = this.state,
            x = _this$state.x,
            y = _this$state.y,
            rotate = _this$state.rotate,
            scaleX = _this$state.scaleX,
            scaleY = _this$state.scaleY,
            opacity = _this$state.opacity,
            fill = _this$state.fill,
            stroke = _this$state.stroke,
            strokeWidth = _this$state.strokeWidth;
        var mapping = utils.mapping;
        ctx.save();

        if (x !== 0 || y !== 0) {
          ctx.translate(mapping(x), mapping(y));
        }

        if (scaleX !== 1 || scaleY !== 1) {
          ctx.scale(scaleX, scaleY);
        }

        if (rotate !== 0) {
          ctx.rotate(rotate * Math.PI / 180);
        }

        if (opacity !== 1) {
          ctx.globalAlpha *= opacity;
        }

        ctx.fillStyle = fill;
        ctx.strokeStyle = stroke;
        ctx.lineWidth = strokeWidth;

        try {
          this._render(ctx, utils);
        } catch (err) {
          console.error(err);
        }

        this.children.forEach(function (child) {
          return child.render(ctx, utils);
        });
        ctx.restore();
        this.emit('rendered', []);
      }
      /**
       * 获得当前图层 在画布中的状态
       *
       * x, y返回的是相对坐标
       */

    }, {
      key: "getLayerStatus",
      value: function getLayerStatus() {
        var _this$state2 = this.state,
            x = _this$state2.x,
            y = _this$state2.y,
            rotate = _this$state2.rotate,
            scaleX = _this$state2.scaleX,
            scaleY = _this$state2.scaleY,
            opacity = _this$state2.opacity;
        var parent = this.parent;

        while (parent) {
          var _parent$state = parent.state,
              _x = _parent$state.x,
              _y = _parent$state.y,
              _rotate = _parent$state.rotate,
              _scaleX = _parent$state.scaleX,
              _scaleY = _parent$state.scaleY,
              _opacity = _parent$state.opacity;

          var _rotateVector = rotateVector(x, y, _rotate * Math.PI / 180);

          var _rotateVector2 = _slicedToArray(_rotateVector, 2);

          x = _rotateVector2[0];
          y = _rotateVector2[1];
          rotate += _rotate; // 缩放

          x *= _scaleX;
          y *= _scaleY;
          scaleX *= scaleX;
          scaleY *= scaleY; // 位移

          x += _x;
          y += _y; // 透明度

          opacity *= _opacity;
          parent = parent.parent;
        }

        return {
          x: x,
          y: y,
          rotate: rotate,
          scaleX: scaleX,
          scaleY: scaleY,
          opacity: opacity
        };
      }
      /**
       * 将原始北面转向目标图层
       * @param layer 目标图层
       * @param offset 偏移角度
       */

    }, {
      key: "turnTo",
      value: function turnTo(layer) {
        var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (!isLayer(layer)) {
          throw new Error("turnTo(value, offset), value must be a Layer");
        }

        if (!isNumber(offset)) {
          throw new Error("turnTo(value, offset), offset must be a number");
        }

        var p1 = this.getLayerStatus();
        var p2 = layer.getLayerStatus();
        var rotate = rotationAngleY(p2.x - p1.x, p2.y - p1.y) / Math.PI * 180;
        this.rotate(rotate - p1.rotate + this.state.rotate + offset);
        return this;
      }
      /**
       * 设置坐标
       */

    }, {
      key: "xy",
      value: function xy(x, y) {
        this.state.x = x;
        this.state.y = y;
        return this;
      }
      /**
       * 设置透明度
       */

    }, {
      key: "opacity",
      value: function opacity(value) {
        this.state.opacity = value;
        return this;
      }
      /**
       * 设置旋转角度
       */

    }, {
      key: "rotate",
      value: function rotate(value) {
        this.state.rotate = value;
        return this;
      }
      /**
       * 设置缩放
       */

    }, {
      key: "scale",
      value: function scale(x, y) {
        this.state.scaleX = x;
        this.state.scaleY = y !== undefined ? y : x;
        return this;
      }
      /**
       * 设置描边颜色
       */

    }, {
      key: "stroke",
      value: function stroke(value) {
        this.state.stroke = value;
        return this;
      }
      /**
       * 设置描边宽度
       */

    }, {
      key: "strokeWidth",
      value: function strokeWidth(value) {
        this.state.strokeWidth = value;
        return this;
      }
      /**
       * 设置填充颜色
       */

    }, {
      key: "fill",
      value: function fill(value) {
        this.state.fill = value;
        return this;
      }
      /**
       * 设置为可见
       */

    }, {
      key: "show",
      value: function show() {
        this.state.visible = true;
        return this;
      }
      /**
       * 设置为不可见
       */

    }, {
      key: "hide",
      value: function hide() {
        this.state.visible = false;
        return this;
      }
      /**
       * 绑定事件监听
       */

    }, {
      key: "on",
      value: function on(type, event) {
        this.subscribe.on(type, event);
        return this;
      }
      /**
       * 绑定一次性事件监听
       */

    }, {
      key: "once",
      value: function once(type, event) {
        this.subscribe.once(type, event);
        return this;
      }
      /**
       * 取消事件监听
       */

    }, {
      key: "off",
      value: function off(type, event) {
        this.subscribe.off(type, event);
        return this;
      }
      /**
       * 发起事件
       */

    }, {
      key: "emit",
      value: function emit(type, args) {
        this.subscribe.emit(type, args);
        return this;
      }
    }, {
      key: "_clone",
      value: function _clone() {
        return new Layer(deepClone(this.state));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {}
    }]);

    return Layer;
  }();
  function isLayer(value) {
    return value instanceof Layer;
  }
  /**
   * @ignore
   */

  function proxyState(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue) {
      if (!validator(key, newValue, oldValue)) return;
      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }
  /**
   * @ignore
   */


  function proxyParent(that, initialValue) {
    var onChildrenChange;
    return proxy({
      value: initialValue
    }, function (key, oldValue, newValue) {
      if (key !== 'value') return;

      if (!(isLayer(newValue) || newValue === null)) {
        throw new Error("parent must be a Layer");
      } // 从旧的父图层中移除


      if (oldValue !== null) {
        var index = oldValue.children.indexOf(that);

        if (index !== -1) {
          oldValue.children.splice(index, 1);
        }

        that.off('change', onChildrenChange);
      } // 添加到新的父图层


      if (newValue !== null) {
        newValue.children.push(that);

        onChildrenChange = function onChildrenChange() {
          return newValue.emit('change', []);
        };

        that.on('change', onChildrenChange);
      }

      that.emit('parent', [that.parent]);
      that.emit('change', []);
    });
  }
  /**
   * @ignore
   */


  function proxyChildren(that, initialValue) {
    return proxy({
      value: proxyChildrenArray(that, initialValue)
    }, function (key, oldValue, newValue, target) {
      if (key !== 'value') return;

      if (!Array.isArray(newValue) || newValue.some(function (v) {
        return !isLayer(v);
      })) {
        throw new Error("children must be a Layer[]");
      }

      target[key] = proxyChildrenArray(that, newValue);
      that.emit('children', [that.children]);
      that.emit('change', []);
    });
  }
  /**
   * @ignore
   */


  function proxyChildrenArray(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue, target) {
      if (key >= 0) {
        if (isLayer(newValue)) {
          if (newValue.parent !== that) {
            target.splice(Number(key), 1);
            newValue.parent = that;
          }
        } else {
          throw new Error("children's value must be a Layer");
        }
      }

      that.emit('children', [that.children]);
      that.emit('change', []);
    });
  }

  /**
   * @ignore
   */

  var validator$1 = createValidator({
    w: function w(value) {
      if (!isNumber(value)) {
        throw new Error('w must be a number');
      }

      return true;
    },
    h: function h(value) {
      if (!isNumber(value)) {
        throw new Error('h must be a number');
      }

      return true;
    },
    unit: function unit(value) {
      if (!isNumber(value)) {
        throw new Error('unit must be a number');
      }

      return true;
    },
    canvas: function canvas(value) {
      if (!(value instanceof HTMLCanvasElement || value === null)) {
        throw new Error('angle must be a number');
      }

      return true;
    }
  });
  /**
   * 画布
   */

  var Sketch = /*#__PURE__*/function () {
    function Sketch() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Sketch);

      /* 抽出canvas重新赋值 是为了触发proxy内的连带设置 */
      var _a = Sketch.defaultOptions,
          canvas = _a.canvas,
          defaultOptions = __rest(_a, ["canvas"]);

      var theOptions = proxyOptions(this, Object.assign({
        canvas: null
      }, defaultOptions));
      var layer = proxyLayer(this, new Layer());
      defineImmutable(this, 'options', theOptions);
      defineProperties(this, {
        layer: {
          get: function get() {
            return layer.value;
          },
          set: function set(v) {
            layer.value = v;
          }
        },
        canvas: {
          get: function get() {
            return theOptions.canvas;
          },
          set: function set(v) {
            theOptions.canvas = v;
          }
        }
      });
      merge(this.options, Object.assign({
        canvas: canvas
      }, options));
    }
    /**
     * 渲染
     *
     * 不需要主动调用，任何操作都后都会发起渲染请求
     */


    _createClass(Sketch, [{
      key: "render",
      value: function render() {
        var _this = this;

        if (this.raf) return this;
        this.raf = requestAnimationFrame(function () {
          _this.raf = null;

          _this._render();
        });
        return this;
      }
      /**
       * 将 Canvas 添加到 ...
       */

    }, {
      key: "appendTo",
      value: function appendTo(element) {
        if (!this.canvas) this.canvas = document.createElement('canvas');
        element.appendChild(this.canvas);
        return this.render();
      }
      /**
       * 设置画布尺寸
       * @param w 宽度
       * @param h 高度
       */

    }, {
      key: "size",
      value: function size(w, h) {
        this.options.w = w;
        this.options.h = h === undefined ? w : h;
        return this;
      }
      /**
       * 设置基数
       * @param value 推荐是画布宽度或高度的 1%
       */

    }, {
      key: "unit",
      value: function unit(value) {
        this.options.unit = value;
        return this;
      }
    }, {
      key: "_render",
      value: function _render() {
        var ctx = this.ctx;
        var _this$options = this.options,
            w = _this$options.w,
            h = _this$options.h,
            unit = _this$options.unit;
        if (!ctx) return;
        var utils = {
          mapping: function mapping(value) {
            return value * unit;
          },
          unmapping: function unmapping(value) {
            return value / unit;
          }
        };
        ctx.clearRect(0, 0, w, h);
        ctx.save();
        ctx.translate(w / 2, h / 2);
        this.layer.render(ctx, utils);
        ctx.restore();
      }
    }]);

    return Sketch;
  }();
  Sketch.defaultOptions = {
    w: 600,
    h: 600,
    unit: 6,
    canvas: null
  };
  /**
   * @ignore
   */

  function proxyOptions(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue, target) {
      if (!validator$1(key, newValue, oldValue)) return;
      var canvas = target['canvas'];

      switch (key) {
        case 'canvas':
          if (canvas) {
            that.ctx = canvas.getContext('2d');
            canvas.width = target['w'];
            canvas.height = target['h'];
          } else {
            that.ctx = null;
          }

          break;

        case 'w':
          if (canvas) {
            target['canvas'].width = target['w'];
          }

          break;

        case 'h':
          if (canvas) {
            target['canvas'].height = target['h'];
          }

          break;
      }

      that.render();
    });
  }
  /**
   * @ignore
   */


  function proxyLayer(that, initialValue) {
    var onChange = that.render.bind(that);
    initialValue.on('change', onChange);
    return proxy({
      value: initialValue
    }, function (key, oldValue, newValue, target) {
      if (key !== 'value') return;

      if (!(newValue instanceof Layer)) {
        throw new Error("layer must be a Layer");
      }

      if (oldValue) {
        oldValue.off('change', onChange);
      }

      newValue.on('change', onChange);
      that.render();
    });
  }

  /**
   * @ignore
   */

  var LINECAP = ['none', 'point', 'arrow', 'triangle'];
  /**
   * @ignore
   */

  var validator$2 = createValidator({
    coordinates: function coordinates(value) {
      if (!isArray(value, function (v) {
        return isArray(v, isNumber) && v.length >= 2;
      })) {
        throw new Error('coordinates must be a number[][]');
      }

      return true;
    },
    smooth: function smooth(value) {
      if (!isBoolean(value)) {
        throw new Error('smooth must be a boolean');
      }

      return true;
    },
    dash: function dash(value) {
      if (!(value === null || isArray(value, isNumber))) {
        throw new Error('dash must be a number[]/null');
      }

      return true;
    },
    startCap: function startCap(value) {
      if (!isLineCap(value)) {
        throw new Error('startCap must be a number[]/null');
      }

      return true;
    },
    endCap: function endCap(value) {
      if (!isLineCap(value)) {
        throw new Error('endCap must be a number[]/null');
      }

      return true;
    }
  });
  /**
   * 可绘制 折线、二次曲线、贝塞尔曲线（任意组合）
   */

  var Line = /*#__PURE__*/function (_Layer) {
    _inherits(Line, _Layer);

    function Line() {
      var _this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Line);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this, Object.assign({
        fill: 'transparent',
        stroke: '#c79a66'
      }, state)));
      var theProps = proxyProps(_assertThisInitialized(_this), {
        coordinates: proxyCoordinates(_assertThisInitialized(_this), []),
        smooth: false,
        dash: null,
        startCap: 'none',
        endCap: 'none'
      });
      defineImmutable(_assertThisInitialized(_this), 'props', theProps);
      merge(_this.props, props);
      return _this;
    }
    /**
     * 设置线段点位
     *
     * 根据参数使用不同的绘制算法
     *
     * - `x, y` 直线
     * - `x, y, cp1x, cp1y` 二次曲线
     * - `x, y, cp1x, cp1y, cp2x, cp2y` 贝塞尔曲线
     * @param x 新的结束坐标x
     * @param y 新的结束坐标y
     * @param cp1x 二次曲线控制点坐标x / 贝塞尔曲线控制点1坐标x
     * @param cp1y 二次曲线控制点坐标y / 贝塞尔曲线控制点1坐标y
     * @param cp2x 贝塞尔曲线控制点2坐标x
     * @param cp2y 贝塞尔曲线控制点2坐标y
     */


    _createClass(Line, [{
      key: "to",
      value: function to(x, y, cp1x, cp1y, cp2x, cp2y) {
        var arr = [x, y, cp1x, cp1y, cp2x, cp2y];

        while (arr.length) {
          var cur = arr.pop();

          if (cur !== undefined) {
            arr.push(cur);
            break;
          }
        }

        this.props.coordinates.push(arr);
        return this;
      }
      /**
       * 清空所有坐标点
       */

    }, {
      key: "clear",
      value: function clear() {
        this.props.coordinates = [];
        return this;
      }
      /**
       * 设置出发端点样式
       */

    }, {
      key: "startCap",
      value: function startCap(value) {
        this.props.startCap = value;
        return this;
      }
      /**
       * 设置结束端点样式
       */

    }, {
      key: "endCap",
      value: function endCap(value) {
        this.props.endCap = value;
        return this;
      }
      /**
       * 光滑折线（曲线点不受影响）
       */

    }, {
      key: "smooth",
      value: function smooth(value) {
        this.props.smooth = value;
        return this;
      }
      /**
       * 设置线段样式
       *
       * 数值最后将 * strokeWidth 后再被应用
       */

    }, {
      key: "dash",
      value: function dash(value) {
        this.props.dash = value;
        return this;
      }
    }, {
      key: "_clone",
      value: function _clone() {
        return new Line(deepClone(this.state), deepClone(this.props));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {
        var state = this.state,
            props = this.props;
        var _this$props = this.props,
            coord = _this$props.coordinates,
            startCap = _this$props.startCap,
            endCap = _this$props.endCap;
        /* 绘制线 */

        drawLine({
          state: state,
          props: props,
          ctx: ctx,
          utils: utils
        });
        /* 绘制线帽 */

        if (coord.length >= 2) {
          var end = [coord[coord.length - 2], coord[coord.length - 1]];
          var startFrom = {
            x: coord[1][0],
            y: coord[1][1]
          };
          var startTo = {
            x: coord[0][coord[0].length - 2],
            y: coord[0][coord[0].length - 1]
          };
          var endFrom = end[1].length === 2 ? {
            x: end[0][end[0].length - 2],
            y: end[0][end[0].length - 1]
          } : {
            x: end[1][end[1].length - 4],
            y: end[1][end[1].length - 3]
          };
          var endTo = {
            x: end[1][end[1].length - 2],
            y: end[1][end[1].length - 1]
          };
          drawCap({
            state: state,
            ctx: ctx,
            utils: utils,
            type: startCap,
            from: startFrom,
            to: startTo
          });
          drawCap({
            state: state,
            ctx: ctx,
            utils: utils,
            type: endCap,
            from: endFrom,
            to: endTo
          });
        }
      }
    }]);

    return Line;
  }(Layer);

  function proxyProps(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue, target) {
      if (!validator$2(key, newValue, oldValue)) return;

      if (key === 'coordinates') {
        target['coordinates'] = proxyCoordinates(that, newValue);
      } else if (key === 'dash') {
        Object.freeze(newValue);
      }

      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }
  /**
   * @ignore
   */


  function proxyCoordinates(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue) {
      if (key >= 0) {
        if (!isArray(newValue, isNumber)) {
          throw new Error("coordinates's value must be a number[]");
        }

        var length = newValue.length;

        if (key == 0 && length !== 2) {
          throw new Error("coordinates[0]'s length must equals 2");
        } else if (key != 0 && (length % 2 !== 0 || length > 6 || length < 2)) {
          throw new Error("coordinates value's length must equals 2/4/6");
        }

        Object.freeze(newValue);
      }

      that.emit('coordinates', [that.props.coordinates]);
      that.emit('change', []);
    });
  }
  /**
   * @ignore
   */


  function drawLine(_ref) {
    var state = _ref.state,
        props = _ref.props,
        ctx = _ref.ctx,
        utils = _ref.utils;
    var strokeWidth = state.strokeWidth;
    var coordinates = props.coordinates,
        dash = props.dash,
        smooth = props.smooth;
    var mapping = utils.mapping;
    ctx.save();
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    /* 线段样式 */

    if (dash) {
      ctx.setLineDash(dash.map(function (v) {
        return v * strokeWidth;
      }));
    }
    /* 绘制线段 */


    var _coordinates = [coordinates[0], coordinates[0]].concat(_toConsumableArray(coordinates), [coordinates[coordinates.length - 1]]);

    for (var i = 2, len = _coordinates.length - 1; i < len; i += 1) {
      var now = _coordinates[i];

      if (now.length === 6) {
        ctx.bezierCurveTo.apply(ctx, now.map(function (v) {
          return mapping(v);
        }));
        continue;
      }

      if (now.length === 4) {
        ctx.quadraticCurveTo.apply(ctx, now.map(function (v) {
          return mapping(v);
        }));
        continue;
      }

      if (!smooth || i === 2) {
        ctx.lineTo(mapping(now[0]), mapping(now[1]));
        continue;
      } // 平滑曲线


      var c = [_coordinates[i - 2], _coordinates[i - 1], now, _coordinates[i + 1]];
      var level = 8;
      var cp1x = c[1][0] + (c[2][0] - c[0][0]) / level;
      var cp1y = c[1][1] + (c[2][1] - c[0][1]) / level;
      var cp2x = c[2][0] - (c[3][0] - c[1][0]) / level;
      var cp2y = c[2][1] - (c[3][1] - c[1][1]) / level;

      if (i === len - 1) {
        ctx.quadraticCurveTo.apply(ctx, [cp1x, cp1y, now[0], now[1]].map(function (v) {
          return mapping(v);
        }));
        continue;
      }

      if (i === 3) {
        ctx.quadraticCurveTo.apply(ctx, [cp2x, cp2y, now[0], now[1]].map(function (v) {
          return mapping(v);
        }));
        continue;
      }

      ctx.bezierCurveTo.apply(ctx, [cp1x, cp1y, cp2x, cp2y, now[0], now[1]].map(function (v) {
        return mapping(v);
      }));
    }

    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  /**
   * @ignore
   */


  function drawCap(_ref2) {
    var state = _ref2.state,
        ctx = _ref2.ctx,
        utils = _ref2.utils,
        type = _ref2.type,
        from = _ref2.from,
        to = _ref2.to;
    var stroke = state.stroke,
        strokeWidth = state.strokeWidth;
    var mapping = utils.mapping;
    ctx.save();
    ctx.beginPath();
    ctx.translate(mapping(to.x), mapping(to.y));
    var r;

    switch (type) {
      case 'none':
        break;

      case 'point':
        r = strokeWidth * 0.8 + 1;
        ctx.fillStyle = stroke;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 'arrow':
        r = strokeWidth + 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.rotate(rotationAngleY(to.x - from.x, to.y - from.y));
        ctx.beginPath();
        ctx.lineTo(-r, r);
        ctx.lineTo(0, 0);
        ctx.lineTo(r, r);
        ctx.stroke();
        break;

      case 'triangle':
        r = strokeWidth * 1.5 + 4;
        ctx.rotate(rotationAngleY(to.x - from.x, to.y - from.y));
        ctx.fillStyle = stroke;
        ctx.beginPath();
        ctx.lineTo(0, -r);
        ctx.lineTo(-r * Math.sqrt(3) / 2, r / 2);
        ctx.lineTo(r * Math.sqrt(3) / 2, r / 2);
        ctx.fill();
        break;
    }

    ctx.restore();
  }
  /**
   * @ignore
   */


  function isLineCap(value) {
    return LINECAP.includes(value);
  }

  /**
   * @ignore
   */

  var validator$3 = createValidator({
    w: function w(value) {
      if (!isNumber(value)) {
        throw new Error('w must be a number');
      }

      return true;
    },
    h: function h(value) {
      if (!isNumber(value)) {
        throw new Error('h must be a number');
      }

      return true;
    },
    dash: function dash(value) {
      if (!(value === null || isArray(value, isNumber))) {
        throw new Error('dash must be a number[]/null');
      }

      return true;
    }
  });
  /**
   * 绘制矩形
   */

  var Rect = /*#__PURE__*/function (_Layer) {
    _inherits(Rect, _Layer);

    function Rect() {
      var _this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Rect);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, Object.assign({
        fill: '#c79a667F',
        stroke: '#c79a66'
      }, state)));
      var theProps = proxyProps$1(_assertThisInitialized(_this), {
        w: 30,
        h: 30,
        dash: null
      });
      defineImmutable(_assertThisInitialized(_this), 'props', theProps);
      merge(_this.props, props);
      return _this;
    }
    /**
     * 设置尺寸
     * @param w 宽
     * @param h 高
     */


    _createClass(Rect, [{
      key: "size",
      value: function size(w, h) {
        this.props.w = w;
        this.props.h = h === undefined ? w : h;
        return this;
      }
      /**
       * 设置线段样式
       */

    }, {
      key: "dash",
      value: function dash(value) {
        this.props.dash = value;
        return this;
      }
    }, {
      key: "_clone",
      value: function _clone() {
        return new Rect(deepClone(this.state), deepClone(this.props));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {
        var state = this.state,
            props = this.props;
        var strokeWidth = state.strokeWidth;
        var mapping = utils.mapping;
        var w = props.w,
            h = props.h,
            dash = props.dash;

        if (dash) {
          ctx.setLineDash(dash.map(function (v) {
            return v * strokeWidth;
          }));
        }

        var _w = mapping(w);

        var _h = mapping(h);

        ctx.beginPath();
        ctx.rect(-_w / 2, -_h / 2, _w, _h);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }
    }]);

    return Rect;
  }(Layer);

  function proxyProps$1(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue) {
      if (!validator$3(key, newValue, oldValue)) return;

      if (key === 'dash') {
        Object.freeze(newValue);
      }

      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }

  /**
   * @ignore
   */

  var validator$4 = createValidator({
    size: function size(value) {
      if (!isNumber(value)) {
        throw new Error('size must be a number');
      }

      return true;
    },
    angle: function angle(value) {
      if (!isNumber(value)) {
        throw new Error('angle must be a number');
      }

      return true;
    },
    arc: function arc(value) {
      if (!isBoolean(value)) {
        throw new Error('arc must be a boolean');
      }

      return true;
    },
    dash: function dash(value) {
      if (!(value === null || isArray(value, isNumber))) {
        throw new Error('dash must be a number[]/null');
      }

      return true;
    }
  });
  /**
   * 可绘制 圆形、扇形、弧形
   */

  var Circle = /*#__PURE__*/function (_Layer) {
    _inherits(Circle, _Layer);

    function Circle() {
      var _this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Circle);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this, Object.assign({
        fill: '#c79a667F',
        stroke: '#c79a66'
      }, state)));
      var theProps = proxyProps$2(_assertThisInitialized(_this), {
        size: 30,
        angle: 360,
        arc: false,
        dash: null
      });
      defineImmutable(_assertThisInitialized(_this), 'props', theProps);
      merge(_this.props, props);
      return _this;
    }
    /**
     * 设置半径
     */


    _createClass(Circle, [{
      key: "size",
      value: function size(value) {
        this.props.size = value;
        return this;
      }
      /**
       * 设置张开角度
       */

    }, {
      key: "angle",
      value: function angle(value) {
        this.props.angle = value;
        return this;
      }
      /**
       * 设置弧形
       * @param value 值为 `true` 时，将不会渲染扇形两条直线的边。
       */

    }, {
      key: "arc",
      value: function arc(value) {
        this.props.arc = value;
        return this;
      }
      /**
       * 设置线段样式
       */

    }, {
      key: "dash",
      value: function dash(value) {
        this.props.dash = value;
        return this;
      }
    }, {
      key: "_clone",
      value: function _clone() {
        return new Circle(deepClone(this.state), deepClone(this.props));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {
        var strokeWidth = this.state.strokeWidth;
        var _this$props = this.props,
            size = _this$props.size,
            angle = _this$props.angle,
            arc = _this$props.arc,
            dash = _this$props.dash;
        var mapping = utils.mapping;

        if (dash) {
          ctx.setLineDash(dash.map(function (v) {
            return v * strokeWidth;
          }));
        }

        var _angle = angle * Math.PI / 180;

        ctx.rotate(-(Math.PI + _angle) / 2);
        ctx.beginPath();
        ctx.arc(0, 0, mapping(size), 0, _angle);

        if (!arc) {
          if (angle !== 360) {
            ctx.lineTo(0, 0);
          }

          ctx.closePath();
        }

        ctx.fill();
        ctx.stroke();
      }
    }]);

    return Circle;
  }(Layer);

  function proxyProps$2(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue) {
      if (!validator$4(key, newValue, oldValue)) return;

      if (key === 'dash') {
        Object.freeze(newValue);
      }

      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }

  /**
   * @ignore
   */

  var validator$5 = createValidator({
    src: function src(value) {
      if (!(value === null || isString(value))) {
        throw new Error("src must be a string/null");
      }

      return true;
    },
    size: function size(value) {
      if (!(isNumber(value) || value === 'auto')) {
        throw new Error("size must be a number/\"auto\"");
      }

      return true;
    }
  });

  var Img = /*#__PURE__*/function (_Layer) {
    _inherits(Img, _Layer);

    function Img() {
      var _this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Img);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Img).call(this, state));
      _this.image = new Image();
      _this.raf = null;

      _this.image.onload = function () {
        _this.emit('loaded', []);

        _this.emit('change', []);
      };

      var theProps = proxyProps$3(_assertThisInitialized(_this), {
        src: null,
        size: 'auto'
      });
      defineImmutable(_assertThisInitialized(_this), 'props', theProps);
      merge(_this.props, props);
      return _this;
    }
    /**
     * 设置图片路径
     */


    _createClass(Img, [{
      key: "src",
      value: function src(value) {
        this.props.src = value;
        return this;
      }
      /**
       * 设置图片渲染尺寸
       *
       * 相当于宽高的最大值
       *
       * 若想改变比例请使用 [[Img.scale]]
       */

    }, {
      key: "size",
      value: function size(value) {
        this.props.size = value;
        return this;
      }
    }, {
      key: "_clone",
      value: function _clone() {
        return new Img(deepClone(this.state), deepClone(this.props));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {
        var _this2 = this;

        var props = this.props,
            image = this.image;
        var size = props.size;
        var mapping = utils.mapping;

        if (this.raf) {
          cancelAnimationFrame(this.raf);
          this.raf = null;
        }

        if (!image.src) return; // 加载动画

        if (!image.complete) {
          var r = typeof size === 'number' ? size * 0.4 : 5;
          var time = Date.now();
          ctx.strokeStyle = '#99999990';
          ctx.lineWidth = mapping(r * 0.3);
          ctx.lineCap = 'round';
          ctx.rotate(time / 150 % (2 * Math.PI));
          ctx.beginPath();
          ctx.arc(0, 0, mapping(r), 0, 1.5 * Math.PI);
          ctx.stroke();
          this.raf = requestAnimationFrame(function () {
            _this2.emit('change', []);

            _this2.raf = null;
          });
          return;
        }

        var w = image.width;
        var h = image.height;

        if (size !== 'auto') {
          var ratio = mapping(size) / Math.max(w, h);
          w *= ratio;
          h *= ratio;
        }

        ctx.drawImage(this.image, -w / 2, -h / 2, w, h);
      }
    }]);

    return Img;
  }(Layer);

  function proxyProps$3(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue, target) {
      if (!validator$5(key, newValue, oldValue)) return;

      if (key === 'src') {
        that.image.src = target['src'];
      }

      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }

  /**
   * @ignore
   */

  var validator$6 = createValidator({
    value: function value(_value) {
      if (!isString(_value)) {
        throw new Error('value must be a string');
      }

      return true;
    },
    align: function align(value) {
      if (!isCanvasTextAlign(value)) {
        throw new Error('align must be a CanvasTextAlign');
      }

      return true;
    },
    size: function size(value) {
      if (!isNumber(value)) {
        throw new Error('size must be a number');
      }

      return true;
    },
    font: function font(value) {
      if (!isString(value)) {
        throw new Error('font must be a string');
      }

      return true;
    },
    bold: function bold(value) {
      if (!isBoolean(value)) {
        throw new Error('bold must be a boolean');
      }

      return true;
    },
    italic: function italic(value) {
      if (!isBoolean(value)) {
        throw new Error('italic must be a boolean');
      }

      return true;
    }
  });
  /**
   * 绘制文本
   */

  var Text = /*#__PURE__*/function (_Layer) {
    _inherits(Text, _Layer);

    function Text() {
      var _this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Text);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, Object.assign({
        fill: '#ffffff'
      }, state)));
      var theProps = proxyProps$4(_assertThisInitialized(_this), {
        value: '',
        align: 'center',
        size: 2.5,
        font: '',
        bold: false,
        italic: false
      });
      defineImmutable(_assertThisInitialized(_this), 'props', theProps);
      merge(_this.props, props);
      return _this;
    }
    /**
     * 设置文本内容
     */


    _createClass(Text, [{
      key: "value",
      value: function value(_value2) {
        this.props.value = _value2;
        return this;
      }
      /**
       * 设置字体大小
       */

    }, {
      key: "size",
      value: function size(value) {
        this.props.size = value;
        return this;
      }
      /**
       * 设置左右对齐方式
       */

    }, {
      key: "align",
      value: function align(value) {
        this.props.align = value;
        return this;
      }
      /**
       * 设置字体
       *
       * 没有特殊需求不建议随便更改字体
       */

    }, {
      key: "font",
      value: function font(value) {
        this.props.font = value;
        return this;
      }
      /**
       * 设置加粗
       */

    }, {
      key: "bold",
      value: function bold(value) {
        this.props.bold = value;
        return this;
      }
      /**
       * 设置斜体
       */

    }, {
      key: "italic",
      value: function italic(value) {
        this.props.italic = value;
        return this;
      }
    }, {
      key: "_clone",
      value: function _clone() {
        return new Text(deepClone(this.state), deepClone(this.props));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {
        var _this$props = this.props,
            value = _this$props.value,
            font = _this$props.font,
            size = _this$props.size,
            align = _this$props.align,
            bold = _this$props.bold,
            italic = _this$props.italic;
        var mapping = utils.mapping;
        var fontStyle = italic ? 'italic' : 'normal';
        var fontWeight = bold ? 700 : 400;
        var fontSize = "".concat(mapping(size), "px");
        var fontFamily = ['Microsoft YaHei', 'PingFang SC', 'sans-serif'];
        if (font) fontFamily.unshift(font);
        ctx.font = [fontStyle, fontWeight, fontSize, fontFamily.join(',')].join(' ');
        ctx.textBaseline = 'middle';
        ctx.textAlign = align;
        ctx.shadowColor = '#000000';
        ctx.fillText(value, 0, 0);
      }
    }]);

    return Text;
  }(Layer);

  function proxyProps$4(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue) {
      if (!validator$6(key, newValue, oldValue)) return;
      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }

  const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAHlBMVEWOZBCPZRCUZgtHcEyqeRmaaQrYvYnDnE7///7y59JRnYlMAAAACHRSTlMXS3wA06346/WJDqsAAAGFSURBVCjPVZPBbsIwDIad5gVCR7VrmYq4huUJqMY0jqAVXmAb3RVpWh4AteHeA7ztbMdt2X+o2i+J/cd2wbFAJF/xORHBCG36/sJaz/QIi5uoHKHaB9GnGWDqmy9W3c56aIu6q3a7al5tGj5PUB3CD2ZWkwm+GIHJptlyApvVXR4hvp5z8o/B33iZYEFJIUWPaKOMUO0vpbbpHldscSVTgNfxeEYdrm2OkTyZAlrtcowbEGJOPIUQ45we7GOgnW654PhkaKVtdvQE7ZRMIazbLWabR5j5hiHlcTYRWLc5x6TYTiB7Agfs3T0zjO6hv2XcGe8JfT2Ub01fEeDKnYxbzne4suDaUekKWrbKaDokBSFvQz25H7HIl9LQKKhYJCly+HhivYa+R2g4tHEYJA5I1+MsBG4R+3wLg04yDBQSdTn+orYyNtg3UrOmTEamzk6vBLsZGAO6H8XMD9H0MLTJhk6vBAjEZoVwzt0/aLPv2y0O5ghdUvVzfQfpN7jfGCdZg71n7g+VL8U1zaTYeQAAAABJRU5ErkJggg==";

  const img$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAALVBMVEVHcEyrexuRZhGXaAmRZxCNZBCRZQ6dbQyPZRHexpXOrm7BlkP////48eTv4ccVzg7KAAAADHRSTlMA1xCVVSZyuj358+2KEWrkAAAB00lEQVQoz12TwUvCUBzHxwOh6zCUDopIhtdYrpGnJLGjaA6vQzTrJoWzS4etsmuXRJIugVDtEh4iXIeOzjehY7AOniIa/g299/be0j63fed7ft7398ZxhDiFmyOxQyn8ZeBC5QlqPeaHAWVGCeX9cPUEUjoZP9TN0QOhN5b81fvu9EhAqNFJk61PbsHB7iXiLA3vNBrKkdEx+VeQ671XqVDOeE+BRKlUiBcjlveaC6w7nexeRRDE7N6JHcxTITtUVu673ZvgpeJ4UkA3LUl+xZaWpBueFFDcr2rb+eh2b+GyfDohh8JCWhs+q40h7Jep1BoWktWjTf4F9uNUqmiMW1yy0rh34UgCbdNKYXUTuSXTLrS/BxnkPK5So3zRsG94XtQC1Im4bzs/wyc+XGf2+JTSoVfntc7OifpoHtBwnzWCRSsNPKKw6HeHO66f4VnuXvy1rL9aLa/PtuHPoxi1Qxq+CklWEnkPr8QaorJisxkjYTj2LoPJiidTtz8JzrTKtoxAn4HG5tbDj/bjELFBVwOF/MYKCqJQy7Irl3NxOK2XEOzSAd2Y341dkCjKRsexhXApjcK31EKGNr2dze4yiyEnb6rqRv5fmEC9nXP/AYvfCvcLJf36VYhSOnkAAAAASUVORK5CYII=";

  const img$2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAALVBMVEVHcEyPZRGQZhGoeBiSZg+RZhCWZwqaaQjQsnbDm03hyJm2gx////737+Du4cg0DQ87AAAADHRSTlMALxLOaU2RsfLs+uaD4xhBAAAB1klEQVQoz12SP0/CUBTFSxN3bUpn2lC/AEUTjSa1CKytIDMRIcZREXU2AQ2rGJTNwaRBFhMTgzrz59bFzdSJUcNn8L7X96r423r63r3nnXsFgaIxhD+o+VSOkJd+NVE5SFCWi7FQjFhThjEfivopMO6c39udUYPSHRZD0fr+qlWQ2uubwYvO7cGVvYBET6DF78tro0N6QMx03012u9AcF0UVT2rK86Aa3I/s+3VHTpfLZTN67D0GpuKnnhHduXBdt2Vb/t0GFZXOoKo0icvRbqEZmIpY3xNzCz5ctwdJeT0wpR9DS8rCQ6L/BJfqHtSJqfjayNCUWqXdvvaSotV9J0WV5rgq6JsZrDmsCoXnASm6iH00ObXdcO/B0FgnHR1J2cbRQaLvn6noyWHe7Szc9LHRGXdPX7kVxJlUXtg7SR65a6LdboaJ6BiYncYpLZeiGKLDM56Yah6R+IPY42MsxHAeyqv3KJFVUHd8Pjn8D7elFJJe4XFiTD4MH8gurPI6NCbwPin+xOQlXyCkJfGSXfLpnbeR3RhfBXpmsISTK9nhfvhEnJg4Yylcuu3O32qM+DoZpBGbEXFYAOPijIbte9Np3ZkVBbmCqc3/E0lskvAfUdNm2vwAzZbxsp/TOSgAAAAASUVORK5CYII=";

  const img$3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAKlBMVEVHcEyRZhGRZg+mdRWMZBCPZRCYaAmTZgvu4MTFn1XZvYi4hib///727t5WytM1AAAADHRSTlMAEGDMJD2qhv7t+OUnXKjgAAABz0lEQVQoz2VTPWvCUBRNwO5GzA/we1ewYhFssGRVSeNeUaijHxXpKNiA6eLQ0mqXCqWGbB0UtLvGl8mlLel/6X0vL6/aHjIk5+Xee+6593EcgUDB7SFYDhPETn85vlJNEaQ7fkb6Wtqt9gGPdpxnZKCBKF5CjKysLGNmPM4Mc9th0RF9mK4Dqot10osXL9FdTAGU4aVESTm3TpKqfETftamguLnFr3xBgOQXrijftYOL8lI3KjXsuZs0kLWxPLFljAotZxpy25lsan4uGH9Cg5I62XSooH4UjrIIDYpSxhUFgu6LvNRzhvqgeNRzRUk5K+kX46a11PtFPmLuolilua1xcsYeL/Vhm1dXFpYn4zoqsgzD+RoJUKlNLAJFqmvSM2giRhHt8gPA+ax56kmXwXAi0QJprE/iR1AQKvqNwhwRqWHSVfOs53nntgRjPle8hgAqaR6nVydsHvLCnpfwKoiuifQcTZt4FxJZz06YuoM2b3gXTiZWjW6DCFO3vwkcUhFHy++IwRsmdIQ/bdzomI4N5kr+sdJdgOKtXMTBZL9TALClA0V72SikDHB0RxhgWAht2wcclH/VtD/RsC/1VLqZPyTxNYgp3D/4D+4K9wPL1eFu0l9CoAAAAABJRU5ErkJggg==";

  const img$4 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAKlBMVEVHcEyNZBCPZRGqeRiXaAqRZhCRZg6/kzydawnfxpTPrm7////v4cf48eP7xw1zAAAAC3RSTlMAFzXSlVVx6rj69Hf58PQAAAG4SURBVCjPXZM9T8JAGMd7JO60CcxASsNeRExwqQWNG2/ateUtcZUEFVlUEnDVRAhuGnzpB2jg7MTgAJuDQ+N38e56dwX/W5977n+/56WCQCT6CgtrkqpU8SAGlIFKNLCC3FBtRZWJ8WBkCKlGRR6Uu7MPoomjccvacnGrIw1ynxlmunUE26UEUvIAvjBTZW/WJwnAmHyb9LZh/2gizpTk3tw/FkL73qhUx56F6tBNxyiQm1Hex1iNmkeh5O5cqywJplaxfSgMZBoeybSiFEpCQLEyfO10OlkzhKBwU6IY6AQ+ocofNQYl2841aBFLdzucQg/gzO68L7ZWZ6p6CaeiYTsmJRJb43Nd34EPImXC7MVT+KyqF3CapPSkyrLne/I68fPKFQ5+WbwjGDRRv1HVbCHoHS7JIvOMK0GXuRGy5/OQc246jndB4k0SQMqG94VG87hR33XZjEHNg46/DF3WeCFyhwh/ibyFySx7kKvNbhsTUg1uaCcfZpYkZ57WC3qTbQ0wSN0LK56Q+IIC2V53o4rmUGzW39hiAQ0LwmDdmCka2ltxMyhED28G+fC/oJjc+AOYAQAb338BeeNEW6VjiQAAAABJRU5ErkJggg==";

  const img$5 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAALVBMVEVHcEyPZRGPZRGqehmSZw6YaQqRZhCbagjClT/Qr27fx5br27v////58+fy5c6/OXRmAAAADHRSTlMAEy/TapJOs+z0+/6DOZ+SAAAB1ElEQVQoz11TPU/CUBRt/QW0IcyUtPwBwEQJJBYJzCiII1XgB4AUmSUywCQGNWzGqEhYjIlJDYsLH68uLMTUicEYib/B+177yscZT+8979xzbxmGgDPhYJbA544JcsKCY0XVR6DKi9qNSP+P4NfvtklXBVm4z9jdUn10TdAdJGwy8jZTkwA1PPZTUdchOlc8AG8ZXdJ+MTwqkgI21p3JVne+PU1wPFRyUmNYMvs39ox7RQTJfdlb0QNuy5Du96ZvOp3HqhIxLFPZ+rAkdbHLUSrfNk2BoWf5CH12Oj20KQZNU65TVBXi6KpWq/WbfBq1cL8zNCpycdTTNO2hxMW6kx0gpfa0xMbJ5PqZI98YYlER3oHKV59vy7gT4CWZOPrwg+ZFMlmef3sic+IJe8/E0QOufKHuYcpJIm8Q0WY2ZM2J8xCDmP1J2Ylgo0q0ACs6yVk2zYxlPgfwiIuU7cBYOjomw3pAwLfA79GQ8Hd0u78LiG7TOGHrczQwj6FOg8evI/2LwKArYqQQslEVqCRJXceB1lIOegqkZhjAq1Ps+5hjciZ7eEFw2JfUXlaz4AwCNy6uXDEDy0LoPbHCwfNPmtbKrJKMeFBQU+41EscmMOtg136Wf/he8RqTg2AgAAAAAElFTkSuQmCC";

  const img$6 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAKlBMVEVHcEyPZRGPZRGYaQugbw2QZRCSZg3BmkyvfyDRsnXgx5f////48ePv4siecEtEAAAAC3RSTlMAFjSZwVZ069r1+vGWKKsAAAGuSURBVCjPXZOxa8JAFMYvge5JQGeTEP+ARGuldDJKKzjEWvdE27oLLTSdpYNOFkpxFQqVzmm8OFewo4Mg/i99d7k7td9i8uXdu99990SISk2loANpN0z63pPy7iWR6wb7Wrm7Y6rlhJmpY6apJ0wznL9TzSJbtOxuNxUHVBgtarzpSQn3mwbIggfeND+cV2mB1Jotfba6NVnaKqnUzWGcfkZyb/XabJOet9ZVMsgxoGRglT9BH83eikGZYWxnQkIZB+YkhQKgtZ8hlavIzzZSKK0MHFLbOXtK+jm5hMcklCwFUo3u7MdWOBRrI8MCPd2AVIaUDX5shTBHPiPKwdt27VFmykTYPSTd4wfAzjB6ekokXyyqZAN+Trq9fD4PDhPRSGBypwZ7yyI7eiRkGAShIVI2n+Nimuf1RNyHOUoGOpkFTYSEJHOCp6dtUKfO40RSb4ujF6qQ9SHAGCe/VKu1L+4NC/HLBGDymrw9gvhqqUdr4orTce741EA+xNwEuqHpfD4kMzzsxpRtgMdmZD+dJTC/7SMPmn7tdmPv2ETZgusWlX+mah39A5gU5bjuDwBWyabQ99azAAAAAElFTkSuQmCC";

  const img$7 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEVHcEyPZRGndhWTZw+OZRCaaQiUZguRZhHAmk7Ut366hiHNplriypz////w48n48eT5AdqsAAAADXRSTlMAEstiLauFRuj15vP8Uq4MiAAAAd9JREFUKM9dk8FLAlEQxt+C0FVxobuiUoSRmkUnF229F2GSJ7XWupWu+wdIEYh0KvBQh4IOQXUKgloCoVPYOcvXgsdoN+hWsdWbt/vW7Dt+zHzvN7OzCFF5bKE/4stRqimh73HVOR9VQHI7pitv2AomHNObw7ZuJ5xusdFtUrUfio4Z0V8CC0RzZ89+Fjq8hDdjKaLkIr5Yt01xvGsVcJH2u93PyfufRT6tKBVBPO9krH7Xmrkbi0NmIZnVji0o75gWLI8AZUvKmy0Lqtp4ysg6UGp+WbWgXBG9F5vGd1f1a1xLhi0oArQlTOMTn+8E1/iSBeUFoA397rJ+rYUACkLF/ccMklXI7ISQfNqBUJG845kxX5vNe3zksV/y5rSgsKpBpr6Xypt0UcBesUxzL23Tw5RSBH8bxhuuVdmcYrjrr97AQx+Ss5EhAqosbxMFlRLbHQcjpaPxeLTCBoLQnaeMG746x0aH0DPtWACTt4FopYpbBbiF+BhbJ+LyOv46hFsYVdni0XCWbPKHyuzFWOQ5drS5ziLbdOtXQDrvZqdAazqBFaJK/z7A7EnkGgR2H9ys+jeN3VyYeF2/e8AcKhHzsTjgIW7ywDAuBrsRSi74AoXEP5NXppT/hSRg8F9Bv2FTB+jtDCfCAAAAAElFTkSuQmCC";

  const img$8 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAALVBMVEVHcExnN3xyQIllM3xnNXxnN3toN32JXJ24m8bNuNiferFwOor//v/h0ujx6fU0tqNZAAAADHRSTlMAGsqiez5d5/r99PM1JnKbAAAB80lEQVQoz2WTMW/TQBiG7SG7T2ryAxyrDqAuJk5C2GLHlWCpZdd7gtMfEEcCotKBJRSSpR0KqpWBDgm0XShSSyxm4uh8Awx4cDqwVJVMfwPnUPscuOn06P3ue79X91HU4gBA/XvorKmozOIGmBhmJb5dVCNmKGos1AohOigxuKLWrsfCcuBdoqMGrnjurd7Wr6x5bb7/TWRWCmEMac3eK5oFZKmaDRPYvLHUbM3+XtcHuwlcd/FNX3M5Q7hYhply+LKlFwj0OGxH25mVshXyZoDtULkqsjYTSGnbVyKWNvu/FAJzFWRtUJR+Z1qsoBjSkR2wafKIq30U40AiO1sS6wQdU24kKWE7wof5YdABJDpa2z48hbB3wzEMSTlXnkB/9MX9nGJU5vHJ1Dm3r842UjBXhW9eDdFoPwXxiNMJhAc7P1Jw0b07coKjFPzr8+FXd5U0opv2Xh0YAp4r1fuRZylbJk5ATcEHs0/3WfbiZ6o6gueD+dtjh2sRaabiTi5DiPxRvpRQuhb449fjIYT++1LygvYCQnTMdocw+ifxlPz4XS8vS0LXnoqxNFP1e84ZdiXdDTsxpJ/04XWPLcrSvSCBOM8BjDD7DBGvQBe6gxD+nsOZSPwDQxb43RBeW42lbx/hp3mFWd4GYJhy6/8tAbeb8wcXjMMM2qal5wAAAABJRU5ErkJggg==";

  const img$9 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAM1BMVEVHcExmM3zHr9Kvj75nOHxnN3tmM3xoOH1nNn1xP4eZcavbyuKGWpp7RpVqNoL//v/v5vPIQ2rZAAAAD3RSTlMAkvz4UDKsGXPM9P7f/eh9wHwLAAACF0lEQVQ4y4VV2baDMAhsyGICWfj/r71DYq0e9Vz60AcGyAyLn8/JNtjnX9u2EHLOIW6nsIfQLeZUai3JhW2FIcrhdwqduOCK1zGUagJyDzP7hh64KmOI6FAGMuZCCDNTqSckHDqkllJpDOQMCf+qKmpVaj6A5qCCB+EBcDiLo9Z7b411eBe/leFQqzBrDikpMfdSCpAA0glY4Z0FgBQkTwmgyp7kUjpmhnPpEl1FMSTjRQc6/MhYRi057gKwSmvGhjxz6ynHnzqo59MK3EJiYoFOzaz3cpbH8RJwp8Zs+b7G7pQyTVni/szux8kkHcDPLkuOUCgE15v/GdffIw9ZcshuSsO+o8vL8qnZhyypMIlQI2txXHYdNZuLIR10YdRUS36ZYhCqDSTEs6lI/fyyiy2y3sSjoa27+JqRDeeJbCobpfBaGWw6T+VaU3kGGhe1sSkVwgE3+Ln0oaMJ2Zt8x+6esJjPzc64TrOfz4wxFS0hIVKmiQuPMkY4fU/oHl7ZSTi9qGhAxlCLyhTchvC6+UdpD014rqftMrFtfr6X3+Zie8ZQsZeJBrjcH2DDI+syYL6g5dws9emmERrTsJ1Yp3kHnAmPyO8iXQUSwLBMKZvspjuWvz6l9JOHBw3wsPOCBvG9P7h0s9oEg/S8WI/ji9uJl+2koacF8eMIbTHaSPzA66q+XPIFnvf2emzfwHb4H5t4Q18/CH/sLSDcAbH54AAAAABJRU5ErkJggg==";

  const img$a = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEVHcExoOH1vPYZmNH1oOH3BqM1nOHxlM3x0P42VbKhnNn7ZyOGFWZmtjbz+/f/t5PLt/KUKAAAADnRSTlMAHM+uWPs5j/jzdv7e+PRUbDMAAAIySURBVCjPXZNBaNpQGMeTS88JSA476qDOKYWYzhU2mFoUctwQBGdUEIUe66ibdJeWskjZpaVgtnVlThomO1mEFWkCLSPY1Q0cY5VSbx5EfO9UGHTEvSQ2xn2XhF/++b//9733MEwvksT+L5xiKyECPckURRJjSH10H/v8GJ4W8/lCxaB42KPCpwxB5ZqCIJx8MISr6kAG2/7sN4BqyOjSW3ODLTfXZ4ISbDRkcKrDIFcriB6orIJzni+qvzWIl0dKiipzNe+ZE0FDiX8a3Cawpbs9R345MVJ7LgP2EESrtX05BAeG8jNEH/HwXnTNrnsmNRiQfvoxzLZwCUs8z0tPNIhl3/dRNjwggKt4JAZ0JWZ7CBX0kr3T1cL3jPA4irNPZlincBmPx7f3jYGgOK7FHO2MrHm9vkoSu2m+Te/IUVkJZTLmZMPfv7wFIApdhGXKtoXX4EjY6E3BmefdIc9zf14lp5Tg/FcClg4eWfYo+GNYBOBw78CiRKs/plsCb7Q9rqU5lFOkN7URmn8HpNoKmV7m/q5YLF/A9coiOw+VlCXQ/HDda6c3DhnCCvvF2Khe4mdDE+nMy0FRVgGov3MUTIqX1aPdzq6M8NbEQTsasG1vJQDUNmbc5f2dSGe2mqdb0pCZmNY7vAOlynnUU8LsvQuuOw5fVXRKb0xT24MLgPCx/atlziRLN2MquG6A/r1JfjIt0s0LFVyd+KeOfVr0us8cz4jp20Cm2aqlT9NkfDX+AW5X/fAItAtaAAAAAElFTkSuQmCC";

  const img$b = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAKlBMVEVHcExnN3twPodnNnxnN3tnNH1mNHzSvtuKXp63msWeebB2QJD+/P7o3e5kbc0rAAAADHRSTlMAG85kQKuG/uX79vmY1MirAAACBklEQVQoz2WTzW7aQBSFscQD2MLqA4DsQqIuwA7qMhbBD2BI2qQ7DAilO6Qq0AybRCUJCRuklBToJlJaftplmhY/gAu6s+mGog7v0vFP8bS9K+vznXvOPfaEQm4JQujf4kRF0XjvUeB9KG7FT/Y0l2UU1W/UEwTXck6LWDjPea1ihWAEd0nnyBm83Xbhoyf2SXzwPc9z+gbAtQezg2ouncBNLWKgJfEgl4KmJhZQ1Sy17cs/sGLH+JD+2JYS0LdIJxnAcGU1QbPxmNTyjjz3FMt8iMu2e+DWqQtTxLETOegd0YJFzDWqX1E79N3oMmpskk7RtRTZx00qqSdey5kCuda8NVOoWhR20nEcE7Jj2U+E2pEzJXr0lI+UVR+GK6RjfFwdU8itk+WyV8efAfo4xjMpR55PYTl8sGUWhl9+mlkW+vVlm+08gP67Bp68YiCdOZsC1NosFB311tAiHxhIo5czZePBZtT9jQroR5EZeYjvFVWhCWiMof35/W7U+PYzx9gMP5t/7a7qE0tWNabTniIaeX0omVogRJaj3qgBsLwNJuhnAPg22moAvkuut3wxOupJZslooVl+PfSwfmNJpqKUNrxv6Q7dGsDiRtozy5uoyQd5vgeKo9ELCDYVdKPVpWINmOcD/0ImbcS7BBZvkuxvT/Fu/Fwq8n/fBmFHMdX/b4ngX43fvqDMPJBdlYcAAAAASUVORK5CYII=";

  const img$c = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEVsO4JnOHxwPodnN3tnN31nNX1mNH2JXZ2zlMJ0PY7Dqc+cdq/Vw97//v/k1urx6fU6pir6AAAADXRSTlMBHc5AZIer5vn4/ff+qN4q7wAAAiBJREFUKM9lk89r02AcxhPyDyS0/gNhTVaUsZCl97Zpva9pp+yWtJ1snobZxDoHA7W104OgM5snL6vFTBhoWosedphzUHu0rHkb8OIQ0qs4TOubZDWv7DmFz/v98bwPeTHME0VhFxQSRY50j1yR5yzNLhc4jBCzUBLnMVyYdKzdPBleWHWleKXEnN3vWO/jMR24mvDgpSlzmdW/Ken2cADlw7R+kE9NWuqsXdGgFG9kYqRyoVn9u+zU6vVa04dzJuwQrpywjjvS9Npd6G4bGeCo3NgE96ddeLUfITE8dq/S0mhasw9diCXsB3EMCy9Vh02a3nJ8KKz9gobxRAuclct7fjsWvmGp8ENg9WARrNEPMlQoFW2VofYzfiDQTmQmJ0drT4vFwnkg0I6zIX8YvO6oPM+Pk8Vja18+AbA7miCRkMMLL8CpsX0SQSFx/WNX0/Tfz6bRyiVQefTWMg4RiMfWuzsAfF5HIdz+Si4Zmv0OgcIU9JmVX5rIdjzRhjfiYcwZZOR8f0VMiouWyiEjF3vPi7S8/SOP2CRu9rbeDI6aWiQZlBLXzJ2OA6xjg5G4YJF92qg2OgD83A8mCHcBsDbo23sA/idBHo16lZFycqndVf4NnT+uaowkirnLzq1xP55+DP48ZApSNtpWyaD/CYCYpu9YwU0pQS5tOmD4FfSUwD81k5JZiM9W4kjMOMRFdpXJkP+/BooXpeTFVzJ+GX8B2wzrpg0LN5cAAAAASUVORK5CYII=";

  const img$d = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEVHcExwPYdoN31nNH1pOX5mM32KXp5nOHxnOHy1l8OfebHZyOF0PY7FrNH+/f/s4vHhuw72AAAADnRSTlMAz2OGE6roPyT5+P74/K4VVxAAAAI1SURBVCjPZZNPaNpQHMdzCOg1ikLXjmKcq9dGNFB2KBLQayJWLOzQigXtaItR9Cg20Fx7KaRdO0qp4NYOPLRQNpUx5sHF43rpFm8FG3yPHUfXuGckJu1+lxc+7/f3m9/DMN0YZhF7YvgOSZUQZURRFIzbiM+9Eith9lwgEKD8Y2rnpzR4zZUr7BqyWH7sGNLUFkj7fe8Asktah9uz6opbueVCAA6HGuRG8XhBqXPeKZhOgjNZ7oBVHXpgKh+ZV+rP4XtkVccI2kMqOvnpfneUEgwcZR0OEIyE7rugIUk34GQE8ZfQWUaZ18/hG4Joaz+29JzN0xcYFl62QozfuE0sYnZPBjxIUm8cjoWTqDy6azdHhVS9OvJR6jSz453JSsiO6fHw/PTASQZZWfoSj8eoPGYMv8uet362UsViUTD0LGx8/gDANXQIuKlyeKkDrqrdgbNskd726mNflpW/X7cssLIM3h72YPUib/lHhc1+B8m7eWHx1Ktnq7J2YkJ8exb1GWC/qw6zEFKkTouVeeU3bUbbF2CaJMmxApOGXt99ixNs95ITHsH2zfDqTHbOiZPtsSXVTksDoFF1UaVJTo/2p7ZfayF8zBn1cX4dALhLZHoAnvpNPWq/9l1UkM02+wkjq22hsSe7KJIMPtNWDYj7jsD9nitGBWaaqclQlaUDgDBBZKBj0lSUZ7MHGlA/gbuEuefRnJd1I/yQ9lvXXsx54+41F11+/BqiRZKaE/57JIzA6B//APM4BHqJw7vBAAAAAElFTkSuQmCC";

  const img$e = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEVHcExoOHxyQIlnN3uKX59nNX5nN31nNn1mNHyferHKtNR0P461l8T//v/dzeTv5vNf0WHBAAAADXRSTlMAG9A/57FeeZL1/Pj6OgScqgAAAhhJREFUKM9lU89v0lAcb8M/0IYE76QIugVpjNDzskVIZEuqbKIeRFLY2SHlbDeWRU8GEn8wD0YvauUiiVjjYakHNdtpFwjfvoRsB2GsidHLlm6+ttgW/Rw/+bzv9/P5vPcIwgJNE/+C9BfLLEWQtIUx6b/HzCyxhF8U1ytinrKF3LSBXi7SHDOLEYnZwtWRpqN6TgATv29b5JkL2gyzvVsVdAzYt5TkJfnF+vI0ShYzQWVeS9rkndMk678r96uFZcboS9YisqSdpYhEtBtmuagWYe3lpS4mfavGl7wg/5LGjkoojJ1z6c5SFursOI8wqucIIpCFuag5yAaX3sWHSGF7uNmR/kYP3EKmj8T5ofwz5/SB7azQF4vMjye2SQumncIaPzVoSZRDYjtb/NPDN3qS9fTJpYfPAdTTMOVpOXCtDQe1j90J0vdgs6co8vGHmFeZhe/fmqj2KuadudBrA+wt7HtIP96eSdWU0WMPafms8J/d5GYjZqL4fbkveUZuoFa5kMANeLz7bnRamSD/aW+RmiDfv9PfPlMieVfqe6i1dQPQoBaqsm51xkHja6MJMHjkTuDmAdBWMNUEVHdaDtxsvFYjYoVPyb2rztCNgaqEyoXi2jnDKQrfGRypoetiZWp0mXL73AE4UYPBK8hNSif41I4BJ4fQ8SSl4xWewfTRXM777DGdYWZDK9Tkb6DjRTH//y+haVv3B9F23+UgO49HAAAAAElFTkSuQmCC";

  const img$f = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEVHcExoOH1xPohnN3xmNH1nNH1oN35oOH21l8ObdK11P4+IW5zayOLJsdT+/f/t4/IgsVoeAAAADnRSTlMAGM8yjaxwUfrz+eb+/P3ruU8AAAI5SURBVCjPXZPPa9NgGMffsH8gIYfci43bKqylob1v3ebsLbTWMXaw1uzgxWz9cR8K7X70IFb6QyuIwprpZbSyolgQhPpjLQi7qG2vLUveFzxK99Y3SZtGn0vg8z7v83y/3yQAGMUw4P+iuKS0Q5Mn42U9k2P2ruskJAPKFwsEAltuszE+i9HPCM0t1guFQu2OAbkgVtswJwvPISktQuvQt6CeuLIXkSgedjo9+Ni4n+h+X4nNomoQFhVFwQ90SEVHVZmNdj+KeE9RKtjopO6pPA2Ea5qjjEYjrPH6TGpNu0oDNjgqdnWIqmYn4t2ASjQy+sxjfG7A7dZDmQhbTyOyR+kaEAjlC6KNihZgM50+hMZ2wN1CVQ+gBFdWF68ai8AMkbPE+OPzhTSpnGlTl8Mnl8X59ItwOLTqGacUxLvis/aPdnXH6/VM8ox/+PIUwn3E0zRtpcxtHMFm6Y3Gu23Rz9wo94nCPy/tkFuHe4c9VDq/b3tHiUa/AuHXxicb5PTt9ZJipjYuYUHjUzHx9diMeXu7pTta7P5esu1eQ7WtVJIkINvg5uBV2CEefb5pG8luDo5/jZpF5UrKM+28rlbaGMKzknPFGkBFcTOfybcJfmRNoIT3EKJdx2kPotztaR75TsYpBcR6qx+hLU1nGcUppaTlOfyWtrxn4XDfGZJi860nFvRtHEA4zDgcp2jqlEqK9QMM1W9wEJnaZ/0xcY7gy5ps/+wJDrveOVfpf/8G1i9JNp+TYhiz7y/9LwNIhcYdEwAAAABJRU5ErkJggg==";

  const img$g = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAJ1BMVEWYIkCUHDuOHzyPIDyjIUO1NlbXe5CcGjyPHzzknqzFYnr/7uz2zdKnj6NuAAAAC3RSTlMBgiU+yef5qFv98X45SC8AAAFsSURBVCjPtZI9T8JQFIZvLgsrX4FRYOlIYWAmEWFgISkQYlcZhIUQPmQSbcIfsDGxzpCgqzeB01FM8PqjPO3tLaVMDp6hw5un7zn3vIeQvxRVHi/ORCVdewhr+bT+HSe5XC6Iq1ecjfKLWCxTPDoaHNgwXd1stOHRxfgZsMsuB7DNis+qVZ21wS1zJn3zS529w+G29wr22jfIovilTafVAex8FMVVJ1MsLVsc1gVPLOtMSyChovM+LmfSWRMBmuwD39Y9MbUy6+4jYKtDU5hGJi9aXIBmG56FqdI4OH87YG3MP+9F82vHyAGfEob1ITpl39gIvwhWiuX+LiAKkATE3UiABXJCemBAxEaqAInfKNqwOx5IU3KkyB3ctAUYmcjhaQr2AiSq/0xqWLYHJi25ENwnBoHzU2wnV0eic7Bbs1JpMbaOS6bLPpzFQZQ5h0NvdRIcot1wxE7KyfAxuMcYPhtXDR2YlPEWyT/WL+IhqkrCjf16AAAAAElFTkSuQmCC";

  const img$h = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAM1BMVEVHcEyQHzyTHDuwKk3jnaukIUOOHzyRID2NHzzUd43AVnCbGzyVGjr/6+v/9PL619ryxcyvCIpBAAAADXRSTlMAYILt/cxAEin57LKc0COQSgAAAbZJREFUOMvNVElywzAMiyhqo9b/v7agl0Ry7XZ6K3LwxIYEcH29/oZw4Dda9GaHjz9xo6HsNuRC/pkZTBYeXTHYFROBWxORpLamPH3YXEohujERfBmti8VP0miMB+AymSvVF0kCgxbgNoRrqzAh+eo3muIseJJ41JbSqLDQWmULv6s2OZtYHdaRJCnwr8JPXpgRUXdwmJNAHTkqGSdxcU3ZhDmYVCsrR+E0YG+KtcqU8vEZjOutpwOyfYIbi9O1dktv8UDSJvQMYjROeYiNP+IoDE9IuHHnIaVQl/eVkEF6kGaNA8VGCU8e5HGln3qHHA9NmwdipJ3nSrG9DTcFjmr3ynijePPIG8dIJoW1LdKuceqCF3xObTKJj0VaRRRqY+K9NMNNyh1x4d0QD+n1PhCv0sh5x1fjV174FgzeoHdtoYWH89f0QINhUhM886C8JPwwWceFF2kt4VlvdOSFB4dzUxxX2q5thTrucWhZ09pmZ/fK1n5a8Og9VoLlS+O+52HrwPQ8Cuvk1M6Pw/WZWqhtg/owrtPYbktIx/Z2AUzbT9eaPK6Uy6Ikwo6iXzbltnof196/xxcUdh0omxWIAwAAAABJRU5ErkJggg==";

  const img$i = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAM1BMVEVHcEzlo7CYGjuvLk+PHzyUGzqeH0CNHzyQHjuSID7ZgZXLaYCuKEq+TWn/7+71yc/93uAVpD+VAAAADnRSTlMA/qXbP4fBJmYR+vT57LPv46IAAAGzSURBVDjLzZRJkoMwDEVjy/Igj/c/beubdGIHSFXvWrCCV9LX+Hj8zVIK80nfqeBijKxPjC6kL1y0ng7zNoZbMEQvfRzWxatTtSu/zkpro3e8rWVvmflKQ3J+NFMLrPYmpeZcq+LxA03O5kzlMAVzbwgg1bMLHxqZrc9GrbdeBCBYQ3tmmrTWBjphvWrkLGa6zX4lk2PvrYfCqmFN8dZqueAY5Ftnir73+tQorWt9nItMBU6rdWkBR+uSYerG4JdGIRlQQhzWrNvLxvyDHgBrzSzBtYNVzGFC7HRADs5o9FHfLkGSZlKKJhVXTiU3sW6tJKk3LZvTxr04spY6klsSZxq/at4cu+iNxl5qGbi+YixcmuOyiWTNOwNc/aXHrEe+BDfuCjxC7/6ek7rXp85k3M6lUzJoN7rFG4difJTniCFEOzclbgWHyIGZ3bgAh1sLn2oadmvxx/hmtshwqb1pmlE5BlBvAkPIIA6nDcNclYKGY3AtqT8UN52uwCSFsAm6CnMZ96V5k3Omjdws1zqVZiyz/rmu2zpW6ZO9PADrhuslqHcn5XQp+eZIndhwd/b+vf0AgIIezBZAmvAAAAAASUVORK5CYII=";

  const img$j = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEVHcEycHD2UGzuNHzyRID2uLE6QHzzVeI6OHzzno7DEW3Tejp//7+72zNL+4+S+NlkZJylKAAAADHRSTlMAs4crE9tg+EH+7fzV7CmHAAABqklEQVQoz62SPWjCQBzFD8zQNZZEsZOxkeJktYhjaEJxrSBSii2JRbo6iBSU1g+kawc3Heyo7dC1BDqWlDNbKC1RJ3GJ2boUik1yiZ90640/3v+9d3d/AP4+HLPJErnsBmUF3B1eY1jVN7jLRqPcMozRIlQoigrWFh4sn5FaSqrbTbnnzlzVo72IozKE02d33YZHROtzZkANQrlJhu2UR2lmwO9isQ37nSyCvCrruq4VcJwoaxPScsUq7cFgoE/zl3HhXJU7yDWCp8xxMoxV0zpUAqhRg766FpUA4+JLcCjZ84nQsNnL10HMA6Uf+R7lb+3ADh4Ms4awmYZPN6hopp+8PWBMYZJQlQsLHp4ZRowl3ONb410U//DqBZZjsl4pvQUcuA2QkNlfgUgIlpVeW7iAZlADCbF5kFnJj4QY7VQyyhfSlhAkPE55V0gb2cJIxrmmYTTVLCFLi/aDGPEZqJlCtnoKxwFnP3xa/4us3QpEy3lkc74kvx/jfqIMJ840wGI+FX4sf5yVz58YH7z0xcjV3xuuLAMy8K+uDaJxgaJytfUl5dZW8b/PLyrr0htdrBZsAAAAAElFTkSuQmCC";

  const img$k = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEVHcEyRHzzOaIChH0GsKkuTHDvkoK6NHzyTID6PID2ZGjzagZW+T2q4MFOWGjr/8e//5uf2zdKhgkJAAAAAD3RSTlMAXvfC3H39JhE+p/rr/I0UpVUqAAABuElEQVQ4y81U2RLjIAwr5jQ4HP//syvIBW2yM/u26ksnUSwfsj+ff0GY8DcaK6Xs+AH+nco2anNAR+tfAyrdLlQXle94iBusqaWecDoD1ir+4fostW4nIC9EIsjhO12fqTTaIdtGrRYItCTa8pIvR8KLMlDxRTv/O4N8F6LDwx21NKFElFwDtZGemRwlEXLrGaZSBS2K6FdC5EpRhYmYWjqISEKiYmaVzdaQkUQOq/SoJeGd6R0PnE1Cs0oz9wC8Na1cSEPMW5166bU4fYmPr49i3Eg/7LziurpMIdlqs4lsKCOjyzfPUJfgyT62x0Tb+twunokRSTU9FR6swA77k5tnWWm3aI9xHxo3L3NA50DMfhl3oU5ceGO6hR6JC++JuEuv8cbQvqStjNbyygs/xfRtwLRyXnj7zJb2DI1Cxiy8MFKcG35ot+3sXzi206wjvLJpdeJhXHg2m2KyEJZw2w0YfLdKWWz2OfOB/9pmhm9Z2WgQDxbnr631ShO839LYBKwCdYV1aW7m2Cj3tlw3E2r19vrPun5mA0vqpT8fgKkijxq0vJ2U5aB61Duu1MOR+uG+nb3/H38AOkEhK1js2KIAAAAASUVORK5CYII=";

  const img$l = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAAM1BMVEVHcEytKEqUHDvOaYGSHz3nprORID2OHzygHkCUIT+ZGjvag5a8T2r/6en/8vD3ztPCN1vFVmTaAAAADXRSTlMA3oL1Yf4+Jr0QnfrrnXN83AAAAbhJREFUOMvVlNtuwyAQRL2LWe7g///azoLtgJtE6mNHqhSlJ8zet+1PCpe+Y072S+K+sG6P3pPK+7h/JsPuTbtkPItTvYnCRVNrGao1+cgxMv8OIoi3tZmjC5+IsjE5e8/PKHaA9jgFxBY1aClrFGuIeKeoOf6sghoCYEtI7QGWZrtKbdkkY5JtQJHaRI4XDxRHnUvN5GOMnlLDyyDDI0ZwSpaK/4nIHulQMke5SYmwhp0K8WV2WgqmpPVqxLe549yDH7JqFtzulUOO9mUeJOZkT6Ez7uIQUKvD4ZoJ9nTkfPReS7g5IqOtkqk5iMhq2QSNe3ExUqttTjxwbuWM5sWx9BJP3iOfFGUM3c0h+vQAMUDFdFAmDpVDB0x8A86+YXsDntadqze3/bZWEMksvte8zCC+QR0o8sLh98/ybALHaogWDkk/Cn56t2PhNtEHF+d7etf3mGydh2K7wtGxQt9GHq4PWp3H7Boho3N19IZjcDEn8NDihue58J1MfROwCgZbU5almcime2o/LNd8gsiOWX+7rvNRY591+d4fgDkjhxx8/nRSlnuKU8mMG8XfL+Vgx9UL2//TD5oZHmtl6RRFAAAAAElFTkSuQmCC";

  const img$m = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAMFBMVEVHcEyQID2TGzqMHzuQHjy3O1qQID3jnauoJkjIZHybGzzXfpKgHD//7u3619rxxMuESqGJAAAADXRSTlMAE4QpYug//dXypvrA8oGlmQAAAZ1JREFUKM9jYMAOBMEAVUw4xQUI3AxQBE3WdADBKUcUQaN974DghZqxMcIIxqS9QLG7NxcpKakkC8C1r2gNjb5b0TpzZsQiZ5iosIvS0b23O+vu3n1feigR7iSTk3e37r8LAqVL4I5Iirse/vf5ztl1d+/NcYZZ5VH7df/vmFWrju6/e/MI1FS2lXdnfo9SSTPzav17dxbUVJHz98N3qBkCHdd99+5TZYigUOzt2U2GDAzMPnvv/r0O1W8UXrlDWYCB0eT03evxd4Mg9ou0zgaZBFJYGn23KgEi2P6/CSgNUti19O0PSMgIxYEMEgYqrFDzqX2qCDFz7u1lEIVNiVl7bypDBW8ugyoUyJoLFwSqhChkQBGEKmSAawdZlAJRyAi3SKT/XpQORCGjKsxJbMvv7ugGK2QQWwlzPLPq3a9QhUb9MG8CDboPUSisUQsLEAajOGBELAN6Chh2sKADmXQ/dElamtPSWnggA/XPvYseHcCQPPn2LlrEAe33Cr+LHsVAU3XC/6EmBrABWqjJBiJq5oSSwGCJBzkp0gAAAPkq4ByOpe8eAAAAAElFTkSuQmCC";

  const img$n = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAANlBMVEVHcEzmpLHLZX3agpaOHzyfGz2QID2SID6UHDuwMlKRHzyXGjusH0T/8e//6Oj0xs351Ni/QWCpPJvMAAAAEnRSTlMA/vL6Kbg/FH7bXZv6//////5N3y3UAAABtklEQVQ4y81U2ZLDIAwL5obYwP//7Apy0jQ7s2+rl3Y6qi0L2cvyJ/gTv9KMSykMpGR+oZqUbdxhg3tl+mSpVBmoKmZngG8aTCDmWjqqcIk55AwR7iHCZM2lrR1Ns6yRgC7iU6/JdBBXzbWpyixS9EOvCVFxUQNVqClhYUCgN5mZWHoNAB+6kSbSvSxXsnem6xqpDUBjizZna6MuqAzm2d07q1hvEtcmTDk551KOraAH5Utnr1g1DSiRGHz/d4i6a6kxmJvGLmiHHs1MsFAh8FVdzb3LUasdm/yNx6oVlltJ9LErJllXu7l88CJ8RQt3vTa6oyZsG+928nKGqBKvwRcPmbKr8ScvuARDtumuXMjR48aDc/hKl8jx3DDQzfU8nBu/fyNOvC/EvfVcD8TP1hhmWOtmnn8M4xMCVJHtiTfMmO0ZPVjHOPOcpdnw8d5YlzbzRlDvT3iqQa5mnuJ7KK4IIVd9Xbf3GUGbYnZEiPpet3Xk1qVge70puMe5sPByLN+2CtQXiT4aH8y+qFW9LdftBEUlV9Yf67rcA9yXT14OwI1p+gyvJ2WmYt63I/U4vm9n7//jB6H0Hg4iikw3AAAAAElFTkSuQmCC";

  const img$o = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAJ1BMVEVxs/9xs/9ys/9Op+uDw+pdr+hws/9frPjX7faj0+623fH+///t9/rBKSuLAAAAC3RSTlMBEyqf1sA+W/7q85nprSEAAAFhSURBVCjPldNNSsNAGAbgpifINzeYLNIDJGkV3KVSpMu0UsFVCsneSHICQRl3RbDUXS2IcakQO7O0IMRDOZmZpGlaBF+SzUOY3zet1v+ig4pWkQbIUMFYVwhGUMVQCkYYWWViHwSi0H65LfMQi081FBFahQ18geYRfR6rjPKPqwKhM3y3SrQmWRdzbIfp0lYDsJVNzwtEU+IOmZyGZBYZKByTlVzQBXVThfdj5o36Rax0tsXMkYPOhnW02Zwn3eziZy9JossmJkEQnjQxNlCwj1gz91E/hBgOoG/sT8RnT5q49vjWm+ukPzz0Zge9pwK/3UUNc9cRB+8Qhe0p8dK1OLn+I/MqdCflZX45ubgO6Cw21tlcxjtm4uL47jK3LIiz4FsTeE2zV5U3uhRl4LWZbBty15UNAzOS18Zz2vOxrCcywzBOxBMHZUG3neWthVqVASP+YgC93nredr2l/fFf/AJlRu4hyU3Q/QAAAABJRU5ErkJggg==";

  const img$p = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAJFBMVEVxs/9xs/9xs/9Pp+lwsv9vuejY7faz2++MyOpbq/VWq+z7/v744S4KAAAAC3RSTlMBEyiwQMv98uFjkijOFJ0AAAH4SURBVCjPfZPBbtpAEIbxG9hWX8Bo38Bd24FTHfdgrlZAhKOFgrJHC5pmj1bShL01RqVcCRDaI9pdS/Ny3bVNCz1kDrb1af4ZzczvVuu9sFSY/yG7rcKxzhmKdLRPqGFH8fp6c70/pTZaDQjvwt0+co51LRT3QUx9ApN9eEy1ox1Mks7aHcC4aFIN9EJKF3+7e3D7MGxSbeSJRGkBpi7jhVPDHs0CkE9PM1DvYWhW6qVwqdQ1H0XCbhvY5b5IBmNv6tLULyu9HdOM8QC4B5kvMXys4CW4JKeys3oU+uO5ggsZSNWgiF5oytKRLmqgH6XPPV6EKPZKj3sH3QlteffA7iPHQgvpq4Qqc3vwMvocmoaqjic7/l3D3+l6TYef9BTk+tdb2cAgocOwhkkDt4dRyrQcXYpA+rV8qzqObiPHRkvVyNONWh+WpfosXyMUj3iXd6vh7c8CCwzzn/GGZCxjXyvYI4maXsw3VE2ekGG9EJaNSqwPl/dlIF6danXbMoAMT/0ck8yrV2+gBSRM5O4aU+nS+2rJWj/GBG6+EJH7Sm3WZ99BjimAUM+0OZzR7jGZuFdXicvERWgeXbMg8qGzxjOYH82gUuM3om8EWfHPYcpMmxn3bvIi/GswZUUUr/ar/SnTtF151jk3uOUod5/bW4Vpmda7f8ofgE/aLFjLIN4AAAAASUVORK5CYII=";

  const img$q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAKlBMVEVxs/9xs/9xs/9xs/9Uq+h8wOie0exVruBosPlWq+vX7fbC4/L8/v/m8/nSyqUZAAAADHRSTlMBEyY/td7q2GCL//vkVvO0AAABqUlEQVQoz22SzU7CQBDHuz5Bt2+w24tXuxc8W0ATvQExWm9iYsRbaxODp3qoZ0X7AmpEvQGaoDcJCdabaAL0XZzph2Grc5nJL7vz+VeUzFSi5I1qlGlUlRk3hDAMNk+JVvDBPEOCemsPrOKxOagtWiHaqgSX723Xta3nJQmOS2E43rgzJPjd7NYejvNwx9m1AGblCaUIi28IaTIA1TjXz1IoOGcU+9aF8E9T6MNcMBbRz0zTLCfwFsIA8tKk72EMMXrzVCj8Uq9WqxWEDgS10TnDvos49yvAeP5GDL+bH1EUTVqdDXCzYWMlhlYF8q/5wQVW/DpM4FYJvu36/iW6Xvpy6wSKDrzCOrjPXvpyx46/+6fgzJssZ9dxXDsIrhzH2R6ksPQIZaNix8ImOgmcwtJdG5sH75YfoU9aeJn2+/0nhEcQvL4DJDp2cpAs5AvCfVgI4Xjyi3R1ARyfqygOIUS2ZE8IzuJraNrv5g3GknsQMn8j8s815RNb184sD8cw1nVeIZO/WlooNEbtdjvcZLI+6/V6Tp+Ei0TJVNa8DsYlzaPIWDaMovwAZL/or6fIiIgAAAAASUVORK5CYII=";

  const img$r = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoBAMAAAB+0KVeAAAAJFBMVEVxs/9xs/9ys/9MpulmtOdnr/zh8fi83/Gb0Oxbq/OFxOr9//+JfW/0AAAAC3RSTlMBFzCpxUz+9el63FJSSeUAAAGaSURBVCjPlZKxToNQFIZ7fYLCG0DC0BkKtCvYimzUDrhCGpM7lsQoI0ZtupU2lrnRGFnJhcDLee4tLaCJif9yyB/Ofz4Op9f7W/3fFgf66SFeFIWfLi+5iSN0E5A4e7mzxK7JSWpVZRuh2z3DwVV12elH4j43jLXn9DvddjYptXLTns+7YRQSkwyFNuQNuSbgr1rzkaSWamlnduY0/fwgXabePtfzndAGMrEV4wNuoCiQnsty6qUNFJJonOarAHUO5ecfURityZiYwSkU8a6iACQ+hJE8rKGQ9BZphVbYnp3pft0PQDDB9rVCb6AAyIDW1ZaY8PDOoJBEgRQySmDYsoaCDfmTTCt3iU2hCrZptqHI9mV5WoyJwjaF+Ft4slJCCM5jSHgAKLohrUi0BShIaJJDTbqhJJZBo0QHrA2Yg/AQPn7V+qzMBYReDLARVmcRIwQT3rTGr2c9xZiaUurLTCxWnubwS2Ed1T1VoLOCfTqdd59ZWqaykg/px3NSbFJZW1ZGjnC8zHlL9ZVycK9Ux3K6XIS4lnr/0TfSp76y1fG64gAAAABJRU5ErkJggg==";

  /**
   * @ignore
   */

  var MARK = {
    attack1: img,
    attack2: img$1,
    attack3: img$2,
    attack4: img$3,
    attack5: img$4,
    attack6: img$5,
    attack7: img$6,
    attack8: img$7,
    bind1: img$8,
    bind2: img$9,
    bind3: img$a,
    bind4: img$b,
    bind5: img$c,
    bind6: img$d,
    bind7: img$e,
    bind8: img$f,
    stop1: img$g,
    stop2: img$h,
    stop3: img$i,
    stop4: img$j,
    stop5: img$k,
    stop6: img$l,
    stop7: img$m,
    stop8: img$n,
    square: img$o,
    circle: img$p,
    cross: img$q,
    triangle: img$r
  };

  /**
   * @ignore
   */
  var MAKR_ALIAS = {
    attack1: 'attack1',
    attack2: 'attack2',
    attack3: 'attack3',
    attack4: 'attack4',
    attack5: 'attack5',
    attack6: 'attack6',
    attack7: 'attack7',
    attack8: 'attack8',
    bind1: 'bind1',
    bind2: 'bind2',
    bind3: 'bind3',
    bind4: 'bind4',
    bind5: 'bind5',
    bind6: 'bind6',
    bind7: 'bind7',
    bind8: 'bind8',
    stop1: 'stop1',
    stop2: 'stop2',
    stop3: 'stop3',
    stop4: 'stop4',
    stop5: 'stop5',
    stop6: 'stop6',
    stop7: 'stop7',
    stop8: 'stop8',
    square: 'square',
    circle: 'circle',
    cross: 'cross',
    triangle: 'triangle',
    攻击1: 'attack1',
    攻击2: 'attack2',
    攻击3: 'attack3',
    攻击4: 'attack4',
    攻击5: 'attack5',
    攻击6: 'attack6',
    攻击7: 'attack7',
    攻击8: 'attack8',
    止步1: 'bind1',
    止步2: 'bind2',
    止步3: 'bind3',
    止步4: 'bind4',
    止步5: 'bind5',
    止步6: 'bind6',
    止步7: 'bind7',
    止步8: 'bind8',
    禁止1: 'stop1',
    禁止2: 'stop2',
    禁止3: 'stop3',
    禁止4: 'stop4',
    禁止5: 'stop5',
    禁止6: 'stop6',
    禁止7: 'stop7',
    禁止8: 'stop8',
    方块: 'square',
    圆圈: 'circle',
    十字: 'cross',
    三角: 'triangle'
  };

  /**
   * @ignore
   */
  function setAlias(map, name, alias) {
    if (!(name in map)) throw new Error('alias target is not found');
    if (!alias || typeof alias !== 'string') throw new Error('alias is not a string');
    if (alias in map) throw new Error('alias already exists');
    map[alias] = map[name];
  }

  /**
   * @ignore
   */

  var validator$7 = createValidator({
    type: function type(value) {
      if (!isMarkAlias(value)) {
        throw new Error('type is invalid');
      }

      return true;
    },
    size: function size(value) {
      if (!isNumber(value)) {
        throw new Error('size must be a number');
      }

      return true;
    }
  });
  /**
   * 绘制 `目标标记`
   */

  var Mark = /*#__PURE__*/function (_Layer) {
    _inherits(Mark, _Layer);

    function Mark() {
      var _this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Mark);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Mark).call(this, state));
      _this.img = new Img();

      _this.img.on('loaded', function () {
        return _this.emit('change', []);
      });

      var theProps = proxyProps$5(_assertThisInitialized(_this), {
        type: 'attack1',
        size: 7
      });
      defineImmutable(_assertThisInitialized(_this), 'props', theProps);
      merge(_this.props, props);
      return _this;
    }
    /**
     * 设置目标标记类型（名称）
     */


    _createClass(Mark, [{
      key: "type",
      value: function type(value) {
        this.props.type = value;
        return this;
      }
      /**
       * 设置尺寸
       */

    }, {
      key: "size",
      value: function size(value) {
        this.props.size = value;
        return this;
      }
      /**
       * 为目标标记设别名
       *
       * 比如 `攻击1` 和 `attck1` 分别是中英文的官方名称
       *
       * 我可以通过 `Mark.setAlias('攻击1', '攻1')` 设置别名
       *
       * 之后则可以使用 `new Mark('攻1')` 获得同样的目标标记
       * @param name 中英文官方名称 / 已设置成功的别名
       * @param alias 别名
       */

    }, {
      key: "_clone",
      value: function _clone() {
        return new Mark(deepClone(this.state), deepClone(this.props));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {
        var img = this.img;
        var _this$props = this.props,
            type = _this$props.type,
            size = _this$props.size;
        img.src(MARK[type] || null);
        img.size(size);
        img.render(ctx, utils);
      }
    }], [{
      key: "setAlias",
      value: function setAlias$1(name, alias) {
        setAlias(MAKR_ALIAS, name, alias);
      }
    }]);

    return Mark;
  }(Layer);

  function proxyProps$5(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue, target) {
      if (!validator$7(key, newValue, oldValue)) return;

      if (key === 'type') {
        target[key] = newValue = MAKR_ALIAS[newValue];
      }

      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }
  /**
   * @ignore
   */


  function isMarkAlias(value) {
    return value in MAKR_ALIAS;
  }

  const img$s = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAAHlBMVEVHcEz/ACr/ACr9AC33ADTxATvtC0D0ZH37vL///v1j7saHAAAACXRSTlMACRUmQGWWxulh22TmAAAC5ElEQVRYw+1YwY3bMBAUOyDZAckOJHUgqgPLV8HZTgGHwAXEgBrIWd3ezpKSHT+4VJA8AoS4zwE7nB3uktpx0/xfv7dUo/OqjVdNgihacrxGsFH0R0yAiwQUh3hjgFEV+SujTFqEoH+ljB7xgEjxJBjJGGttQrCOsgLs72h55yheQuCAKN46770FQi4G5+PTAsIoMSHL+7dd23okJVQCGWHzDst7HK0Uj4RC18U4dK2nsyqLpowc7x9jHIcOOZnyIREDx4/TdD1wTuXuUFAQOP5yj0PKqczgKL6P0/G8fB4GnFO5ECkjxM8JIDBQGSi+H6fLsmQGV2TQJgHeKH65HYakuqjZ+hDi2wzAKQOKzc2aIxPcCcDdoQTNBJiukPAuMxCCAcfLCpAZuMzTeQWESoZzJUMqQ2b4uQLKrWRDeAYE9EaxcPsZGHBaAZ2sIYR+F8NLSp2sAdeZm3WXhlyHWKUB9+20V8OJ+vtWqyFkwA4NPQM+K+qQTqmP4waoYQivDLosGnUYnzQID1liGE/P3aoqGI61ddgYOKUo34dcuBGvABWuEzU0fON6BtTch/XVGI/fwBDxLrmKV4MYrpX3IbfGCqjS8MQQ5Trkbn2k1P5NDdWvt38GyPfhF4auqg7tK4OWL9B4nDcGSYNLDHPlF0jvZ+BRY2PAV1T/YQ0PhjsBWgIIo4PFDeJjXQBoncCAO9rSZxSAH5EZhIeMRSSGj8iFLs+tyvK8xN06RZ4Syxp0HrCu0DxwRloYsHBMPQFuE07VVYxwFv09398nluCk2RtzK314548pJgJp9k4U8fvhAAJI0JI/IQoejLkIUt2axEDt1G/xggZM90Cg7zzbGtEybX7DIV5LRo4tjUn2hP2J6LIMc5D/scmWSRZINdnBJVsmOkU4Q7WFk8Os8KLJmeV8ZC9KVlIpve5f5aizj67235rdHHyxVqIRZbvN/lY3qy+uoYFSneG7fkrYszQn9Y/8SvIFsfVRvmQOaRgAAAAASUVORK5CYII=";

  const img$t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAAJ1BMVEVHcEykkgCnlgCpmQCrmwCtnwCwowC5rgHW0Brw7VD9/Yn///3//8tWcKyMAAAAC3RSTlMAESU+X4KmyN70/mbsqUAAAALaSURBVFjD7VZLctpAELVuoB6fQKMbaBRfQBKVA0hKeY8k+wBGOGsXv/I2xoD3wTYXAOkAgH0o94wIVDZ0U5Vd6JUW/TT9Zrrf64uLc5zjHP88LAsArFPShZCCDwEhXaWUdMBm/R+Eq0IM5UkWAvP9MMGIA88BXn6U5BgaQR9hAeanxXAymfSzWDk2mS9VlN5MP6qq2vaTQJIA4YZp8VKZ2PbaHtAEkmJa7WL7QACwID/KRx9/AKsscI7+3xC43+dXSwJgCXUgwADoG03ykUl9nSwYALEvaNMvh5rDHQHw0+6iyS/K7jsNcMN7k7/q51lRzkgAuK13Q2CeJ0lazBgnRDPzXJ0sDDkAcKOfmF+Psen8qMDTluQJt3hHm04cKL91g5/rLADill6qupeFnvTN/f6OPZsA3FbrPFYSAbq6p+MATeLHZy8JPOFGhnOHBPjRMAk9BwE7CscnTjdfFCoJu4rGRLPiERLlCKXi8huyR/oxOXAgXYki2VS0uaNHGsABsIWpqB5TFHYibK73sbkj4Emr2/QFPiBPW62GwpxR0f7BkcKqx63IujQU1ljRKRTqpyxAtbd5Fd0iZWxydBSGCe0udZ7jVHiSYRC7ivp5Eoa+YngQqAhnZ1nmGXpQqMgjmrGr5mUnR4j2IF5F47Isu4PBoO05lIP6+pnr/mAy/cR4ICYCtAHdY6e+LYzG1r8og8AhLUYHva/vSIOI0nJ2AJAWJNHhDo7FAKDONPma8CcJQM+9Ng5dvw50TBbLWB19B6GuTSXPZW6i+0y0uFDf9QGrMtfLSaJf+rhuCLe1eJ1Va20Qgd6AcJ+hxLWLt6oNQukVC5csoBop7b6j4OPsOI7EgOPtbRlfqLUggdkTATiCsdrrCz2f2KuP1aZNifZfJGZbtiAZwNVbD8fM5gIseYVPoBw2AITycV9lV2R2RG1B7BP0Fi2Bf0Cz1Z+w1mPYtm1fnOMc/2V8AZ7jlp1TsQXUAAAAAElFTkSuQmCC";

  const img$u = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAAHlBMVEUASP8ASf8ATv0AWfgAZPMBavACcu3j/f93v/b9///gceS8AAAACXRSTlMBESZDZIet/c+W+hveAAAESUlEQVRYw6VYUW7bOhCUbkDpBpJuYOoGkpC+f8lND2AnPUDs5ADNq/9bO7rt25klYz80XAYo0TRAwNXM7s6OSBXF368Sy7mKv7O7XVyVbncus79w2FhVlfxIlOy3QkrQcdV1ZUmV4fHXRXppAPe+vX7HMAEKVzGiaeta/hGiSkLE7dwrIU3TEMMoUVkwomlaLokiRJoWEeTZbVxkVVolIqGbRVYWAgBkbTYb7zv5v22N/USQ5/ubtWkbcHKpIlVV23nfez8MwyjLe5BKQSCibn0/ck3jNE3j4FGoVApSo7rrx0XXdtkty0+BSCHIn8Ho7v542HM9Hi/r27BppNWpCAnwd+u6HmVdVqxfCEh0gm2uGXBdT8OmTYpJ5iUgXNdvA8EVoNRPt/svQJAkyiRC7aeX24DFQGBZ2278Jhtfjsfnn/L7MLPXH9dVpdf1d8+vrOp3AdiN6EPlkvOArNk4CRBqh2WMavp4P6QhrZ4Q8SgA+1mk0aZzcOQEMU0LGB120BKq9HEjgFC1Itde9ARGezJq67T6qG+ZBwSs6xsCmEMKgZRk3BDwIIz2c0QokyOHCBmhcSuMXhGgVXJpSoLQdf20RddISSY8nXSIEISv0MV+NzOiSokpuAYQECBl1cY1qRzcFQE5CMQijdi0aTODXhuUSfvACKXkzEZ0fpy2D0oKnJJ1VSerQUm0cULEj1knyCXNTxsxjstWSS2DT7caPiAIkN8kECT1Q5KwxMQyeQpcIZ5mM2taE9rAIQLEefbpCVI/rrtxeTkQQgLe5sFQX7Cm6STTHAIuEmBoo3y3pkNIAgFpbaBKEvCFJrksEaFJJ01K/VcNYLORQ5tECJT+wZN3GnBWBDPpHn58hjep9zFpKwePaTiEPjyZfShiH06X2OmdSiOlpdjpRWq0e2AqtlqLoCX4KwHeIO9MpxvMg8jvkQAzRzTZhiLMQx9G7ky/b3IIHWcUjF7BqDUPNNE2VBfCyFvKQNIy09Fc+UKBtxojHRGm7UkZ8f1gnYB0v5qr1shkFBGU0XlnO2VwDbXK7xRejlGhRtZ5FlUYDeyCcfoOZtxP2ma+gKwUgNDUYveaAovKFKyyMmcWVVOozbNxQbsPrwcWFTkXmapKzvdQtqTQmdMWcsAAqS4GTcGVRcaL+6iLzSaXAs/qksIaU7C7wCpJztND6EJr2WpEqMVbTzr+QRfmJQ4voH77Pv50mCKD0Km3HsJ0mtcmOmXXf1vjuypTo5DDyIMoczaH54rAgAWWZ7w/b+TdH/XNw665jDJKOuX9cb0EB8vddmn3YsbLvwNdO5Ozo/Ph5DCqISXvGn843+AVIIPAMvH8I5PAa6XL3/ArYmAQGr1N29dj3qcb0Xi46ZZ5hP/f8LNfKKR17nZ//jNFWZQ3nwPyCCVO4GX8epB/Ps+uIh+n93T3CUr48BA+nyD4M19mmDrYfGZ3zKNgfT4boTCp7f8BtPDRBQzLz/sAAAAASUVORK5CYII=";

  const img$v = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAAIVBMVEVHcEz/ACr+ACv6ADD0ADfyBDnvCD39z870V3P5mqT///8kLrQZAAAACnRSTlMADR84XIm39s3l5JrrVwAABAVJREFUWMPtV1tym0AQhBss3AC4AegGWio+gJYkB9Am9r9Vif4tx/63k/J/IptTpntmURyxCOU73ioLyTVNT8+LIUnezv980sSk/2KeCgLnLHNj+Gd4Sc5BGBDAOkvTDJdzSGiVZhnNzxFC5w3MCcnSMzC4Pe3DgUdmPkRy80IAkDIrQO6f53lRFEHIHEGwLxUxRyEEsJaTi/1J2UYIYF9VdQ1IMUtBQJmXDU9d0qk5lyigLJuFtUsg8kJCezqkhdi3RIgMM8MAgqqx7bdvKwuKUtJ9kkEcam/7/nm1VBUnNatHtt32fb9Sn06kTgjEow+w79dWA2VmgkqPPhLwIBTZCQq1rwD4RMA1RIAim7ZPEmShrBvr7gnYOBsCa6Yl52Sw3RMBv1wQkUw0BTUX4lHHIPUva8l2NpU7aQUhaCVICJOohoh0UnOeVwC4SwVshmRHEYc6GjQj14OIiVHASlUJ0LzfHkTEazwd6ggSOoYIqdivQ3VkUwSI0SBhw48bABrxadwU6SHN1l3BdvcZH48uqM6mWqE6SPB+q6kTxHiQC4H2pqTt2ft7qoZPFVWbeBbUIzqz8f5KVIOCuRtTIM0DAeXuvJeLE0BUBAcYFTg6Dwmdl4JdBURMA2IEhzp69OydqoZPS+0JM85CJt3/yObZrNdOVHtSxBgSTbN1T3v2wm7tuo659rcPTEU+aiIjhYTW0U7w3jlRfdf/lGkznn8MUhW6H0F1zonqMJ7ycZgoAZq1sHd+TYCyORTgWDVcYpAutBEQVLjkBb13qjrOcPEUXBKGK/kB1ZHRMbSzzgvmrfNe0dfCcBwlKW6I7i4DBTJ9K1+/uGH+HbtUYoQNAFD4zxokv7JhOI3bpwIg9P9mcOjFr6IM2m7DCCPF5fCFADCkx49PZeAI+7EdPvbMCRMXER0YWHnDzfv9bstppgzHYQ1RkgoN8UHCoePXaQb2gPdaFNqmoTSOu9rIXJXSeEThfZLhvZYgO3k2mnGU6NI7zmzXOiZ8ByBzcbNsYsNPphIBL+ix1n3EJHYrifK19MPIJdlJmvYJ9W8tEN9vHC743T8v6yKPTHztuPbuwS6XC7ty2B2AQNQeAsOoWrWDcLDIWL1a+/7rjW3iA19GJbcYWX0WiwUvYUcZEySyS/KJeHRIVMfXLNn1hlWsIrKu/+xZIDCxbTIse1UZTt2E50OMQaZrXr46AUf78aOd63nYWMu/Ts6dN5148MJed2JFAZzriixvFOOnqMrIirDiZkhwkZ9YwYPw7GA8fI/u+PyX+QvyasUngYm9+ch7j5xX9rz99IplwkkOaLnRxMtQ4E0P71nh5clMLXAaLDFPJI5GLmbupe7wPqb2//bCmCTzL0Fv5+3I+Q2DBukLflw5cgAAAABJRU5ErkJggg==";

  const img$w = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAAJ1BMVEVHcEychwCsnQCikACnlgCqmgCzpwHLwgzh3C308l3///7//9f//6HBfHOqAAAACnRSTlMAFZYvTnK40+X203OOegAAAy1JREFUWMPtVzFu20AQNH/AA39wCM9xKRzzAZP8AMFTXBMIJQGqBMSxoFQu3EhVCsqQ8wDrqN4y4doK5Dwqu0clKTlsg7DWaHZuZ2/nzs7+f/x5nuf7PX7v+0IIrw+BEIM+CCECrbXoUVSgkyTWAi8oSNLPSTyAGUSUfvxhEioK/H0QmYtdkceobC9IsmV9GyYDULYXpFeNPUiiAAE6nVq7m4XxAEOI4PLB2rqSucZUePpy0lj7XBAFpIJED/9QIAgviLLJkSkMqUC8So1TX1sK7KCETrNzR0G9QHRTq1M5b2y9ximSTK2sfZkxhQ+IYIrRm+V2Yy53FPNj224fodCJkSWd1CHEKGiECHDTEIVBXN4yqJJ0V+xypNdppq7L8dFuixyYPB6h0feDIhX1LdXUfe8F6fzNvko1buxrCPSOvLGwBJDlg90jIrzITB2APEi3QTdAOMBBhnJCInKEIZu0gFFjv0EMLSCTo6OtcIYiZAAxiM5jPQEkASANVNKYAGWhRk09w0qilh3KspyQ/TCG943dX5fl0m4/QY1jwG795eZIExEPut0aXRLAvvx8s/VdCAyE0IYB/O2LdzEwctqcnwDrIsfc+hcAzAPd3y1DTUdVYPPgAPX9yu7uQmSdOkB9fz3iY4Uax8f63DaOB8iHGsfWmNNFk8egNcitytUEXBvOfBXNQ7lx10Zn2HDzUEmTqSVdG90MDkAu6gOY0nUR5pna2EcAQGuULsmZMRmJfsQ0LHiZGNaOlBR8yLhjxijS/oSVtCFAyJptZTQAGB7tXko55h2Ua79bw5UDcB54kpj55g0BqM+0swB7c3ZY7WU5Pm1FJACZ4VqRuakwYO96bimWinZi7SrqvGa8drGvONBA8cRz0YEISHIOZSxWzWe65VAGEFAjUskEaycZSgLOFWiY8bgiTqJ7OJFFRrkgyoEMi/eOgCVDBBQ1WEGPABekvB5ayUj69qJ06XYJ+iAgd296SHYMix6SnTEuekh2pzSkyIA+H9rIt9hyl+GXX5ReVQZL9r+TtAkTVLIbUX6MDmAAv0bdc7fvgxoHuBd7nyf+SUmvn/f+/3/9+wWjzpo7KyG2BAAAAABJRU5ErkJggg==";

  const img$x = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAAHlBMVEUASP8ASP8ATv0BY/MAX/UJb+9ZqfTO7f2Vzfj+//+Aa7iQAAAACXRSTlMBEih3TZ/H9OHGieiuAAADoklEQVRYw+1XTXbaMBC2biD7BtbjBrJ5XVu+gWuHrnmQsG5TyroNCQcIxrft/EjBaTV2smfygCzm0zf/GiXJTW7ySdEq0R9UBU2dKvhWH8KgFkmqCDEH0YBQKQoiUF3P6KNeyhAGqRmDwJaRaNBXU+renizNQQii1GQoWT0Ic8h+ayaAsw0JIsCLCZvIfjiZ1HPDVskEfH7QZxAglGgTe0DmLFA8QtZP2CBUr0mqChAYJ8EJ0gcCVHfOEcYY0Qk4R5NBoO8sSwGIXEwFewz6oF62IA0igEJg4JAaU9eg/vCy3/962bZdU5FNWiIg/fbhMLDsD30NABUnYA/g/PvhKq+1yKDJAyAY6w+/RQZKGoTILcf6w1pioKrAkNrTWL9vRIaEY+rKoErfZ4tRiiFCTF1LEeqP3fYZfh+LChKXCD7nYFHZnlB9g4kD79cFMfyP8C7UrtzCuU+YZvic2AUdnQMcVLtCw0EXK6lcXgqupXhQyaLdMFw2WEW2gM+2FisDEBgjJkB9Oy5vFa28HCz6Rh5waRfYQlJ1e58xaz0SlGVjueUyoYHY5xKScEGC9v4JeuGtReNp8Gl+BUC5Gi5AgWMgFXwA/cxQ4T0CoIVgbWxdLXhqJDruA1fqE7iA9XG2GCP0QcXzFkp7A4AVt0LFk0xIAzJ0CACTdgj4jk7nwlzi0nNfmKG8Q0CDDDOJ/teHheE8qJgP+QiAFGsOazaR6cVbWIHi3GDiqDRSFesHHDGUuDMCmtXacu2B1zIDlca5tdfio/JO4z5QLYXi8+XtCqkfVMLVunsr76Jwzi7/UMfFwpRymO5CA8H9AEP8BMnLRYaQiGHjjbLdcBZtClMG596FrgYY+rvhYmszUUx+agw/ecysqD7iLaR8mBxRDD1Opg5n4LoweaqnJt+OJ+vLwzP9w7NSxccGzlbbHd6N+0tRyQwUJy7tq3ytJgYN2mSX7yl+CAwq8Ze0s6sroj9u2eloXD2Fs52/Rftjixc1jvtEvnbBKNt2/aHfHzF9NCyjy4ZW14valpuwCFTCuA/3bmpo1/CrBneQcKEwBS4/FTYC948xvkXl9QeNIgh1G80AaU1UPlC8wGH/G3nwXVPh/QiSTe6hHhGWUD5/ctMNHGEPzTMeY3pqlab1OaetOPPbt5Y2XUVvAdTHP16kp1dvv2aNhZ4cavo9o9T4NTD3QtH0ngnHJ+pjbybFDwnEzr+bNL+yktnHT8S0RH0Oc5ObfEr+AkirmYVwyl8kAAAAAElFTkSuQmCC";

  const img$y = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgBAMAAAAQtmoLAAAAG1BMVEVzQpZ1RJd/T52JWaKSY6iba67+xv/Zj+D//P+KtydjAAAACHRSTlMCGjxsk7f+3p2mXvkAAAQ4SURBVFjDpVjdedsgFBUbgDYAdQKjugMIOwtYyQBN3Lw3TjuBorF7/0CqA0L9yksewvW559xf1DT/f9S/XNZKqUap/b+tGt2QidptgXe13ueY1uiRgj/aqH1U6L4BAwLZg4C/rY1RBv3SVTXBIwPX4aBjO/2JR+1QCq7ATWutIaeqvJGAMa1zrhWMyv0GCBtHBy1I3rpHbdf5g3MEUblPHrXOf/sOFgihTY03GLjOn6fBJ6cqoiJAeJ2fh4MjqSoswKXW9dd5vgaEIKkwe8ulgJSPMxyEcMaabRLkUveKBh8I4Vioookmzl/IYLqAUNZVgscIZzIYB5Q2altKVlK1J4grQrBSaqv+UdYTWbwEtGhFWl1wCf4NcXhkFkOUthwKsLAOLN4XCEsk8hAUaUyNnpya3gjCCkQeBYUH2qffAuEdFpMu5RRWA5aD759emcUhpZQqZivo1PnT40ooTttcMKhALUIEZnFZS1vIVtMCQifSvpC0XODZLOSe4dxBINgpaiJZ2loQUNkleotTKovALvnwNN8niCq0MYcuAcT7nHhznmecEgQPZwgjsfhBvJGFzhQr6ercEQB8EBYUb5fPQUxvEKk7Podh6AMnyEwpZfPtgBtZd5yeQwCLJymlQepblQqih0wNwIIThJXKh04QArgeeh8hON42g0AcsEapMQFvhphu2HNyDURxPXjsG9BeAWJcscjKpFEl/4B+DAMYLCwgFJleIC6xgV8gwEGPPmXjJgY3MugFYkIIk0ewKwSgLRBXn5NpjfAcPPskEP6QS1jsfNFgkBRkiGnIIpiEgJXDCL8igi0jnLgOiDTXERgUOdiOIn1hWbm0Ibd8NnBSP2jwFtZxwBS3n3ND6ocNKDVOY4q0yyQfV6i4BAXR32VfJr2pKzFpSqVx1Z2AQ7ZpMAKoFIDBdekDuSHPqrqeDVKu3gig/cyBykE4TGMIsdHEXlaKW9eLgTC+BC7QTAOXbs8GpzVjXm0+tRlp9uzSOK4Bsgixj/UPbHAPoJp8GMhgHsf3ZVrznGtUnoMgPN3vA/k2hoFmBGqsH5fhEEdWZlLLOOmRrSTREEdWbiomBA7w/YLSFAdWMpDxY8WjkkoycglgSAA5BnFgRQMeoXEbLaxLoGo0mG6bEzR11rjLwHCL+zEFOeNSQy8B33NOfKRJVXxHyKp+uiaF4l5ZWH5oRez687wkEU3P4i6teR17XAFgYWpTeKHJEvqwSjprN7d15OB8YtxtrlaJw3FpFABArUJtPYCcf5T1MD6cNpZ1+B+odJYZyM8HU9ntQaWvr39v0ZsvFGqU5/ljiAptPoG0ksi9/+Skq3gkbYYWvvTuUzuerrDxkT9WFklde7pal96uuoYQi65N7+nadZ7UxnLVaF39jIBOp/e6rj+/I434zK1+E+APJvHU7/NTTmv5eqB3WJDXKn1rKZw/3GDp2IYUxjUAAAAASUVORK5CYII=";

  /**
   * @ignore
   */

  var WAYMARK = {
    1: img$s,
    2: img$t,
    3: img$u,
    // 4: four,
    A: img$v,
    B: img$w,
    C: img$x,
    D: img$y
  };
  /**
   * @ignore
   */

  var WAYMARK_COLOR_MAP = {
    red: '#ff444e',
    yellow: '#fcff44',
    blue: '#448cff',
    purple: '#9b44ff'
  };
  /**
   * @ignore
   */

  var WAYMARK_COLOR = {
    1: WAYMARK_COLOR_MAP.red,
    2: WAYMARK_COLOR_MAP.yellow,
    3: WAYMARK_COLOR_MAP.blue,
    // '4': WAYMARK_COLOR_MAP.purple,
    A: WAYMARK_COLOR_MAP.red,
    B: WAYMARK_COLOR_MAP.yellow,
    C: WAYMARK_COLOR_MAP.blue,
    D: WAYMARK_COLOR_MAP.purple
  };

  /**
   * @ignore
   */
  var WAYMARK_ALIAS = {
    1: 1,
    2: 2,
    3: 3,
    // 4: 4,
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    a: 'A',
    b: 'B',
    c: 'C',
    d: 'D'
  };

  /**
   * @ignore
   */

  var validator$8 = createValidator({
    type: function type(value) {
      if (!isWaymarkAlias(value)) {
        throw new Error('type is invalid');
      }

      return true;
    },
    size: function size(value) {
      if (!isNumber(value)) {
        throw new Error('size must be a number');
      }

      return true;
    }
  });
  /**
   * 绘制 `场景标记`
   */

  var Waymark = /*#__PURE__*/function (_Layer) {
    _inherits(Waymark, _Layer);

    function Waymark() {
      var _this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Waymark);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Waymark).call(this, state));
      _this.img = new Img();
      _this.circle = new Circle();
      _this.rect = new Rect();

      _this.img.on('loaded', function () {
        return _this.emit('change', []);
      });

      var theProps = proxyProps$6(_assertThisInitialized(_this), {
        type: 'A',
        size: 5
      });
      defineImmutable(_assertThisInitialized(_this), 'props', theProps);
      merge(_this.props, props);
      return _this;
    }
    /**
     * 设置目标标记类型（名称）
     */


    _createClass(Waymark, [{
      key: "type",
      value: function type(value) {
        this.props.type = value;
        return this;
      }
      /**
       * 设置尺寸
       */

    }, {
      key: "size",
      value: function size(value) {
        this.props.size = value;
        return this;
      }
      /**
       * 为场地标记设别名
       *
       * 通过 `Waymark.setAlias('A', 'A点')` 设置别名
       *
       * 之后则可以使用 `new Waymark('A点')` 获得与`A`同样的图标
       *
       * @param name 官方名称 / 已设置成功的别名
       * @param alias 别名
       */

    }, {
      key: "_clone",
      value: function _clone() {
        return new Waymark(deepClone(this.state), deepClone(this.props));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {
        var img = this.img,
            circle = this.circle,
            rect = this.rect;
        var strokeWidth = this.state.strokeWidth;
        var _this$props = this.props,
            type = _this$props.type,
            size = _this$props.size;
        var unmapping = utils.unmapping;
        var isCircle = ['A', 'B', 'C', 'D'].includes(type);

        if (isCircle) {
          circle.stroke(WAYMARK_COLOR[type]);
          circle.fill("".concat(WAYMARK_COLOR[type], "36"));
          circle.strokeWidth(strokeWidth);
          circle.size(size / 2);
          circle.render(ctx, utils);
        } else {
          rect.stroke(WAYMARK_COLOR[type]);
          rect.fill("".concat(WAYMARK_COLOR[type], "36"));
          rect.strokeWidth(strokeWidth);
          rect.size(size * 0.9);
          rect.render(ctx, utils);
        }

        img.src(WAYMARK[type]);
        img.size(size - unmapping(strokeWidth * 2));
        img.render(ctx, utils);
      }
    }], [{
      key: "setAlias",
      value: function setAlias$1(name, alias) {
        setAlias(WAYMARK_ALIAS, name, alias);
      }
    }]);

    return Waymark;
  }(Layer);

  function proxyProps$6(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue, target) {
      if (!validator$8(key, newValue, oldValue)) return;

      if (key === 'type') {
        target[key] = newValue = WAYMARK_ALIAS[newValue];
      }

      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }
  /**
   * @ignore
   */


  function isWaymarkAlias(value) {
    return value in WAYMARK_ALIAS;
  }

  const img$z = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEXOki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/////69Ovq0KXivYDx4MMr9uIfAAAADHRSTlMB9nPaQB5aCRIrsY2HszY1AAABLUlEQVQ4y21T2xaDIAyTVofAFP//a5deUJDFF48JSS3tsvSI/vxDBHaHvL9JfN6AhEegql4AOqW0OvC6qc9zHmdBfByigcvtEeU4WKKiIIJGTOLAU8kcBMy5kCh2U0hAosxg66moKqJmIfyahbuOr+K4RJVXV8Qd/iWczrrmDAUpKhCDT8nh6gVXyCLYoiWgQH4LGIVqBgQw4DmCYWECJHC9Bl4KrWxFmOD8TjgHQT3e/DE4vP7B/6MJUCRNFjAgK1L7QJMFDEhaqVchjXpZwODupGXkoRFoQ24JyNinXnunfSD0OqkPkQBa74mxKroQD2gGbvEoGn+PXKfAleASJv5RcKg18Mwvuhcy14VlDoyP426JYm1rMfHmsdlupWFpxvXbbDX3P7xL2nY/X3/exRsQdpJunAAAAABJRU5ErkJggg==";

  const img$A = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXEggbGhQ7IhxTKiR3Njyr//v326tboy5varGFhRJiyAAAABXRSTlMcUYbC9LJu8A4AAAEOSURBVCjPnZE5koMwEEXRDfSFL4A6mRRBDaQuKOMLsORjjHMW54Ph3NOSGB/AJEivHnT37yD45BGAPwDSvSnyBFCxE7JXbAkQXkeriK9mZUdA5f2vA6e+M2CftubsQLjVqwZ0XnexA+CT0ZqY+zJgt9A6tV+6skql/S1JLk0ReSAU8YWhiaT0nbJ+Y6aPTgMo9mcWjhGkUlT2Q8ngbVC5NAyi/2l1urf94/0PoZKsvl3qMYk8wGmq6te1nqrzAcJleRbpcxhiXwY6a4uE0nn0dQVov9tZ7oM5QN5Wo9bZNPtpBW0rcUJk8s44kD24RyBStPtMsx8omynw7YAMjQ1dcuwUH/sBXwNhFyU/2fQfpJQ8vmcqRRQAAAAASUVORK5CYII=";

  const img$B = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXDgQLGhQ7IhxTNjyrFgwjKih38+O/r0afbrWIy71vcAAAABnRSTlMSTYr4LNAGCvW0AAABJklEQVQoz22RwYrDIBCGc8gLjPQFOkHoOUFzTcAnUNj2Hnb0LrX3Qu1r72hMF5b9IdH5dPR3puv+VV+0/IZmNVX9EQNr5e9UN/U8FRyJcyMGBDqLKBWewTBYBcqkEJ23eD5xBlzUlL2VKUzuyTk9fIUHkXJEj3yHAq6eyCuXiNKzgoES5TgH8jRWIBOFOeSYyVsG3Yqatokek6aIfMuyCkfR6ahmUuVa9iHn6N5BzdFWYAAH5XxSbLccwaeyVR31xkZ3wDkDr1fnDeA1WJnvBwBRAsvwA240Ig70ameAzKHUg/8N3OiOAHilVwOaRi6fGGg7AO9lyfTdwGXjYnJp9fPwMcLJmBWG+pTyGI554HaY1ihjumUpw97Npe+7vWWf5u4LDf/VD4q0Ve1WPM+lAAAAAElFTkSuQmCC";

  const img$C = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXDgQHHhhDKih7JiBjEgwjPkjDIhxb+/Pju2LXetXIwSkvdAAAAB3RSTlMPU+G9LP2F3g3PGwAAARFJREFUKM+FkcFqhDAQhlPIC4SGPEBkl1y7otBbBJ9gxaZ7VNl9gzB6dSl6L4uv28wYu15Kf8hhPv7MZPIzRuKcs6d4uWmrpSAVpSWw1UjIUKj8dmvD6RqJFi6ujzw1Y9pdPsQKTK+181pPdwKFMNDPAPMMo5DUwkDU2Eh0KNPXtfN1PT1B7EHAIkgS5xO9cySp8+npD8D/dezBnaa8qHeoEGTwTY6wHJwRHGBbrp1GfJjpjwRK8boMCJbhjQB2hbPzh7gb7p/B4PwClaIvtFx0DpYBfL7ewLdmE0BfhS8lYgvRXQAeuZBbUEK1n1/HJt5gPLRVp6QR8jdOXoSU1lCipQxAlru4WQjaMrvLP8yK9Q8AimSlmvTcNQAAAABJRU5ErkJggg==";

  const img$D = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXEgQPGhAzHhhHLih/IhxXJiBnw3b7//vzYqVr9m2HLAAAABnRSTlMTPV3mf6q4+V8xAAAA6ElEQVQoz51RQWrEMAyMf2D5BxH5gdZZn5PNC5xA7wvx3gvW3k2bb1dyt4GE0kN1GNAgj6WZpvlfmcZW3HsAMEbQ/vSIQil+M4DTBVuHcUaoA24Kjxlx+ixzqyPQxZT97aY4KOG6ntkvS2S+D6Avxi1zWZbA6Tm3QuCY7ulBtOU+X0TEdG9cNl5Xfgb+GJTomUJizoVEpBKZKKxrIUpKQHfN3pOUp/ReJ66ZYpT+RcD5yS+i52/dyIfF7Hl1VT0eZ87nHw0SxlYL0eH4srCa3AI4Nbm6bDUAWXmPQVOyxqj+HpVtDsn9XV9q8VZ4CP4qggAAAABJRU5ErkJggg==";

  const img$E = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXDgQHFgwrOkCrHhhLJiBn//vvguHj8+d3v2rhVZilNAAAABXRSTlMLO/F1qzXbpjQAAAEcSURBVCjPTVFBboQwEEt+wJAX7ACBY7PhAw0RD0AKcE6FlvNKlJ5Rl367AUKWOSBh2eOJTcg2sA8JQyNgCdCAUAB2/xUCIg+4f1k/pQgiAFnyRkvwFAoq1UWT6vQEWL5i3iJfP8EravOd9aNZhAfYPTfdbPo0ACX+zfNs9WFMQeoNmGwqT0A9zOwkeAJlYdbHD5/alMHuWncWhx75a9l9IR4t4mTcZ0x2Rowai35oUavbsYO5JQs3q3fZ7hgMoukSH4B7LN8YTcXAP46pV5sZK4GS8/a8c1d4BXWakpvpWQkImUo1TbYKmTqNGrrT1C/J9jSioCmzNhGXpkAWzWWF82F18+7pyHmBD3Ipl8Vf17IJieAGEX0Ttr494R/jpEBT63EytAAAAABJRU5ErkJggg==";

  const img$F = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAIVBMVEXDgQLGhAzJiRvLih/IhhPJiBj//vzoy5zQlTb05s/etG8e90MJAAAABnRSTlMTQcnqdp5PlZKUAAABK0lEQVQoz3WSsU7DMBCGkzfIIQ9dsRvJYoxBlNHUeQFoFh7g0nRsJBexkZZCu1YK4QGICk+JHTsRHXqbv3xnn/M7CM5UGJ4swVU0fAbSrQEGIb1RUpLeCUE9NfFMKf4a+Yb0LhdxxtsNOJDyFj+PYpdfdgaQxxYRi19sJDjhHYuVNqyS1gjJVBdrMWlxMe4AkCt8TphosZx1x4LaFhVlt5hXHqTtIqFCYxkrB+71gVIjJJkH07qkzAiU/gNWoPuN3+On6gRWLx0gzAkcv8FNnlkhMfTNz5EZQVC2La59i7lbKdgE52PfwhGP4kPb0R3YmYt+1YhL6cCFbizK9UG6/zNaVGy/ellzd0gQjqo0e6A0SyX0IUhlS/ZBmYgkdKkMsboc4STqKDr3DP4A0UNbE0uOKKIAAAAASUVORK5CYII=";

  const img$G = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEXOki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/////s1a/x4MP69OrkwYjaq17XFGx6AAAAC3RSTlMBwHvfOVD5DhoomdRTQKMAAAEcSURBVDjLjZNbEsMgCEVFrFHiI/tfbQFJ0ja2KR+ZjJyBi16cO2KRSPp1s5BsSjnnlKaIpHMOIRhyBTgfwoODGSYmBTKnPYBnJF9LaN5D7D0yIsSkgMdeW6sd/WeJZTSAra0cbYPRxBidXhtQrALUSNpkn9bmY4GEnUu0jqRCbVqprmlPgFKiRgTyhjCheU/EeQbKuhYGmOATJZzJk1PcAfmPJtWpvFhqjxLaQqLXElWqAsDiWi2lVBFpP63DAWBZJ1Hwf+C2xU+Rt2PeX5QS+hQEAwDSx7Crfn0sGBrg7bHMzkrsrzlc92JuM8zpBzPMp+VoG5bbaOJa9SSPwaZF8FfTmq1/2f5uccZqyeqFb6t37u40f+z/okY9D59rCRb5H+uS9QAAAABJRU5ErkJggg==";

  const img$H = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXDgQHFgwjGhQ/NjijJiRvIhxbYqFrlxI79+/fx4MRu8iIuAAAABnRSTlMONmX3yZQr5HL5AAABKklEQVQoz22RS26DMBCG8Q08lnIApuUCjSlhWwis84ALODyyJuWxrgTO2pUQty0F0zzUkTfz6ZuRNb9h/F+EEErveqAABG5kbMai8OcDMLRwZIsAiBjbI6FaYJG/Db4PqBWAVzGc0q90b2rAwrJuB6U4TjMEcFOKrCxUG5gzsDZnlTY8LaqdBmF67hyeVcVkAPPWTSkCcfE/ph2wypXLfW+4RPNSYEHrcD9oPQ0IO55/gXISczbwkDnCd8v8NH8MMO7clrt1b2vAjtW6LpwuT2bAWChKRzZSbLWxypNQStnxaAG1fXT7+roAwrJ95PF3qfQIgRdEK/Lzq9hpMJ00cmX/CcuNTUAr7PgbLEceC+MLmvQWHIC1N++imiwGD+mOqdCnvJ/yn55h/ABOyUvW71jiuwAAAABJRU5ErkJggg==";

  const img$I = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAFVBMVEXDgQLHhRDFhArMjSXJiBf79OrftnTxtEXPAAAABXRSTlMJWzTvj1T00L0AAADKSURBVCjPXVLBEcQgCHTsAMcClA5ujPf3kkkDDmkgsf8WTuMoJPhyXWBhVaqHq0eE1hrRSajeEbUgoAdAwdDehgRM0Qg7nclwhrdrOT5mlm0ZgS4Yd9cyQskwGWgj5ZITDoZvQKyAniW+dFaGm01CDarAQHw8Q6QFmBGJ6FgMM9ZCTanjLlXFkngWtFvMGwwZTekN8Cj6BgzvA6vUnAxvTHVAyX28GAgxc5O7TQPk1n3M5mGL3y8jjXJof/g27u2uKNnNfr7f/6HHH/m8KHZkbge7AAAAAElFTkSuQmCC";

  const img$J = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXCgADFgwnLih/IhxbHhhLKih3+/PbPkzDbrmXpz6J4+T4lAAAABnRSTlMFMeyDYMbKClBvAAABEElEQVQoz52RQW6DMBBF4Qa25BNMlUK3ta2uLdwLhEbJuosBtkRBzRYpVN12QdLbdmYMlbqq1A+y+M9fZvhk2b+llPrtklaf66TF51ppbYTk4jNtYnTORa1VCuhoRQuhuN1B0cPOBjlGm2r/MSN2t5MLAqKfUNTWkYF53tP+7Ysyp5dAIB6uJXYAM47nSyRQDS0MOJbYwNQ4An5uocTXexxh6moCj7RVYDNgT8E7Ak8EYAVHSbRrYpKEn/F9ws8HbN9QzqgGHqoveJW3VAcecrPlcS8MjD/TjNYWM15rnlRXHja1tX4LtVu+lqogWetCSH2QkzVIh9ywWe/UO7dLF3W9tJ7+BT/kK+F/pH78H/oGf4RR+qk6k30AAAAASUVORK5CYII=";

  const img$K = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXDgADGhQ3IhxTEggbMjSbKiRz///3br2br0ajz5MuCASU7AAAABnRSTlMLTIwo+Mk2bk1gAAABQElEQVQoz22RQWrDMBREBTrBt+gBJCzoUkI3MHZib40EOUCxlWUhxDlAMT1AcJvbdr7cQBed3X9Io9EfIf5VIE+kVHDPWVFljCYKsszS8wyRDzy7oKrYQp0mxSR4susEzUYrBYAL9cYgj4YUO1TGHpfltuYuJS2kJNuxQzvk9vb5zjdO3w/o0ufr9KUBqgMbTG89bBsSjsFj26a5nzIeLicyHDaAj1Er4cgcYB9XgI6fld4c5pTide7PjSEkVQCjSQC50cpxLoCxZsAWQhIDawsgbAQgXqz5BY6XZUwyNv0FcdlNZ3g65LIDngVIHZVtVHGbO84x6rJTXw1TXpbjyvvirauX62P/LWLCQlB97gu4ayq1qNd7XFiwLK34U4MUKaGnUorwrS4loRPn9lqf2g8IiWKpNC32qp0MRW7vWfwAWXlpx2NQa7gAAAAASUVORK5CYII=";

  const img$L = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEXOki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/////68+noy5vv27nhvH7Zq14jdYWcAAAAC3RSTlMB97mLG1JuDik73Vme4nwAAAEXSURBVDjLbZTbEoUgCEUFzQul9v9fewCboxbMND2wYtgbyDmJ5JIEv+3gXEghBIXsdMgcA7EAThcJYb6Efl8OjSKEVaBEJCL0QnxKSP7A3lrrFC1CAWrneTZAi5jA1ckbxASkhEE8PVxSok5i2poSAx56uxYir65qCU9QJ3FsnikQPS4EF1HPBpK+xCjyr/EhgDAyNH1/EeIpwo2L3p0QQ6BWUr3OJBq/2gYsWtR0DhndBjwE8VwfMSx23Y6xFx4JQAAYg9uGknaxrHUHHs85z0L5qbfnLo3duloHoSrFsm+odoG9c3EWI/kc3ssVckQZVsRb8i8gKVH0BHgUYyuMGxlHZJ9R+p9hztk+xIFomKecRitu/gx+bEMS/TST3DEAAAAASUVORK5CYII=";

  const img$M = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAANlBMVEXOki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/////r0af69OvjwIby4sfdtG8R1wV8AAAADHRSTlMB/ORzQFcvEgkgw4/raob6AAABRklEQVQ4y3VUWbKEIAwUFIxgAO9/2ZcFMri8/rFqutMh2yzLD7AAg76fANgFsAP8Qx8KFr15pmPcCDEeLwWFE71tgUGSp4LDmV7XnFJew0MByhOdvKvVpSwKeMQHina1ldKqeyhAeQrHchJK9ZRlEpAB8xx+CtDnlS1mA7LHTp9nc2m2YEFIVzOec/ArJsEWPJ4TxMJywE5PTLVMArUYOcQhuzZb8DPDqFQF/mahz4zaTuhVYrnn0EKgV/FrE7EN8fJJe8EW3Ic1XW40Eh3DWxKQMjzS763zFRFlaGqhnaoNWcC8OJV2pV6q9tpjo2YaL7X2dsq4uVAxdlavCfq8c/KCtwDGxvHK0Vjb6EWyiYliSPyFAuqV7RXY0tNSj1TzaoJe1WE2jHBbTLlK1fTr+DgPsFRR7+t9YGbTT/TjiEcqvt/+P/AHW+EZpW1hvHAAAAAASUVORK5CYII=";

  const img$N = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAANlBMVEVHcEzOki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/////69Ornx5Tv27rbr2Vmp8NpAAAADXRSTlMA82B5KTpMBQ4asJHTX6BGigAAARlJREFUOMutk0sSxCAIREdQk6gxev/LDiDmo5ndUOWKVw028Pn8JZYzfqZXjVdI0luLxsz5bbPWOnqMjAQBlHfOe++cY2QESMBCCAgAxMwEC7hYq0kpIjBBVQbAOjSllIMZIR4SAvhU9j0zo8QMHHmnyDWAHyQaEE1hoJiAWmS5f9N5aBIM9EZPRCQgcps5H50Q5F4DUjXmOAkVOWtwFyGETlxlLi9JA7ETg2OLEoQoYVKEux+NEBEhxLCHH4uOVAg2JDdL14cb8ltUx4jAp+ciYkmiAWz6+1BQLM1lUlDCk6VEFJOGHlqVjafCREk4TfUynYiaYNqL3icZhkGHvs4XwAdAG07Detnv243Yx7xfr2x9zd8PVTfqC0HvE7K51NIEAAAAAElFTkSuQmCC";

  const img$O = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAANlBMVEVHcEzOki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/r0qn9+vXy4cXivoLaq17bmTLQAAAADXRSTlMAV9b1KTdEBhwQk3G6ZK9LlQAAAXVJREFUOMttk1uWwyAMQwMONGAeYf+bHcmBtmlGp/3yjRDG3ral10fba3vICmnJqEc9pWPpYu5AYn2HAv5EvoH1PaohxhjA3IlVR9lRYGiyiPm9K34pgwEycyx/HWOclTrFF30T7/x0kLP21lqvoyyPlZ8XCFELGCBVsk5is7rLzgDnNHvpXUomwaQEjr2MEqgIQGrrIuKRgxYb67sfPrIOizIqQzBriYEA7+9PUXYIRL5SQNUzBQCc7YGzP5ExFnIHqlfr4AoK5ANE52vHxdSIheCbaCF3A9rpc8kuhpnVZcHNDLgc0BsZMgk+adSs1gcDyom71356659NBWRjYSHh11vHzyz222Chk2yxndGbWXBYPrMJ4AqBDHVa2DOn1xxdAEeIZUgBYBZhn3PwHlekUDwfAVoY8D3QyQ5BbwA0tBwp7wAI5lQDuugvMA9hM/jII/8e8SbUxrrofqTn4qW5FNwIm8TtSRzW3rlU/+z2nOzHWv4Bfv0YlPAGyFcAAAAASUVORK5CYII=";

  const img$P = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXCgADFgwfHhhHJiBjKih7QlTX//vb+/NrjwYXx3rm5z8jBAAAABnRSTlMHJluVzv1Mg2tUAAABG0lEQVQoz12S0W2DMBCG7Q04NojpBJQsEIREXwtVygDYzgI+eE9MO0AJ3raHTUyUe7H067u737/NGGMcABK2VwK+dgFAiMOTwCEVVLtCQFaVxEQhzar5lkeEgzhO8tJEhKeilvp+JeQhZJ2ccCnF5gXSN6tnKa/51gOimEf8MX/5hkB6VGic6anHKyBqEibsS+pJ/NCjxMGi/iqDFU5DpbujuzSEcL+2cmpEu7RhLDktzlINzgxl2Lze7VeiVnJzS7d/rzq1oNGtFyiPrDgrRNT9KTihpnomwdrP4ISaim+FI27EuogyQqfCDMY90ilzO4k9taySssljsCti+5hRQD5acXgI3CO5eH0tCoiziLy8r/8BwJ7/AEn++Ad6sU7Ro5RORQAAAABJRU5ErkJggg==";

  const img$Q = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXDgADGhAvEggXHhhPJiBnKih779uzRmDvoy5sMCARhAAAABnRSTlMGPh9rlchzn7W+AAAA/ElEQVQoz1VR0Y2DMAyNvIFDB7C9QS6gDoAqBjikMkHCAAe9Aa6w9jm0SaiVnzy99/xsGzCkz9Qi0fpARKwQnf9o8YwAPxyLQAXw9wfRnhnX3SFWishFKdYWF2C87j1WX2K8rItHlswQxCF+uy/7tiEQ161P74pIGJtpHn3uBEaw6bZ99LkTaJ92CkvvchhSyhDiqL0LpenWoCK0kLO195BE/KIQYHPbDso7nRyasOtMecJDs0VnXxRJmnUOi8t7kSPKPDqkqhnCtrjsmqJc4z32GUhbaZfb+lcA1aD3UywAGEaH3aOYJhduPs5BwpxWXe9j0tWpXlBFoAD9A4eoOMW051xAAAAAAElFTkSuQmCC";

  const img$R = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXDgQHGhQ3OkCvEggfJiBjHhhTIhxb+/Pfdsmvv2rkPmwvYAAAAB3RSTlMLSPImuHWUbaKwOgAAAUVJREFUKM9NkUFuwyAQRZE4wZS6+1o0sXcg1AMUEUtdkoQcIEo4gDfEW6TK8TaqFPe2nXGbOLB7+p/5n2GMqenOx9B5INwAaGH4DADACzB3ZIp4DB5mop9yKWMAuNn0OqURib8R/dwTaY5eiGmULuwVCdo8GIVIw7ZKKXVjtcCXaQrs9hVq0rAIQCb9XkRX9qkb5JFMqCh2B1deTz9ZogQtqIjOVu0JZ60EKdYyOmfrXKfxAgQ+W3dwspK27loEHJbXLG22qFp+42ADdZ8u1UW6Jto3BBy2tk9DnaWL0W8QaAj23PVd6RoKwqYgdkzpVDqqw5RByR4Bkib8t4F9HqhgXlFUznXxEi3WSZ30YvpnTX2ItB8ElEJTsYsl2l7FfTcQ0Hb++gPYCFEIsfGGPRAoQNxWqhTHPJsZIOK0dDXvmPFJx34BRWFlyy9KJm0AAAAASUVORK5CYII=";

  const img$S = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXDgQLFgwjGhQ3JiBjQlDTHhhPqz6T89+/csWrqopatAAAABnRSTlMSLla0/oFi+ExTAAABFklEQVQoz42RQW6EMAxF4QYEaQ5QM1xgEqquGwjdNjRS90QNB0CEPYyYY9dOgmZVqd7gPL6/nTjL/ow8K1LGnhH/pAMARMIumJYQglEV+5aUa8Mb+AzgunR1bYb2sYs7I4vKjUPDlfereicTBsqKVvmpPfwtgkG1zu+cqykBIya3ci5sA0nRHtOIgg5eilTirECBPoHpVyVJAHFSGPpF2CA4gdukUlLHyRF8UYu50foErzO2eCrKuh85edyiR45g40oOSqYuZXVIYY0JkiIBmqFCFwI5gt1qrUH8SKpBj4+lozes3JpuKxasLqHu/T090IojsBLe5qDILzvHCXAP1Ra65IxuxXBfcM6OUaTvucsi7TD7T/wC/iNLwGljZRcAAAAASUVORK5CYII=";

  const img$T = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXEgQLGhAvIhxTNjyrKiRz+/PX47srZql3nyZjCElo/AAAABXRSTlMTQ3/4xp1FP20AAAEaSURBVCjPjZGxkoMgFEXjHwB/wJOZ9Jo1tlFnsn0GtN8Btw6i9sSJn70Imrhb7e3u4Q4X3jsc/qfI6YD2AC96e2coxhHanTNNySvjPHwmcEzeAIo+gfgBgTgfa5WwuC0gAHKCTJ6qUqQaIw/y6sptlYs+8QCTj07zOjWyKagHYGze8NRM9T2A2Nis4cPMhwfFS8lxbMyttkZ8P+/YJyQ3jW5NO6mLB2yc2mloZC+6cAcpz+Mwa6vT0BIRZoQezrn8gvVhrM/F7EpuASDMsow7PW34i6tpZ6GU7OfLBnKpHBCWIn9HROJpSdQJRduAMq4U7wBH64yhNJy3Bd1GGBG4StGF0jXC0vQVWCIYAChGvzaF994ThP4sfPU/O7lLsqXSs2wAAAAASUVORK5CYII=";

  const img$U = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXDgQHFhArNjynHhhLJiBn+/Pj26tXpzaDbr2dYPKd7AAAABXRSTlMNO/BvpnXFv8UAAAEHSURBVCjPbZFLboQwEETxDWj5BjX8tp7mBIA0WSMZWCNBZm0Nk6yRwuTYcQQ2jpTa9VP1R11R9L+E1Z+SiOIA0K6zFsRlHXiEYn57sLcIKpsmN7VyFiELYLujdhaSafec+z5RDnCq++09H+ujhzjvn22G7eJBMWDZkD9UvC/h7AN5t1bjMcTOyDFpgxNk+NbTgHtNbi2g9YTRgwxYutfYsgM3gzVbO3MAQdc7TIopcUCV27rNnTbHFiEk5qWfdKvi/VQpr8XSry+zX/rrKKuvAUj8Q6is0hYNO0DE1dShVv7NZGfoT/8g23LTVuZ8O5WwugQ52FyYg6SEJMkqDDMmFUYZieiM9gfzsjzPB0egywAAAABJRU5ErkJggg==";

  const img$V = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXEgQPGhQ3IhxXKiRzJiRv//fvQljfkwYnw3sBQ2cGoAAAABXRSTlMQSITbucpmRUEAAAD6SURBVCjPdZFRjoIwEIbhBp1mL9DaeADG4LO1ES8wyrNo4HkRTrBwbqfWpmCy80S/tB8z/2TZP5VnYnUWAGJFgGsBcgBpFOQLIDftb7rCZ9PRDSABXU51oSLxDx40W52A3tO1ce4QLHzhOFC/O7bPCNh4QWzpGXoBeZrqBll7UwH8sBGxo7kIWtiyEUuqG2fsG1TUIw40svbvDc7+k66Ie9Z6YKwrJ+JXA7cf+tp0QXs5BCC3n//elQhhVTQi+nFiqxVreZxdaIyvGOfY2OsYEYD24xQxxNwHwlqdggduf7ZqGWo1Fosza6WFlPFnMbDaJJP1ckX2texUL9PyPgAd3K9GAAAAAElFTkSuQmCC";

  const img$W = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAGFBMVEXDgQHGhAvNkCvHhhPKiRv+/Pnr0afcsWqVlTIrAAAABXRSTlMKPPV3uCTtPL0AAADbSURBVCjPdZJBbsQgDEXjG2DREzgDsyZwgZmMlD0SsEflBsP9S5KC06r1jif+0xdmmv4egYiCjwAoECYmgCh/XEFwxq6InDB6dbmFRuKjzkt6GDGAq7dnWrsEUJ7AdMlv0BKvSpRePQO40Q7u7wFUKlnH6jswWziGbyyBSqQwy28gXaE2kaVOZSLtGVgdiWq2vSrKLWQd3pemS/EqzgM0a826VRfQu1uV734oDmvWnwx2a6rsPKyxzBcAxpXR83xlq7wxl00hPm/86OemcLQ4gUEQ12Xv2/3nH3wBoXMu+eFyrRkAAAAASUVORK5CYII=";

  const img$X = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXEggXHhQ7CgADLiyHJiBnIhxb///rZqVv689vs06vIPuCNAAAABnRSTlMgUwTwvYpwGenwAAABRUlEQVQoz22RQW6DMBBFxz4BowZ1i3KDykQky8hYWVsB9QbGLCsiCOtKTlhHIjluZ0zaSlVHbPz4/8+MDes/Bf+BDEAIAJDfQIJAKshgASTAyiAmUcIgE8U45BYTlvAHIj3MFyJPiwTEqgh3E00QI9JKn/3JJk+LwFqrIlwMSiBAgloPj2luNwgRCEpwzl0deaQEapoeAgEfPimEAE21db4r5tAY8tAQeJzdLVeF4xBSkMOHriz1kspjbn2bE+j9hkJA4qq/EqgiYAlWMwFTln2bL+AYeq84o8nrQxLBSF104ZpSDxF46tip3nXq/MHgZaKDf3ivxsZGcMl3vMsU/CmGru6lPtMqzt32GAcbTKXH4KaB7wykwN2+rrRSyljLowO+W8SayrKA1ofXN0wxTdHGG+N3RBGfjv8TyOC35Hp5hp8zgS8D2GNVSKu6OwAAAABJRU5ErkJggg==";

  const img$Y = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXDgQPLjCLGhAvHhhLJiBfIhxb//vry4cXkw4zZqVzrxSVaAAAABnRSTlMS6zxns4s9W2+gAAABS0lEQVQoz12RMY6DMBBFkW8wWoJDF9kniC0OgHCkpGSBA9CMTZkGlJIG0dKwy213bJLNai1ZYh7f3zP+UeQXE7Si9wq1EKd3LbXW6q2hujGXSr0kTGQ1bBsUL4nQddoj2uVzlzCZUW3n3n7svkKWE1oASIvdRWRHxDGOTV01SvgT9YojwGKaeitIwmTZO4BbR5LpoDy4YQs5t7Ex612LiJFFB5AgmDxpK0Ge3N+x4gLAXbEDdN84DcPI7UHRkcStiJjQ/vKAFC4dCNiZ2g8KTrcebdLCagOQVwKp5S0c0QVQYmxS7DtIsbtQH/I8jYbGcaTwfXjXzuTzPALHMQCZP4yh8WGyfpaIqSxuPOFkEQC9cUn/yWapwqsyJa92oN7uByWeMZwnavwRV88gmNB5ui1xpV5RCUFJNZX+DZPJf1lGJ5+1+pu/Byx8/QBo4mKlUIK3OwAAAABJRU5ErkJggg==";

  const img$Z = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXDgQLMiyDFgwnIhhPGhQ7JiBj///7Yp1jr0aj479+weJPfAAAABnRSTlMQ6zBxTZ+yC7afAAAA9klEQVQoz4WRQWrDMBBFzdxgMMHNTgy6gCOb7iXlACYNuYHcLLVIbd8gvYDs3raSLJmELPJBi/k8Dcz/RREF/rFiEyOgqGwQ6ShKEGmllPDSKwJcibZtzx1+yQTUGFQtpYx/+LG6B/2aWxMMxmtngq7JKPjF/AU5Z5PxOccd+0QAP8YZP667RKjzhCPO2QBS7Y+9Y78RLwboZwPgPaHfEK8GbUZ5yESFA9rpO+UBusLO3+L6U05sP+MOJ2MbmTK9mGUYTV82bI2d11MIzIp1RTi3G91iy0ZC7kX4pSehc5mhmFgT5GqBaz9L9lA250QMHuoHYGn+ByBBWM6OBdq9AAAAAElFTkSuQmCC";

  const img$_ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXDggPNkCrFhAvHhhHIhxbKih3//vzv2rjcsGdC82CRAAAABnRSTlMN+TtgjMmNbz+wAAABBElEQVQoz1WSMY7DIBBF0dwA7Tq4tOAE60kOsDKW0kZrKW7TDG5p2LQu4r12xgZjlvLr/zcfBiGEaEA0ojgAWjelojX+VwAHRH2kQH8/h64tFHMnz8rhMFdyL4sHxvSKXMVKdpxvIYaSxVzmOtCcMWC+gk8hiMUui5MLPbNF4xgmuWKSBdYxW6hro4PHLDT/0TS0CYJWBreGIgTA2LEmqWjqYhWupnzgQckhGn0++V8Gf+5lWXCTelR27wp4d7Nyq7C372Utg7dtujBD+uBPucfapF8eyn20eRE82C3Tj4YjMxL57tgFZwJVmJ91yzCz2JbG2wszYrNgVxoYywfKP9BAXOYbKmFGZiaiu2AAAAAASUVORK5CYII=";

  const img$$ = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXCgADGhA3EggXIhxTJiBnKih39+vPPlDLdsmvpzZ9erQO/AAAABnRSTlMIQh91s95UBWEPAAABLElEQVQoz01RwZHDIAz00IGgAaADBqcC4/H9Y0+SBgT+OyT5n0kF8bV7MthJeDCjZVcSu1WVj9ZaVp8jtVb8G2IaFAct5acGYQD0TtBKiW4ywDeEKRB19A0hsgi4sO0y9tYUERGsuyC+nOWZoklwWkIar02hKKAan3ckhPNVITpEvJ7omsyqARFxQR9xRL8CDOrkbymkcIuhgQwsryGG5IfL+AX4+AXQY5zPdG0SEcNw79vnkEpTJX5wbp3rz/ibxypxWHzvXBvHo+Fl0wdenTvhXwO8/KUjyhDHKf+FMWXquK7um80QpWyHPuFks6KSNPgQEf1xMyg7dEac7W4htSUNTuZtO+1Wp9DQVqzUlIuN3sInOgqqmygotktII/ZU9vBhze2NSKY13zr8A0uQXQ2mDigiAAAAAElFTkSuQmCC";

  const img$10 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXDgADGhQ7MjCPIhxTEggbJiBj9+/fs1K3Yp1iXZpguAAAABnRSTlMLSep6JbCStOLbAAABIUlEQVQoz02RPc6DMAyGGXIBi3wHqBElK0TsiZQLtIgLMDjMGVJmhqjH/pxQWjzFj17/xG9VXUNcnsI44X65cRzSfYlwVoIEK82Zg4Uc8iMRFnqt9YgP+cltPeA0q3iTxwDZj51vMfrb0cRarWjB5NdHAQLqIfnQ+RT6DHiEVr7ztMf2ANwxBUVbtzYFOKiVR3xjCtMHjHeiDfGFXFIqnpGIAstCBpWtO9pU9IriUhQwphVR0f6KAQoYYpjnZwzoG3AF0D7PmJZumcAcoGXFfYl7fwJWzInWBqS49KBd5xYM/njKk797LP7bA3WpyOcbyqZTaVnlv2gVaWt7cOK88IjYcoE5PaqBTw48wnxNgJ5zY342sk/OXEzPxl6dL9oz/wcLFFbA7knkdgAAAABJRU5ErkJggg==";

  const img$11 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAIVBMVEXDgQPRlznFgwnHhhLGhQ7IhxbKih3JiRr//vnmxpLz5MoGxaBYAAAACHRSTlMI/C9mSYnYtzNIcjcAAAEtSURBVCjPnZG9boMwFIWR3wBVTYDJcvwCqUHZjavOVeR2RhVGdGMgzGwXtm6kmzf6lr220z+pU44nfzo+Pr6Oon9EcP0RQ/1GjCuFhP6A+1ooRgmJLozvbe8I/SJ8DxuNhCFzhPDDMm11riSTIZsXCdj6KJRS0lt4kcG86bU4NIoFRwswIensUfqMooMFbDO084v0zcvHNQV4M+18c+cyWPm02ARJBrd5AM/JGL8DygNCSp2MpkphnoOD8uJ1bEyVwVT7DKKKdmoGE8PYy/D8opuak8ng0sMVmTemWmF7DI6dBylG5NTfggDieAXb+0uw6amCdAV3goQRpmfXytY58w72sLj9BxrCCbLr0vM5xqExGggXgzGDFpKG36FMCa1xhN+/RbgSeY57El2lT6XcYC9sORNtAAAAAElFTkSuQmCC";

  const img$12 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAG1BMVEXCgADGhAzKiRrNjynHhhPEggX+/PfarWLs1K1eyuMTAAAABnRSTlMIRrL6dSOqQaTDAAABJElEQVQoz1WRQW6EMAxF2fgAVuEA40Ea1lDBbMlE6pZIzQkiGdZDlXZdpHSOXQcy0HrnJ8v/fzvL1gKLaIdsLwDz8oH2AJnFy3dhYe8HIwCLPxMGKwHHBJi8Wvri2GoFuH8Ades07mB4gkQGMKhaV+5GwEYwHkD6nAT0xdN2IcCPJDKyBEQizxX5iZIumPdal2c/1f2qG4P+EJ0D1+VmxKLyS31lHutVRoKqiufAD3brjSSXunDHS9NtEwLoOrXcNLQ5A7x9hdGPHd8FQAQVs/OuZbepgFGNd8F5ljDDtpTabeKUJnJ1jTse92Q9Rp/aSVT69crys9sjdOKzTH8AfJurJfCUDiTh8pLmS+DX503lz5qo+TylN8SLotaajs9FEmtd8QtkmFVjKtWBvwAAAABJRU5ErkJggg==";

  const img$13 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgBAMAAACBVGfHAAAAHlBMVEXDgQLIhhTGhQ7FgwnMjifKiR3//fj37NTpzqLarGGk8EoaAAAABnRSTlMMfU4x98iIBn7FAAABJUlEQVQoz6WRQW6DMBBFLfkERvEBbC4wYk4QaaCwpApS2aMx2UeE7ilR99D0uB2jREoqddW/sf30x/bMV+o/0ogID0eN3qe47TYp9M4kKWxGjEvm2tUkqDDz0Yro7dzvk1RlzhgjzDs784cRcMhrQYItcZcnyhX9kgsxtiHmLgLmcWlMfaguPETwwgOHT6JvWfgkoA10ZQ4D8zsNq4AdE5Usmoh4L8DOU07l+TxRXvZ1ojJTHImuQQroq4v/MC2PQywJF14F6PhDDkslUCpQabEM4yIXchCDtJk5S9Q0pbxSS28KxCJqil4a8CAjA/TSiJ1PtfGo77Mzu5Bv87pP070d5QKAG1HoivVWsAkwq149AjxE4HwK8CsjeIoNQD/HqPVfCf8ALMVU7ngots8AAAAASUVORK5CYII=";

  const img$14 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAM1BMVEVHcEzOki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/Oki/////u2bbivoH69OsVpiTRAAAADXRSTlMAFeSCRGEeBQwtz/uhrz6PJAAAAQpJREFUOMu9k+uuwyAMg5twyYACe/+nPTGwtUCl/TuWJk3yJzBuchwfierVhb/HqmYTkddfQzZfbe8D5H1DNoDUtpAitAPwrXWQIiAW/wXfRGaOBsRyhAgOMFxLKZXNfoTeEKyL9Z1zftfobNgAPcBxyVBh1+5YAWe+gHEbQN5OgPUkc8awAIHuz+gRTh4h+VxCSI9wcsIRJfHZQ8j8yBm4P1TGDTENIMVxh1zfAQlSLS1DqQkprjI/NTY7d2Qqc6oxP5T5L8CPkEcbNxNvz4zTzIyiehOltzAVNSbWadltJlH0PHTynWmjuuZaHrfCPW0G9o6ABNt3i2jdvrGaHnpezp/bDaRBMG/2H9U6FfX3MPZ9AAAAAElFTkSuQmCC";

  /**
   * @ignore
   */

  var JOB = {
    tank: img$z,
    gladiator: img$A,
    marauder: img$B,
    paladin: img$C,
    warrior: img$D,
    darkknight: img$E,
    gunbreaker: img$F,
    healer: img$G,
    conjurer: img$H,
    whitemage: img$I,
    scholar: img$J,
    astrologian: img$K,
    dps: img$L,
    melee: img$M,
    physicalranged: img$N,
    magicalranged: img$O,
    pugilist: img$P,
    lancer: img$Q,
    rogue: img$R,
    archer: img$S,
    thaumaturge: img$T,
    arcanist: img$U,
    monk: img$V,
    dragoon: img$W,
    ninja: img$X,
    samurai: img$Y,
    bard: img$Z,
    machinist: img$_,
    dancer: img$$,
    blackmage: img$10,
    summoner: img$11,
    redmage: img$12,
    bluemage: img$13,
    bluemagetank: img$13,
    bluemagehealer: img$13,
    libero: img$14
  };
  /**
   * @ignore
   */

  var JOB_COLOR = {
    tank: '#4494f0',
    healer: '#64aa4f',
    dps: '#c25859',
    other: '#aaaaaa'
  };
  /**■
   * @ignore
   */

  var JOB_TYPE = {
    tank: 'tank',
    gladiator: 'tank',
    marauder: 'tank',
    paladin: 'tank',
    warrior: 'tank',
    darkknight: 'tank',
    gunbreaker: 'tank',
    healer: 'healer',
    conjurer: 'healer',
    whitemage: 'healer',
    scholar: 'healer',
    astrologian: 'healer',
    dps: 'dps',
    melee: 'dps',
    physicalranged: 'dps',
    magicalranged: 'dps',
    pugilist: 'dps',
    lancer: 'dps',
    rogue: 'dps',
    archer: 'dps',
    thaumaturge: 'dps',
    arcanist: 'dps',
    monk: 'dps',
    dragoon: 'dps',
    ninja: 'dps',
    samurai: 'dps',
    bard: 'dps',
    machinist: 'dps',
    dancer: 'dps',
    blackmage: 'dps',
    summoner: 'dps',
    redmage: 'dps',
    bluemage: 'dps',
    bluemagetank: 'tank',
    bluemagehealer: 'healer',
    libero: 'other'
  };

  /**
   * @ignore
   */
  var JOB_ALIAS = {
    tank: 'tank',
    gladiator: 'gladiator',
    marauder: 'marauder',
    paladin: 'paladin',
    warrior: 'warrior',
    darkknight: 'darkknight',
    gunbreaker: 'gunbreaker',
    healer: 'healer',
    conjurer: 'conjurer',
    whitemage: 'whitemage',
    scholar: 'scholar',
    astrologian: 'astrologian',
    dps: 'dps',
    melee: 'melee',
    physicalranged: 'physicalranged',
    magicalranged: 'magicalranged',
    pugilist: 'pugilist',
    lancer: 'lancer',
    rogue: 'rogue',
    archer: 'archer',
    thaumaturge: 'thaumaturge',
    arcanist: 'arcanist',
    monk: 'monk',
    dragoon: 'dragoon',
    ninja: 'ninja',
    samurai: 'samurai',
    bard: 'bard',
    machinist: 'machinist',
    dancer: 'dancer',
    blackmage: 'blackmage',
    summoner: 'summoner',
    redmage: 'redmage',
    bluemage: 'bluemage',
    bluemagetank: 'bluemagetank',
    bluemagehealer: 'bluemagehealer',
    libero: 'libero',
    防护: 'tank',
    剑术师: 'gladiator',
    斧术师: 'marauder',
    骑士: 'paladin',
    战士: 'warrior',
    暗黑骑士: 'darkknight',
    绝枪战士: 'gunbreaker',
    治疗: 'healer',
    幻术师: 'conjurer',
    白魔法师: 'whitemage',
    学者: 'scholar',
    占星术士: 'astrologian',
    进攻: 'dps',
    近战: 'melee',
    远程物理: 'physicalranged',
    远程魔法: 'magicalranged',
    格斗家: 'pugilist',
    枪术师: 'lancer',
    双剑师: 'rogue',
    弓箭手: 'archer',
    咒术师: 'thaumaturge',
    秘术师: 'arcanist',
    武僧: 'monk',
    龙骑士: 'dragoon',
    忍者: 'ninja',
    武士: 'samurai',
    吟游诗人: 'bard',
    机工士: 'machinist',
    舞者: 'dancer',
    黑魔法师: 'blackmage',
    召唤师: 'summoner',
    赤魔法师: 'redmage',
    青魔法师: 'bluemage',
    防护青魔: 'bluemagetank',
    治疗青魔: 'bluemagehealer',
    自由人: 'libero'
  };

  /**
   * @ignore
   */

  var validator$9 = createValidator({
    job: function job(value) {
      if (!isJobAlias(value)) {
        throw new Error('job is invalid');
      }

      return true;
    },
    size: function size(value) {
      if (!isNumber(value)) {
        throw new Error('size must be a number');
      }

      return true;
    }
  });
  /**
   * 绘制 职业图标
   */

  var Player = /*#__PURE__*/function (_Layer) {
    _inherits(Player, _Layer);

    function Player() {
      var _this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Player);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Player).call(this, state));
      _this.img = new Img();
      _this.circle = new Circle();

      _this.img.on('loaded', function () {
        return _this.emit('change', []);
      });

      var theProps = proxyProps$7(_assertThisInitialized(_this), {
        job: 'archer',
        size: 5
      });
      defineImmutable(_assertThisInitialized(_this), 'props', theProps);
      merge(_this.props, props);
      return _this;
    }
    /**
     * 设置职业
     */


    _createClass(Player, [{
      key: "job",
      value: function job(value) {
        this.props.job = value;
        return this;
      }
      /**
       * 设置尺寸
       */

    }, {
      key: "size",
      value: function size(value) {
        this.props.size = value;
        return this;
      }
      /**
       * 为职业名称设别名
       *
       * 通过 `Player.setAlias('吟游诗人', '诗人')` 设置别名
       *
       * 之后则可以使用 `new Player('诗人')` 获得与`吟游诗人`同样的图标
       *
       * @param name 中英文官方名称 / 已设置成功的别名
       * @param alias 别名
       */

    }, {
      key: "_clone",
      value: function _clone() {
        return new Player(deepClone(this.state), deepClone(this.props));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {
        if (!this.props.job) return;
        var img = this.img,
            circle = this.circle;
        var strokeWidth = this.state.strokeWidth;
        var _this$props = this.props,
            job = _this$props.job,
            size = _this$props.size;
        var unmapping = utils.unmapping;
        var jobType = JOB_TYPE[job];
        var jobColor = JOB_COLOR[jobType];
        circle.stroke(jobColor);
        circle.fill("".concat(jobColor, "aa"));
        circle.strokeWidth(strokeWidth);
        circle.size(size / 2);
        circle.render(ctx, utils);
        img.src(JOB[job] || null);
        img.size(size - unmapping(strokeWidth * 2));
        img.render(ctx, utils);
      }
    }], [{
      key: "setAlias",
      value: function setAlias$1(name, alias) {
        setAlias(JOB_ALIAS, name, alias);
      }
    }]);

    return Player;
  }(Layer);

  function proxyProps$7(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue, target) {
      if (!validator$9(key, newValue, oldValue)) return;

      if (key === 'job') {
        target[key] = newValue = JOB_ALIAS[newValue];
      }

      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }
  /**
   * @ignore
   */


  function isJobAlias(value) {
    return value in JOB_ALIAS;
  }

  /**
   * @ignore
   */

  var validator$a = createValidator({
    size: function size(value) {
      if (!isNumber(value)) {
        throw new Error('size must be a number');
      }

      return true;
    }
  });
  /**
   * 基础图形类
   *
   * 比如 [Monster] 可能只需要一个 `props.size`。
   * 则可直接继承这个类，重写 _render 即可
   */

  var Simple = /*#__PURE__*/function (_Layer) {
    _inherits(Simple, _Layer);

    function Simple() {
      var _this;

      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Simple);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Simple).call(this, state));
      var theProps = proxyProps$8(_assertThisInitialized(_this), {
        size: 10
      });
      defineImmutable(_assertThisInitialized(_this), 'props', theProps);
      merge(_this.props, props);
      return _this;
    }
    /**
     * 设置尺寸
     */


    _createClass(Simple, [{
      key: "size",
      value: function size(value) {
        this.props.size = value;
        return this;
      }
    }, {
      key: "_clone",
      value: function _clone() {
        return new Simple(deepClone(this.state), deepClone(this.props));
      }
    }]);

    return Simple;
  }(Layer);

  function proxyProps$8(that, initialValue) {
    return proxy(initialValue, function (key, oldValue, newValue, target) {
      if (!validator$a(key, newValue, oldValue)) return;
      that.emit(key, [newValue]);
      that.emit('change', []);
    });
  }

  /**
   * 绘制目标圈
   *
   * 即选中怪时可以分辨面向和侧背的圈
   */

  var Monster = /*#__PURE__*/function (_Simple) {
    _inherits(Monster, _Simple);

    function Monster() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Monster);

      return _possibleConstructorReturn(this, _getPrototypeOf(Monster).call(this, Object.assign({
        fill: '#ffcdbf60',
        stroke: '#ffcdbf'
      }, state), Object.assign({
        size: 15
      }, props)));
    }

    _createClass(Monster, [{
      key: "_clone",
      value: function _clone() {
        return new Monster(deepClone(this.state), deepClone(this.props));
      }
    }, {
      key: "_render",
      value: function _render(ctx, utils) {
        var strokeWidth = this.state.strokeWidth;
        var size = this.props.size;
        var mapping = utils.mapping;
        ctx.rotate(Math.PI * 0.75);
        var radius = mapping(size / 2);
        var smallRadius = (radius - strokeWidth * 1.5) * 0.85;
        /* 填充 */

        ctx.beginPath();
        ctx.arc(0, 0, smallRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.lineCap = 'round';
        /* 大圈 */

        ctx.lineWidth = strokeWidth * 2;
        ctx.arc(0, 0, radius, 0, Math.PI * 1.5);
        ctx.stroke();
        ctx.beginPath();
        /* 小圈 */

        ctx.lineWidth = strokeWidth;
        ctx.arc(0, 0, smallRadius, 0, Math.PI * 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.rotate(-Math.PI * 0.75);
        /* 正面 */

        var angle = Math.PI * 0.09;

        var _sin = radius * Math.sin(angle);

        var _cos = radius * Math.cos(angle);

        ctx.fillStyle = ctx.strokeStyle;
        ctx.lineTo(-_sin, -_cos);
        ctx.quadraticCurveTo(0, -radius * 1.5, _sin, -_cos);
        ctx.quadraticCurveTo(0, -radius, -_sin, -_cos);
        ctx.stroke();
        ctx.fill();
      }
    }]);

    return Monster;
  }(Simple);

  exports.Circle = Circle;
  exports.Img = Img;
  exports.Layer = Layer;
  exports.Line = Line;
  exports.Mark = Mark;
  exports.Monster = Monster;
  exports.Player = Player;
  exports.Rect = Rect;
  exports.Sketch = Sketch;
  exports.Text = Text;
  exports.Waymark = Waymark;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
