import Layer from './Layer'
import { ISketchUtils } from './Sketch'
import { WAYMARK, WAYMARK_COLOR } from './img/waymark/map'
import Img from './Img'
import Circle from './Circle'
import Rect from './Rect'
import { cloneDeep } from './utils'

export interface IWaymarkProps {
    /**
     * 场景标记类型（名称）
     */
    type: keyof typeof WAYMARK

    /**
     * 显示尺寸
     */
    size: number
}

/**
 * 绘制 `场景标记`
 */
export default class Waymark extends Layer {
    /**
     * 字段详情：[[IWaymarkProps]]
     */
    waymarkProps: IWaymarkProps = {
        type: 'A',
        size: 5
    }
    private img = new Img()
    private circle = new Circle()
    private rect = new Rect()

    constructor(type?: IWaymarkProps['type']) {
        super()

        this.img.on('loaded', this.onChange.bind(this))

        this.type(type)
    }

    /**
     * 设置目标标记类型（名称）
     */
    type(value: IWaymarkProps['type']) {
        const _value =
            typeof value === 'string'
                ? (value.toUpperCase() as IWaymarkProps['type'])
                : value
        if (!(_value in WAYMARK)) return this
        if (this.waymarkProps.type === _value) return this

        this.waymarkProps.type = _value
        this.emit('type', [_value])
        return this.onChange()
    }

    /**
     * 设置尺寸
     */
    size(value: number) {
        if (typeof value !== 'number') return this
        if (this.waymarkProps.size === value) return this

        this.waymarkProps.size = value
        this.emit('size', [value])
        return this.onChange()
    }

    protected _clone() {
        const layer = new Waymark()
        layer.waymarkProps = cloneDeep(this.waymarkProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { img, circle, rect } = this
        const { strokeWidth } = this.props
        const { type, size } = this.waymarkProps
        const { unmapping } = utils

        const isCircle = ['A', 'B', 'C', 'D'].includes(type as any)

        if (isCircle) {
            circle.stroke(WAYMARK_COLOR[type])
            circle.fill(`${WAYMARK_COLOR[type]}36`)
            circle.strokeWidth(strokeWidth)
            circle.size(size / 2)
            circle.render(ctx, utils)
        } else {
            rect.stroke(WAYMARK_COLOR[type])
            rect.fill(`${WAYMARK_COLOR[type]}36`)
            rect.strokeWidth(strokeWidth)
            rect.size(size * 0.9)
            rect.render(ctx, utils)
        }

        img.src(WAYMARK[type])
        img.size(size - unmapping(strokeWidth * 2))
        img.render(ctx, utils)
    }
}
