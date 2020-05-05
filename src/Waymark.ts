import Layer, { ILayerEvent } from './Layer'
import { ISketchUtils } from './Sketch'
import { WAYMARK, WAYMARK_COLOR } from './img/waymark/map'
import { WAYMARK_ALIAS, IWaymarkAlias } from './alias/waymark'
import { setAlias } from './alias/utils'
import Img from './Img'
import Circle from './Circle'
import Rect from './Rect'
import { cloneDeep } from './utils'

export interface IWaymarkProps {
    /**
     * 场景标记类型（名称）
     */
    type: IWaymarkAlias | null

    /**
     * 显示尺寸
     */
    size: number
}

export interface IWaymarkEvent extends ILayerEvent {
    type: (type: IWaymarkProps['type']) => void
    size: (size: IWaymarkProps['size']) => void
}

/**
 * 绘制 `场景标记`
 */
export default class Waymark extends Layer<IWaymarkEvent> {
    /**
     * 字段详情：[[IWaymarkProps]]
     */
    waymarkProps: IWaymarkProps = {
        type: null,
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
        if (!(value in WAYMARK_ALIAS)) return this
        const _value = WAYMARK_ALIAS[value]
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
    static setAlias(name: IWaymarkAlias, alias: string) {
        setAlias(WAYMARK_ALIAS, name, alias)
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
