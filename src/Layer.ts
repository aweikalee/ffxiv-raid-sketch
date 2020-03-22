import { ISketchUtils } from './Sketch'
import Subscribe from './Subscribe'
import { mergeOptions, cloneDeep } from './utils'

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

    xy: (x: ILayerProps['x'], y: ILayerProps['y']) => void
    opacity: (opacity: ILayerProps['opacity']) => void
    rotate: (rotate: ILayerProps['rotate']) => void
    scale: (x: ILayerProps['scaleX'], y: ILayerProps['scaleY']) => void
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
    /**
     * 字段详情：[[ILayerProps]]
     */
    props: ILayerProps = {
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
    }

    protected subscribe = new Subscribe<keyof E>()

    children: Layer<any>[] = []

    get parent() {
        return this._parent
    }

    set parent(newParent) {
        // 发起解绑
        this.emit<ILayerEvent['unbindParent']>('unbindParent')

        this._parent = newParent

        if (newParent === null) return

        const render = this.render.bind(this)
        const change = () => newParent.emit<ILayerEvent['change']>('change')

        // 绑定
        newParent.children.push(this)
        newParent.on<ILayerEvent['render']>('render', render)
        this.on<ILayerEvent['change']>('change', change)

        // 绑定新的解绑事件
        this.once<ILayerEvent['unbindParent']>('unbindParent', () => {
            const index = newParent.children.indexOf(this)
            if (index !== -1) {
                newParent.children.splice(index, 1)
            }

            newParent.off<ILayerEvent['render']>('render', render)
            this.off<ILayerEvent['change']>('change', change)
        })
    }

    private _parent: Layer<any> | null

    constructor(props: Partial<ILayerProps> = {}) {
        mergeOptions(this.props, props)
    }

    /**
     * 添加子图层
     */
    add(layer: Layer<any>) {
        if (!(layer instanceof Layer)) return this
        if (layer.parent === this) return this
        layer.parent = this
        this.emit<ILayerEvent['add']>('add', [layer])
        return this.onChange()
    }

    /**
     * 添加到父图层
     */
    addTo(layer: Layer) {
        if (!(layer instanceof Layer)) return this
        if (layer.parent === this) return this
        this.parent = layer
        this.emit<ILayerEvent['addTo']>('addTo', [layer])
        return this.onChange()
    }

    /**
     * 移除子图层
     */
    remove(layer: Layer) {
        if (!(layer instanceof Layer)) return this
        layer.parent = null
        this.emit<ILayerEvent['remove']>('remove', [layer])
        return this.onChange()
    }

    /**
     * 移除全部子图层
     */
    removeAll() {
        this.children.forEach(child => this.remove(child))
        this.emit<ILayerEvent['remove']>('removeAll')
        return this.onChange()
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
            strokeWidth
        } = this.props
        const { mapping } = utils

        ctx.save()

        ctx.translate(mapping(x), mapping(y))
        ctx.rotate((rotate * Math.PI) / 180)
        ctx.scale(scaleX, scaleY)
        ctx.globalAlpha *= opacity

        ctx.fillStyle = fill
        ctx.strokeStyle = stroke
        ctx.lineWidth = strokeWidth

        try {
            this._render(ctx, utils)
        } catch (err) {
            console.error(err)
        }

        this.emit<ILayerEvent['render']>('render', [ctx, utils])

        ctx.restore()

        this.emit<ILayerEvent['rendered']>('rendered')
    }

    /**
     * 设置坐标
     */
    xy(x: ILayerProps['x'], y: ILayerProps['y']) {
        if (typeof x !== 'number' || typeof y !== 'number') return this
        if (this.props.x === x && this.props.y === y) return this

        this.props.x = x
        this.props.y = y

        this.emit<ILayerEvent['xy']>('xy', [x, y])
        return this.onChange()
    }

    /**
     * 设置透明度
     */
    opacity(value: ILayerProps['opacity']) {
        if (typeof value !== 'number') return this
        const opacity = Math.max(0, Math.min(value, 1))
        if (this.props.opacity === opacity) return this

        this.props.opacity = opacity

        this.emit<ILayerEvent['opacity']>('opacity', [opacity])
        return this.onChange()
    }

    /**
     * 设置旋转角度
     */
    rotate(value: ILayerProps['rotate']) {
        if (typeof value !== 'number') return this
        if (this.props.rotate === value) return this
        this.props.rotate = value

        this.emit<ILayerEvent['rotate']>('rotate', [value])
        return this.onChange()
    }

    /**
     * 设置缩放
     */
    scale(x: ILayerProps['scaleX'], y?: ILayerProps['scaleY']) {
        if (typeof x !== 'number') return this
        const _y = typeof y === 'number' ? y : x
        if (this.props.scaleX === x && this.props.scaleY === _y) return this

        this.props.scaleX = x
        this.props.scaleY = _y
        this.emit<ILayerEvent['scale']>('scale', [x, _y])
        return this.onChange()
    }

    /**
     * 设置描边颜色
     */
    stroke(value: ILayerProps['stroke']) {
        if (!value) return this
        if (this.props.stroke === value) return this
        this.props.stroke = value

        this.emit<ILayerEvent['stroke']>('stroke', [value])
        return this.onChange()
    }

    /**
     * 设置描边宽度
     */
    strokeWidth(value: ILayerProps['strokeWidth']) {
        if (!value) return this
        if (this.props.strokeWidth === value) return this
        this.props.strokeWidth = value

        this.emit<ILayerEvent['strokeWidth']>('strokeWidth', [value])
        return this.onChange()
    }

    /**
     * 设置填充颜色
     */
    fill(value: ILayerProps['fill']) {
        if (!value) return this
        if (this.props.fill === value) return this
        this.props.fill = value

        this.emit<ILayerEvent['fill']>('fill', [value])
        return this.onChange()
    }

    /**
     * 设置为可见
     */
    show() {
        if (this.props.visible) return this
        this.props.visible = true
        this.emit<ILayerEvent['visible']>('visible', [true])
        return this.onChange()
    }

    /**
     * 设置为不可见
     */
    hide() {
        if (!this.props.visible) return this
        this.props.visible = false
        this.emit<ILayerEvent['visible']>('visible', [false])
        return this.onChange()
    }

    /**
     * 绑定事件监听
     */
    on<F extends (...args: any[]) => void>(type: keyof E, event: F) {
        this.subscribe.on<F>(type, event)
        return this
    }

    /**
     * 绑定一次性事件监听
     */
    once<F extends (...args: any[]) => void>(type: keyof E, event: F) {
        this.subscribe.once<F>(type, event)
        return this
    }

    /**
     * 取消事件监听
     */
    off<F extends (...args: any[]) => void>(type: keyof E, event: F) {
        this.subscribe.off<F>(type, event)
        return this
    }

    /**
     * 发起事件
     */
    emit<F extends (...args: any[]) => void>(
        type: keyof E,
        args?: Parameters<F>
    ) {
        this.subscribe.emit<F>(type, args)
        return this
    }

    /**
     * 克隆
     */
    clone() {
        const clone = this._clone()
        clone.props = cloneDeep(this.props)
        this.children.forEach(v => {
            clone.add(v.clone())
        })
        this.emit<ILayerEvent['clone']>('clone', [clone])
        return clone
    }

    /**
     * 通知变更
     */
    protected onChange() {
        this.emit<ILayerEvent['change']>('change')
        return this
    }

    protected _clone() {
        return new Layer() as Layer<any>
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {}
}
