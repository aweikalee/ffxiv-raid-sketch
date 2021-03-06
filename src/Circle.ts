import Layer, { ILayerEvent, ILayerState } from './Layer'
import { ISketchUtils } from './Sketch'
import { proxy, deepClone, merge, defineImmutable } from './utils/index'
import * as valid from './utils/vaildate'

export interface ICircleProps {
    /**
     * 半径
     */
    size: number

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
    dash: readonly number[] | null
}

export interface ICircleEvent extends ILayerEvent {
    size: (size: ICircleProps['size']) => void
    angle: (angle: ICircleProps['angle']) => void
    arc: (arc: ICircleProps['arc']) => void
    dash: (dash: ICircleProps['dash']) => void
}

/**
 * @ignore
 */
const validator = valid.createValidator<ICircleProps>({
    size(value) {
        if (!valid.isNumber(value)) {
            throw new Error('size must be a number')
        }

        return true
    },
    angle(value) {
        if (!valid.isNumber(value)) {
            throw new Error('angle must be a number')
        }

        return true
    },
    arc(value) {
        if (!valid.isBoolean(value)) {
            throw new Error('arc must be a boolean')
        }

        return true
    },
    dash(value) {
        if (!(value === null || valid.isArray<number>(value, valid.isNumber))) {
            throw new Error('dash must be a number[]/null')
        }

        return true
    },
})

/**
 * 可绘制 圆形、扇形、弧形
 */
export default class Circle extends Layer<ICircleEvent> {
    props: ICircleProps

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<ICircleProps> = {}
    ) {
        super({
            fill: '#c79a667F',
            stroke: '#c79a66',
            ...state,
        })

        const theProps = proxyProps(this, {
            size: 30,
            angle: 360,
            arc: false,
            dash: null,
        })

        defineImmutable(this, 'props', theProps)

        merge(this.props, props)
    }

    /**
     * 设置半径
     */
    size(value: ICircleProps['size']) {
        this.props.size = value
        return this
    }

    /**
     * 设置张开角度
     */
    angle(value: ICircleProps['angle']) {
        this.props.angle = value
        return this
    }

    /**
     * 设置弧形
     * @param value 值为 `true` 时，将不会渲染扇形两条直线的边。
     */
    arc(value: ICircleProps['arc']) {
        this.props.arc = value
        return this
    }

    /**
     * 设置线段样式
     */
    dash(value: ICircleProps['dash']) {
        this.props.dash = value
        return this
    }

    protected _clone() {
        return new Circle(deepClone(this.state), deepClone(this.props))
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { strokeWidth } = this.state
        const { size, angle, arc, dash } = this.props
        const { mapping } = utils

        if (dash) {
            ctx.setLineDash(dash.map((v) => v * strokeWidth))
        }

        const _angle = (angle * Math.PI) / 180
        ctx.rotate(-(Math.PI + _angle) / 2)

        ctx.beginPath()
        ctx.arc(0, 0, mapping(size), 0, _angle)

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

/**
 * @ignore
 */
function proxyProps(that: Circle, initialValue: ICircleProps) {
    return proxy<ICircleProps>(initialValue, (key, oldValue, newValue) => {
        if (!validator(key, newValue, oldValue)) return

        if (key === 'dash') {
            Object.freeze(newValue)
        }

        that.emit(key, [newValue] as any)
        that.emit('change', [])
    })
}
