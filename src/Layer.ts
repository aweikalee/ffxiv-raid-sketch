import { ISketchUtils } from './Sketch'
import {
    Subscribe,
    IKey,
    proxy,
    rotateVector,
    rotationAngleY,
} from './utils/index'
import * as valid from './utils/vaildate'

export interface ILayerState {
    /**
     * 相对坐标 x
     *
     * 单位是 [[Sketch]] 实例的 `unit` 值
     */
    x: number

    /**
     * 相对坐标 y
     *
     * 单位是 [[Sketch]] 实例的 `unit` 值
     */
    y: number

    /**
     * 相对旋转角度
     *
     * 用的是角度的数值，不是弧度
     */
    rotate: number

    /**
     * 横向放大倍率
     */
    scaleX: number

    /**
     * 纵向放大倍率
     */
    scaleY: number

    /**
     * 不透明度
     */
    opacity: number

    /**
     * 填充颜色
     */
    fill: CanvasFillStrokeStyles['fillStyle']

    /**
     * 描边颜色
     */
    stroke: CanvasFillStrokeStyles['strokeStyle']

    /**
     * 描边宽度
     */
    strokeWidth: CanvasPathDrawingStyles['lineWidth']

    /**
     * 可见
     */
    visible: boolean
}

export interface ILayerEvent {
    render: (ctx: CanvasRenderingContext2D, utils: ISketchUtils) => void
    rendered: () => void
    change: () => void
    parent: (value: Layer<any>) => void
    children: (value: Layer<any>[]) => void
    clone: (value: Layer<any>) => void

    /* state */
    x: (x: ILayerState['x']) => void
    y: (y: ILayerState['y']) => void
    opacity: (opacity: ILayerState['opacity']) => void
    rotate: (rotate: ILayerState['rotate']) => void
    scaleX: (x: ILayerState['scaleX']) => void
    scaleY: (y: ILayerState['scaleY']) => void
    stroke: (stroke: ILayerState['stroke']) => void
    strokeWidth: (strokeWidth: ILayerState['strokeWidth']) => void
    fill: (fill: ILayerState['fill']) => void
    visible: (visible: ILayerState['visible']) => void
}

const validator = valid.createValidator<ILayerState>({
    x(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Layer.state.x must be a number')
        }

        return value
    },
    y(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Layer.state.y must be a number')
        }
        return value
    },
    rotate(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Layer.state.rotate must be a number')
        }

        return value
    },
    scaleX(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Layer.state.scaleX must be a number')
        }

        return value
    },
    scaleY(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Layer.state.scaleY must be a number')
        }

        return value
    },
    opacity(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Layer.state.opacity must be a number')
        }

        return value
    },
    fill(value) {
        if (
            !(
                valid.isString(value) ||
                valid.isCanvasGradient(value) ||
                valid.isCanvasPattern(value)
            )
        ) {
            throw new Error(
                'Layer.state.fill must be a string/CanvasGradient/CanvasPattern'
            )
        }

        return value
    },
    stroke(value) {
        if (
            !(
                valid.isString(value) ||
                valid.isCanvasGradient(value) ||
                valid.isCanvasPattern(value)
            )
        ) {
            throw new Error(
                'Layer.state.stroke must be a string/CanvasPattern/CanvasPattern'
            )
        }

        return value
    },
    strokeWidth(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Layer.state.strokeWidth must be a number')
        }

        return value
    },
    visible(value) {
        if (!valid.isBoolean(value)) {
            throw new Error(`Layer.state.visible must be a boolean`)
        }

        return value
    },
})

/**
 * 图层
 *
 * 基础类，其他形状、图形类都是继承自 [[Layer]]
 */
export default class Layer<E extends ILayerEvent = ILayerEvent> {
    state: ILayerState

    protected subscribe = new Subscribe<E>()

    private _parent: { value: Layer<any> | null }
    get parent() {
        return this._parent.value
    }
    set parent(value) {
        this._parent.value = value
    }

    private _children: { value: Layer<any>[] }
    get children() {
        return this._children.value
    }
    set children(value) {
        this._children.value = value
    }

