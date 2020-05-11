import Layer, { ILayerEvent, ILayerState } from './Layer'
import { ISketchUtils } from './Sketch'
import { proxy, deepClone, merge, defineImmutable } from './utils/index'
import * as valid from './utils/vaildate'

export interface IMonsterProps {
    /**
     * 显示尺寸
     */
    size: number
}

export interface IMonsterEvent extends ILayerEvent {
    size: (size: IMonsterProps['size']) => void
}

/**
 * @ignore
 */
const validator = valid.createValidator<IMonsterProps>({
    size(value) {
        if (!valid.isNumber(value)) {
            throw new Error('size must be a number')
        }

        return value
    },
})

/**
 * 绘制目标圈
 *
 * 即选中怪时可以分辨面向和侧背的圈
 */
export default class Monster extends Layer<IMonsterEvent> {
    props: IMonsterProps

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<IMonsterProps> = {}
    ) {
        super({
            fill: '#ffcdbf60',
            stroke: '#ffcdbf',
            ...state,
        })

        const theProps = proxyProps(this, {
            size: 15,
        })

        defineImmutable(this, 'props', theProps)

        merge(this.props, props)
    }

    /**
     * 设置尺寸
     */
    size(value: number) {
        this.props.size = value
        return this
    }

    protected _clone() {
        return new Monster(deepClone(this.state), deepClone(this.props))
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { strokeWidth } = this.state
        const { size } = this.props
        const { mapping } = utils

        ctx.rotate(Math.PI * 0.75)

        const radius = mapping(size / 2)
        const smallRadius = (radius - strokeWidth * 1.5) * 0.85

        /* 填充 */
        ctx.beginPath()
        ctx.arc(0, 0, smallRadius, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.lineCap = 'round'

        /* 大圈 */
        ctx.lineWidth = strokeWidth * 2
        ctx.arc(0, 0, radius, 0, Math.PI * 1.5)
        ctx.stroke()

        ctx.beginPath()

        /* 小圈 */
        ctx.lineWidth = strokeWidth
        ctx.arc(0, 0, smallRadius, 0, Math.PI * 1.5)
        ctx.stroke()

        ctx.beginPath()
        ctx.rotate(-Math.PI * 0.75)

        /* 正面 */
        const angle = Math.PI * 0.09
        const _sin = radius * Math.sin(angle)
        const _cos = radius * Math.cos(angle)
        ctx.fillStyle = ctx.strokeStyle
        ctx.lineTo(-_sin, -_cos)
        ctx.quadraticCurveTo(0, -radius * 1.5, _sin, -_cos)
        ctx.quadraticCurveTo(0, -radius, -_sin, -_cos)
        ctx.stroke()
        ctx.fill()
    }
}

/**
 * @ignore
 */
function proxyProps(that: Monster, initialValue: IMonsterProps) {
    return proxy<IMonsterProps>(
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
