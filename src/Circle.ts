import Layer, { ILayerEvent } from './Layer'
import { ISketchUtils } from './Sketch'
// import { cloneDeep } from './utils'

export interface ICircleProps {
    /**
     * 半径
     */
    radius: number

    /**
     * 张开角度
     *
     * 取值范围 [0, 360]
     */
    angle: number

    /**
     * 使用弧形
     *
     * 值为 `true` 时，将不会渲染扇形两条直线的边。
     */
    arc: boolean

    /**
     * 线段样式
     */
    dash: number[] | null
}

export interface ICircleEvent extends ILayerEvent {
    size: (radius: ICircleProps['radius']) => void
    angle: (angle: ICircleProps['angle']) => void
    arc: (arc: ICircleProps['arc']) => void
    dash: (dash: ICircleProps['dash']) => void
}

/**
 * 可绘制 圆形、扇形、弧形
 */
export default class Circle extends Layer<ICircleEvent> {
    /**
     * 字段详情：[[ICircleProps]]
     */
    circleProps: ICircleProps = {
        radius: 30,
        angle: 360,
        arc: false,
        dash: null
    }

    constructor() {
        super({
            fill: '#c79a667F',
            stroke: '#c79a66'
        })
    }

    /**
     * 设置半径
     * @param value [[ICircleProps]]['radius']
     */
    size(value: ICircleProps['radius']) {
        if (typeof value !== 'number') return this
        if (this.circleProps.radius === value) return this

        this.circleProps.radius = value
        this.emit('size', [value])
        return this.onChange()
    }

    /**
     * 设置张开角度
     * @param value
     */
    angle(value: ICircleProps['angle']) {
        if (typeof value !== 'number') return this
        const _value = Math.max(0, Math.min(value, 360))
        if (this.circleProps.angle === _value) return this

        this.circleProps.angle = _value
        this.emit('angle', [_value])
        return this.onChange()
    }

    /**
     * 设置弧形
     * @param value 值为 `true` 时，将不会渲染扇形两条直线的边。
     */
    arc(value: ICircleProps['arc']) {
        if (typeof value !== 'boolean') return this
        if (this.circleProps.arc === value) return this

        this.circleProps.arc = value
        this.emit('arc', [value])
        return this.onChange()
    }

    /**
     * 设置线段样式
     */
    dash(value: ICircleProps['dash']) {
        if (!Array.isArray(value)) return this
        if (value.some(v => typeof v !== 'number')) return this

        this.circleProps.dash = value
        this.emit('dash', [value])
        return this.onChange()
    }

    protected _clone() {
        const layer = new Circle()
        // layer.circleProps = cloneDeep(this.circleProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { strokeWidth } = this.props
        const { radius, angle, arc, dash } = this.circleProps
        const { mapping } = utils

        if (dash) {
            ctx.setLineDash(dash.map(v => v * strokeWidth))
        }

        const _angle = (angle * Math.PI) / 180
        ctx.rotate(-(Math.PI + _angle) / 2)

        ctx.beginPath()
        ctx.arc(0, 0, mapping(radius), 0, _angle)

        if (!arc) {
            if (angle !== 360) {
                ctx.lineTo(0, 0)
            }
            ctx.closePath()
        }
        ctx.fill()
        ctx.stroke()
    }
}