    constructor(state: Partial<ILayerState> = {}) {
        this.state = proxy<ILayerState>(
            {
                x: 0,
                y: 0,
                rotate: 0,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                fill: '#000000',
                stroke: '#000000',
                strokeWidth: 2,
                visible: true,
            },
            (key, oldValue, newValue, target) => {
                validator(key, newValue, oldValue).then(
                    (value) => {
                        this.emit<ILayerEvent>(key, [value as any])
                        this.emit<ILayerEvent>('change', [])
                    },
                    (err) => {
                        target[key] = oldValue
                        throw err
                    }
                )
            }
        )
        Object.assign(this.state, state)
        // mergeOptions(this.state, state)

        let onParentChange: ILayerEvent['change']
        this._parent = proxy<{ value: Layer<any> | null }>(
            { value: null },
            (key, oldValue, newValue, target) => {
                if (key !== 'value') return

                if (!(newValue instanceof Layer || newValue === null)) {
                    target[key] = oldValue
                    throw new Error(`Layer.parent must inherit Class Layer`)
                }

                // 从旧的父图层中移除
                if (oldValue !== null) {
                    const index = oldValue.children.indexOf(this)
                    if (index !== -1) {
                        oldValue.children.splice(index, 1)
                    }
                    this.off<ILayerEvent>('change', onParentChange)
                }

                // 添加到新的父图层
                if (newValue !== null) {
                    newValue.children.push(this)
                    onParentChange = () => newValue.emit('change', [])
                    this.on<ILayerEvent>('change', onParentChange)
                }

                this.emit<ILayerEvent>('parent', [this.parent])
                this.emit<ILayerEvent>('change', [])
            }
        )

        this._children = proxy<{ value: Layer<any>[] }>(
            { value: [] },
            (key, oldValue, newValue, target) => {
                if (key !== 'value') return

                if (
                    !Array.isArray(newValue) ||
                    newValue.some((v) => !(v instanceof Layer))
                ) {
                    target[key] = oldValue
                    throw new Error(`Layer.children must be Layer[]`)
                }

                target[key] = proxy<Layer<any>[]>(
                    newValue,
                    (key, oldValue, newValue, target) => {
                        if (key >= 0 && !(newValue instanceof Layer)) {
                            if (oldValue) {
                                target[key] = oldValue
                            } else {
                                target.splice(Number(key), 1)
                            }
                            throw new Error(
                                `Layer.children must inherit Class Layer`
                            )
                        }

                        this.emit<ILayerEvent>('children', [this.children])
                        this.emit<ILayerEvent>('change', [])
                    }
                )

                this.emit<ILayerEvent>('children', [this.children])
                this.emit<ILayerEvent>('change', [])
            }
        )
    }

    /**
     * 添加子图层
     */
    add(layer: Layer<any>) {
        if (!(layer instanceof Layer)) return this
        layer.parent = this
        return this
    }

    /**
     * 添加到父图层
     */
    addTo(layer: Layer<any>) {
        if (!(layer instanceof Layer)) return this
        this.parent = layer
        return this
    }

    /**
     * 移除子图层
     */
    remove(layer: Layer<any>) {
        if (!(layer instanceof Layer)) return this
        layer.parent = null
        return this
    }

    /**
     * 移除全部子图层
     */
    removeAll() {
        this.children.forEach((child) => this.remove(child))
        return this
    }

    /**
     * 克隆
     */
    clone() {
        const clone = this._clone()
        // clone.state = cloneDeep(this.state)
        this.children.forEach((v) => {
            clone.add(v.clone())
        })
        this.emit<ILayerEvent>('clone', [clone])
        return clone
    }

    /**
     * 渲染
     */
    render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        if (!this.state.visible) return

        const {
            x,
            y,
            rotate,
            scaleX,
            scaleY,
            opacity,
            fill,
            stroke,
            strokeWidth,
        } = this.state
        const { mapping } = utils

        ctx.save()

        ctx.translate(mapping(x), mapping(y))
        ctx.scale(scaleX, scaleY)
        ctx.rotate((rotate * Math.PI) / 180)
        ctx.globalAlpha *= opacity

        ctx.fillStyle = fill
        ctx.strokeStyle = stroke
        ctx.lineWidth = strokeWidth

