import Layer, { ILayerEvent, ILayerState } from './Layer'
import { ISketchUtils } from './Sketch'
import { proxy, deepClone, merge, defineImmutable } from './utils/index'
import * as valid from './utils/vaildate'

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
    dash: readonly number[] | null
}

export interface IRectEvent extends ILayerEvent {
    w: (w: IRectProps['w']) => void
    h: (h: IRectProps['h']) => void
    dash: (dash: IRectProps['dash']) => void
}

/**
 * @ignore
 */
const validator = valid.createValidator<IRectProps>({
    w(value) {
        if (!valid.isNumber(value)) {
            throw new Error('w must be a number')
        }

        return value
    },
    h(value) {
        if (!valid.isNumber(value)) {
            throw new Error('h must be a number')
        }

        return value
    },
    dash(value) {
        if (!(value === null || valid.isArray<number>(value, valid.isNumber))) {
            throw new Error('dash must be a number[]/null')
        }

        return Object.freeze(value)
    },
})

/**
 * 绘制矩形
 */
export default class Rect extends Layer<IRectEvent> {
    props: IRectProps

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<IRectProps> = {}
    ) {
        super({
            fill: '#c79a667F',
            stroke: '#c79a66',
            ...state,
        })

        const theProps = proxyProps(this, {
            w: 30,
            h: 30,
            dash: null,
        })

        defineImmutable(this, 'props', theProps)

        merge(this.props, props)
    }

    /**
     * 设置尺寸
     * @param w 宽
     * @param h 高
     */
    size(w: number, h?: number) {
        this.props.w = w
        this.props.h = h === undefined ? w : h
        return this
    }

    /**
     * 设置线段样式
     */
    dash(value: IRectProps['dash']) {
        this.props.dash = value
        return this
    }

    protected _clone() {
        return new Rect(deepClone(this.state), deepClone(this.props))
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { state, props } = this
        const { strokeWidth } = state
        const { mapping } = utils
        const { w, h, dash } = props

        if (dash) {
            ctx.setLineDash(dash.map((v) => v * strokeWidth))
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

/**
 * @ignore
 */
function proxyProps(that: Rect, initialValue: IRectProps) {
    return proxy<IRectProps>(
        initialValue,
        (key, oldValue, newValue, target) => {
            validator(target, key, newValue, oldValue).then(
                (value) => {
                    that.emit(key, [value] as any)
                    that.emit('change', [])
                },
                (err) => {
                    target[key] = oldValue
                    throw err
                }
            )
        }
    )
}
