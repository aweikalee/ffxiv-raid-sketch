import { ILayerState } from './Layer'
import Simple, { ISimpleProps } from './Simple'
import { ISketchUtils } from './Sketch'
import { deepClone } from './utils/index'

/**
 * 绘制目标圈
 *
 * 即选中怪时可以分辨面向和侧背的圈
 */
export default class Monster extends Simple {
    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<ISimpleProps> = {}
    ) {
        super(
            {
                fill: '#ffcdbf60',
                stroke: '#ffcdbf',
                ...state,
            },
            { size: 15, ...props }
        )
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
