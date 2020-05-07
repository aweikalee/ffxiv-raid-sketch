import { ISketchUtils } from './Sketch'
import {
    Subscribe,
    IKey,
    proxy,
    rotateVector,
    rotationAngleY,
} from './utils/index'

export interface ILayerProps {
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
    unbindParent: () => void

    add: (layer: Layer) => void
    addTo: (layer: Layer) => void
    remove: (layer: Layer) => void
    removeAll: () => void
    clone: (clone: Layer) => void

    x: (x: ILayerProps['x']) => void
    y: (y: ILayerProps['y']) => void
    opacity: (opacity: ILayerProps['opacity']) => void
    rotate: (rotate: ILayerProps['rotate']) => void
    scaleX: (x: ILayerProps['scaleX']) => void
    scaleY: (y: ILayerProps['scaleY']) => void
    stroke: (stroke: ILayerProps['stroke']) => void
    strokeWidth: (strokeWidth: ILayerProps['strokeWidth']) => void
    fill: (fill: ILayerProps['fill']) => void
    visible: (visible: ILayerProps['visible']) => void
}

/**
 * 图层
 *
 * 基础类，其他形状、图形类都是继承自 [[Layer]]
 */
export default class Layer<E extends ILayerEvent = ILayerEvent> {
    props: ILayerProps

    protected subscribe = new Subscribe<E>()

    children: Layer<any>[] = []

    get parent() {
        return this._parent
    }

    set parent(newParent) {
        // 发起解绑
        this.emit<ILayerEvent>('unbindParent', [])

        this._parent = newParent

        if (newParent === null) return

        const render = this.render.bind(this)
        const change = () => newParent.emit<ILayerEvent>('change', [])

        // 绑定
        newParent.children.push(this)
        newParent.on<ILayerEvent>('render', render)
        this.on<ILayerEvent>('change', change)

        // 绑定新的解绑事件
        this.once<ILayerEvent>('unbindParent', () => {
            const index = newParent.children.indexOf(this)
            if (index !== -1) {
                newParent.children.splice(index, 1)
            }

            newParent.off('render', render)
            this.off<ILayerEvent>('change', change)
        })
    }

    private _parent: Layer<any> | null

    constructor(props: Partial<ILayerProps> = {}) {
        this.props = proxy<ILayerProps>(
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
            (key, oldValue, newValue) => {
                switch (true) {
                    case ['fill', 'stroke'].includes(key):
                        if (typeof newValue !== 'string')
                            throw new Error(
                                `Layer.props.${key} must be a number`
                            )

                        this.emit<ILayerEvent>(key, [newValue])
                        break
                    case 'visible' === key:
                        if (typeof newValue !== 'boolean')
                            throw new Error(
                                `Layer.props.${key} must be a number`
                            )

                        this.emit<ILayerEvent>(key, [newValue])
                        break
                    default:
                        if (typeof newValue !== 'number')
                            throw new Error(
                                `Layer.props.${key} must be a number`
                            )

                        this.emit<ILayerEvent>(key, [newValue])
                }

                this.emit<ILayerEvent>('change', [])
            }
        )
        Object.assign(this.props, props)
        // mergeOptions(this.props, props)
    }

    /**
     * 添加子图层
     */
    add(layer: Layer<any>) {
        if (!(layer instanceof Layer)) return this
        if (layer.parent === this) return this
        layer.parent = this
        this.emit<ILayerEvent>('add', [layer])
        return this.onChange()
    }

    /**
     * 添加到父图层
     */
    addTo(layer: Layer) {
        if (!(layer instanceof Layer)) return this
        if (layer.parent === this) return this
        this.parent = layer
        this.emit<ILayerEvent>('addTo', [layer])
        return this.onChange()
    }

    /**
     * 移除子图层
     */
    remove(layer: Layer) {
        if (!(layer instanceof Layer)) return this
        layer.parent = null
        this.emit<ILayerEvent>('remove', [layer])
        return this.onChange()
    }

    /**
     * 移除全部子图层
     */
    removeAll() {
        this.children.forEach((child) => this.remove(child))
        this.emit<ILayerEvent>('removeAll', [])
        return this.onChange()
    }

    /**
     * 克隆
     */
    clone() {
        const clone = this._clone()
        // clone.props = cloneDeep(this.props)
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
        if (!this.props.visible) return

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
        } = this.props
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

        this.emit<ILayerEvent>('render', [ctx, utils])

        ctx.restore()

        this.emit<ILayerEvent>('rendered', [])
    }

    /**
     * 获得当前图层 在画布中的状态
     *
     * x, y返回的是相对坐标
     */
    getLayerStatus() {
        let { x, y, rotate, scaleX, scaleY, opacity } = this.props
        let parent = this.parent
        while (parent) {
            const {
                x: _x,
                y: _y,
                rotate: _rotate,
                scaleX: _scaleX,
                scaleY: _scaleY,
                opacity: _opacity,
            } = parent.props

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

        this.rotate(rotate - p1.rotate + this.props.rotate + offset)
        return this
    }

    /**
     * 设置坐标
     */
    xy(x: ILayerProps['x'], y: ILayerProps['y']) {
        this.props.x = x
        this.props.y = y
        return this
    }

    /**
     * 设置透明度
     */
    opacity(value: ILayerProps['opacity']) {
        this.props.opacity = value
        return this
    }

    /**
     * 设置旋转角度
     */
    rotate(value: ILayerProps['rotate']) {
        this.props.rotate = value
        return this
    }

    /**
     * 设置缩放
     */
    scale(x: ILayerProps['scaleX'], y?: ILayerProps['scaleY']) {
        this.props.scaleX = x
        this.props.scaleY = y !== undefined ? y : x
        return this
    }

    /**
     * 设置描边颜色
     */
    stroke(value: ILayerProps['stroke']) {
        this.props.stroke = value
        return this
    }

    /**
     * 设置描边宽度
     */
    strokeWidth(value: ILayerProps['strokeWidth']) {
        this.props.strokeWidth = value
        return this
    }

    /**
     * 设置填充颜色
     */
    fill(value: ILayerProps['fill']) {
        this.props.fill = value
        return this
    }

    /**
     * 设置为可见
     */
    show() {
        this.props.visible = true
        return this
    }

    /**
     * 设置为不可见
     */
    hide() {
        this.props.visible = false
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
