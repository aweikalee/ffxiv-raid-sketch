import Layer from './Layer'
import { ISketchUtils } from './Sketch'
import { cloneDeep } from './utils'

export interface IMonsterProps {
    /**
     * 显示尺寸
     */
    size: number
}

/**
 * 绘制目标圈
 *
 * 即选中怪时可以分辨面向和侧背的圈
 */
export default class Monster extends Layer {
    /**
     * 字段详情：[[IMonsterProps]]
     */
    monsterProps: IMonsterProps = {
        size: 15
    }

    constructor() {
        super({
            fill: '#ffcdbf60',
            stroke: '#ffcdbf'
        })
    }

    /**
     * 设置尺寸
     */
    size(value: number) {
        if (typeof value !== 'number') return this
        if (this.monsterProps.size === value) return this

        this.monsterProps.size = value
        this.emit('size', [value])
        return this.onChange()
    }

    protected _clone() {
        const layer = new Monster()
        layer.monsterProps = cloneDeep(this.monsterProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { size } = this.monsterProps
        const { mapping } = utils

        ctx.rotate(Math.PI * 0.75)

        const radius = mapping(size / 2)

        /* 填充 */
        ctx.beginPath()
        ctx.arc(0, 0, radius * 0.8, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.lineCap = 'round'

        /* 大圈 */
        ctx.lineWidth = radius * 0.1
        ctx.arc(0, 0, radius, 0, Math.PI * 1.5)
        ctx.stroke()

        ctx.beginPath()

        /* 小圈 */
        ctx.lineWidth = radius * 0.05
        ctx.arc(0, 0, radius * 0.8, 0, Math.PI * 1.5)
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
        ctx.quadraticCurveTo(0, -radius * 1.1, -_sin, -_cos)
        ctx.stroke()
        ctx.fill()
    }
}
