import Layer, { ILayerEvent } from './Layer'
import { ISketchUtils } from './Sketch'
import { cloneDeep } from './utils'

export interface IRectProps {
    /**
     * 宽
     */
    w: number

    /**
     * 高
     */
    h: number

    /**
     * 线段样式
     */
    dash: number[] | null
}

export interface IRectEvent extends ILayerEvent {
    size: (w: IRectProps['w'], h: IRectProps['h']) => void
    dash: (dash: IRectProps['dash']) => void
}

/**
 * 绘制矩形
 */
export default class Rect extends Layer<IRectEvent> {
    /**
     * 字段详情：[[IPlayerProps]]
     */
    rectProps: IRectProps = {
        w: 30,
        h: 30,
        dash: null
    }

    constructor() {
        super({
            fill: '#c79a667F',
            stroke: '#c79a66'
        })
    }

    /**
     * 设置尺寸
     * @param w 宽
     * @param h 高
     */
    size(w: number, h?: number) {
        if (typeof w !== 'number') return this
        const _h = typeof h === 'number' ? h : w
        if (this.rectProps.w === w && this.rectProps.h === _h) return this

        this.rectProps.w = w
        this.rectProps.h = _h
        this.emit('size', [w, _h])
        return this.onChange()
    }

    /**
     * 设置线段样式
     */
    dash(value: IRectProps['dash']) {
        if (!Array.isArray(value)) return this
        if (value.some(v => typeof v !== 'number')) return this

        this.rectProps.dash = value
        this.emit('dash', [value])
        return this.onChange()
    }

    protected _clone() {
        const layer = new Rect()
        layer.rectProps = cloneDeep(this.rectProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { props, rectProps } = this
        const { strokeWidth } = props
        const { mapping } = utils
        const { w, h, dash } = rectProps

        if (dash) {
            ctx.setLineDash(dash.map(v => v * strokeWidth))
        }

        const _w = mapping(w)
        const _h = mapping(h)

        ctx.beginPath()
        ctx.rect(-_w / 2, -_h / 2, _w, _h)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
}