        try {
            this._render(ctx, utils)
        } catch (err) {
            console.error(err)
        }

        this.children.forEach((child) => child.render(ctx, utils))

        ctx.restore()

        this.emit<ILayerEvent>('rendered', [])
    }

    /**
     * 获得当前图层 在画布中的状态
     *
     * x, y返回的是相对坐标
     */
    getLayerStatus() {
        let { x, y, rotate, scaleX, scaleY, opacity } = this.state
        let parent = this.parent
        while (parent) {
            const {
                x: _x,
                y: _y,
                rotate: _rotate,
                scaleX: _scaleX,
                scaleY: _scaleY,
                opacity: _opacity,
            } = parent.state

            // 旋转
            ;[x, y] = rotateVector(x, y, (_rotate * Math.PI) / 180)
            rotate += _rotate

            // 缩放
            x *= _scaleX
            y *= _scaleY
            scaleX *= scaleX
            scaleY *= scaleY

            // 位移
            x += _x
            y += _y

            // 透明度
            opacity *= _opacity

            parent = parent.parent
        }

        return {
            x,
            y,
            rotate,
            scaleX,
            scaleY,
            opacity,
        }
    }

    /**
     * 将原始北面转向目标图层
     * @param layer 目标图层
     * @param offset 偏移角度
     */
    turnTo(layer: Layer, offset: number = 0) {
        if (!(layer instanceof Layer)) return this
        const p1 = this.getLayerStatus()
        const p2 = layer.getLayerStatus()
        const rotate =
            (rotationAngleY(p2.x - p1.x, p2.y - p1.y) / Math.PI) * 180

        this.rotate(rotate - p1.rotate + this.state.rotate + offset)
        return this
    }

    /**
     * 设置坐标
     */
    xy(x: ILayerState['x'], y: ILayerState['y']) {
        this.state.x = x
        this.state.y = y
        return this
    }

    /**
     * 设置透明度
     */
    opacity(value: ILayerState['opacity']) {
        this.state.opacity = value
        return this
    }

    /**
     * 设置旋转角度
     */
    rotate(value: ILayerState['rotate']) {
        this.state.rotate = value
        return this
    }

    /**
     * 设置缩放
     */
    scale(x: ILayerState['scaleX'], y?: ILayerState['scaleY']) {
        this.state.scaleX = x
        this.state.scaleY = y !== undefined ? y : x
        return this
    }

    /**
     * 设置描边颜色
     */
    stroke(value: ILayerState['stroke']) {
        this.state.stroke = value
        return this
    }

    /**
     * 设置描边宽度
     */
    strokeWidth(value: ILayerState['strokeWidth']) {
        this.state.strokeWidth = value
        return this
    }

    /**
     * 设置填充颜色
     */
    fill(value: ILayerState['fill']) {
        this.state.fill = value
        return this
    }

    /**
     * 设置为可见
     */
    show() {
        this.state.visible = true
        return this
    }

    /**
     * 设置为不可见
     */
    hide() {
        this.state.visible = false
        return this
    }

    /**
     * 绑定事件监听
     */
    on<T extends {} = E, K extends IKey<T> = IKey<T>>(type: K, event: T[K]) {
        this.subscribe.on(type as any, event)
        return this
    }

    /**
     * 绑定一次性事件监听
     */
    once<T extends {} = E, K extends IKey<T> = IKey<T>>(type: K, event: T[K]) {
        this.subscribe.once(type as any, event)
        return this
    }

    /**
     * 取消事件监听
     */
    off<T extends {} = E, K extends IKey<T> = IKey<T>>(type: K, event: T[K]) {
        this.subscribe.off(type as any, event)
        return this
    }

    /**
     * 发起事件
     */
    emit<T extends {} = E, K extends IKey<T> = IKey<T>>(
        type: K,
        args: Parameters<T[K]>
    ) {
        this.subscribe.emit(type as any, args)
        return this
    }

    /**
     * 通知变更
     */
    protected onChange() {
        this.emit<ILayerEvent>('change', [])
        return this
    }

    protected _clone() {
        return new Layer() as Layer<any>
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {}
}
