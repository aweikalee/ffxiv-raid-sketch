import Sketch, { ISketchUtils } from './Sketch'
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
     * 相对放大倍率
     */
    scale: number

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

/**
 * 图层
 *
 * 基础类，其他形状、图形类都是继承自 [[Layer]]
 */
export default class Layer {
    /**
     * 字段详情：[[ILayerProps]]
     */
    props: ILayerProps = {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        fill: '#000000',
        stroke: '#000000',
        strokeWidth: 2,
        visible: true
    }

    protected subscribe = new Subscribe()

    private layers: Layer[] = []

    constructor(props: Partial<ILayerProps> = {}) {
        mergeOptions(this.props, props)
    }

    /**
     * 添加子图层
     */
    add(layer: Layer) {
        if (!(layer instanceof Layer)) return this

        const { layers } = this
        const index = layers.indexOf(layer)
        if (index !== -1) {
            layers.splice(index, 1)
        }

        layers.push(layer)

        layer.on('change', this.onChange.bind(this))
        this.onChange()
        return this
    }

    /**
     * 添加到父图层
     */
    addTo(layer: Layer | Sketch) {
        try {
            layer.add(this)
            return this
        } catch (err) {
            return this
        }
    }

    /**
     * 移除子图层
     */
    remove(layer: Layer) {
        if (!(layer instanceof Layer)) return this

        const index = this.layers.indexOf(layer)
        if (index !== -1) {
            this.layers.splice(index, 1)
        }

        return this
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
            scale,
            opacity,
            fill,
            stroke,
            strokeWidth
        } = this.props
        const { mapping } = utils

        ctx.save()
        ctx.translate(mapping(x), mapping(y))
        ctx.rotate((rotate * Math.PI) / 180)
        ctx.scale(scale, scale)
        ctx.globalAlpha *= opacity

        ctx.fillStyle = fill
        ctx.strokeStyle = stroke
        ctx.lineWidth = strokeWidth

        this._render(ctx, utils)

        this.layers.forEach(layer => {
            layer.render(ctx, utils)
        })

        ctx.restore()
    }

    /**
     * 设置坐标
     */
    xy(x: ILayerProps['x'], y: ILayerProps['y']) {
        this.props.x = x || this.props.x
        this.props.y = y || this.props.y
        return this.onChange()
    }

    /**
     * 设置透明度
     */
    opacity(value: ILayerProps['opacity']) {
        if (typeof value !== 'number') return this
        this.props.opacity = Math.max(0, Math.min(value, 1))
        return this.onChange()
    }

    /**
     * 设置旋转角度
     */
    rotate(value: ILayerProps['rotate']) {
        if (!value) return this
        this.props.rotate = value
        return this.onChange()
    }

    /**
     * 设置缩放
     */
    scale(value: ILayerProps['scale']) {
        if (!value) return this
        this.props.scale = value
        return this.onChange()
    }

    /**
     * 设置描边颜色
     */
    stroke(value: ILayerProps['stroke']) {
        if (!value) return this
        this.props.stroke = value
        return this.onChange()
    }

    /**
     * 设置描边宽度
     */
    strokeWidth(value: ILayerProps['strokeWidth']) {
        if (!value) return this
        this.props.strokeWidth = value
        return this.onChange()
    }

    /**
     * 设置填充颜色
     */
    fill(value: ILayerProps['fill']) {
        if (!value) return this
        this.props.fill = value
        return this.onChange()
    }

    /**
     * 设置为可见
     */
    show() {
        this.props.visible = true
        return this.onChange()
    }

    /**
     * 设置为不可见
     */
    hide() {
        this.props.visible = false
        return this.onChange()
    }

    /**
     * 绑定事件监听
     */
    on(type: string, event: Function) {
        this.subscribe.on(type, event)
        return this
    }

    /**
     * 取消事件监听
     */
    off(type: string, event: Function) {
        this.subscribe.off(type, event)
        return this
    }

    /**
     * 发起事件
     */
    emit(type: string, args?: unknown[]) {
        this.subscribe.emit(type, args)
        return this
    }

    /**
     * 克隆
     */
    clone() {
        const clone = this._clone()
        clone.props = cloneDeep(this.props)
        this.layers.forEach(v => {
            clone.add(v.clone())
        })
        return clone
    }

    /**
     * 通知变更
     */
    protected onChange() {
        this.emit('change')
        return this
    }

    protected _clone() {
        return new Layer()
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {}
}
