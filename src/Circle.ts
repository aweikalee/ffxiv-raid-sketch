import Layer from './Layer'
import { ISketchUtils } from './Sketch'
import { cloneDeep } from './utils'

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
}

/**
 * 可绘制 圆形、扇形、弧形
 */
export default class Circle extends Layer {
    /**
     * 字段详情：[[ICircleProps]]
     */
    circleProps: ICircleProps = {
        radius: 30,
        angle: 360,
        arc: false
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
        this.circleProps.radius = value
        return this.onChange()
    }

    /**
     * 设置张开角度
     * @param value
     */
    angle(value: ICircleProps['angle']) {
        if (typeof value !== 'number') return this
        this.circleProps.angle = Math.max(0, Math.min(value, 360))
        return this.onChange()
    }

    /**
     * 设置弧形
     * @param value 值为 `true` 时，将不会渲染扇形两条直线的边。
     */
    arc(value: ICircleProps['arc']) {
        if (typeof value !== 'boolean') return this
        this.circleProps.arc = value
        return this.onChange()
    }

    protected _clone() {
        const layer = new Circle()
        layer.circleProps = cloneDeep(this.circleProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { radius, angle, arc } = this.circleProps
        const { mapping } = utils

        ctx.beginPath()
        ctx.arc(0, 0, mapping(radius), 0, (angle * Math.PI) / 180)

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
