import Layer from './Layer'
import { ISketchUtils } from './Sketch'
import { JOB, JOB_TYPE, JOB_COLOR } from './img/job/map'
import { JOB_ALIAS, IJobAlias } from './alias/job'
import { setAlias } from './alias/utils'
import Img from './Img'
import Circle from './Circle'
import { cloneDeep } from './utils'

export interface IPlayerProps {
    /**
     * 职业名称
     *
     * 支持 中英文官方名称
     *
     * 英文名称支持的是没有连接符号的小写全称
     *
     * 可通过 [[Player.setAlias]] 设置别名
     */
    job: IJobAlias | null

    /**
     * 显示尺寸
     */
    size: number
}

/**
 * 绘制 职业图标
 */
export default class Player extends Layer {
    /**
     * 字段详情：[[IPlayerProps]]
     */
    playerProps: IPlayerProps = {
        job: null,
        size: 5
    }
    private img = new Img()
    private circle = new Circle()

    constructor(job?: IPlayerProps['job']) {
        super()

        this.img.on('loaded', this.onChange.bind(this))

        this.job(job || this.playerProps.job)
    }

    /**
     * 设置职业
     */
    job(value: IPlayerProps['job']) {
        if (!(value in JOB_ALIAS)) return this
        const _value = JOB_ALIAS[value]
        if (this.playerProps.job === _value) return this

        this.playerProps.job = _value
        this.emit('job', [_value])
        return this.onChange()
    }

    /**
     * 设置尺寸
     */
    size(value: IPlayerProps['size']) {
        if (typeof value !== 'number') return this
        if (this.playerProps.size === value) return this

        this.playerProps.size = value
        this.emit('size', [value])
        return this.onChange()
    }

    /**
     * 为职业名称设别名
     *
     * 通过 `Player.setAlias('吟游诗人', '诗人')` 设置别名
     *
     * 之后则可以使用 `new Player('诗人')` 获得与`吟游诗人`同样的图标
     *
     * @param name 中英文官方名称 / 已设置成功的别名
     * @param alias 别名
     */
    static setAlias(name: IJobAlias, alias: string) {
        setAlias(JOB_ALIAS, name, alias)
    }

    protected _clone() {
        const layer = new Player()
        layer.playerProps = cloneDeep(this.playerProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        if (!this.playerProps.job) return
        const { img, circle } = this
        const { strokeWidth } = this.props
        const { job, size } = this.playerProps
        const { unmapping } = utils

        const jobType = JOB_TYPE[job]
        const jobColor = JOB_COLOR[jobType]

        circle.stroke(jobColor)
        circle.fill(`${jobColor}aa`)
        circle.strokeWidth(strokeWidth)
        circle.size(size / 2)
        circle.render(ctx, utils)

        img.src(JOB[job])
        img.size(size - unmapping(strokeWidth * 2))
        img.render(ctx, utils)
    }
}
