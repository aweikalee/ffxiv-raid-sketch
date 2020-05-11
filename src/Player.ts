import Layer, { ILayerEvent, ILayerState } from './Layer'
import { ISketchUtils } from './Sketch'
import { JOB, JOB_TYPE, JOB_COLOR } from './img/job/map'
import { JOB_ALIAS, IJobAlias } from './alias/job'
import { setAlias } from './alias/utils'
import Img from './Img'
import Circle from './Circle'
import { proxy, deepClone, merge, defineImmutable } from './utils/index'
import * as valid from './utils/vaildate'

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
    job: IJobAlias

    /**
     * 显示尺寸
     */
    size: number
}

export interface IPlayerEvent extends ILayerEvent {
    job: (job: IPlayerProps['job']) => void
    size: (size: IPlayerProps['size']) => void
}

/**
 * @ignore
 */
const validator = valid.createValidator<IPlayerProps>({
    job(value) {
        if (!isJobAlias(value)) {
            throw new Error('job is invalid')
        }

        return true
    },
    size(value) {
        if (!valid.isNumber(value)) {
            throw new Error('size must be a number')
        }

        return true
    },
})

/**
 * 绘制 职业图标
 */
export default class Player extends Layer<IPlayerEvent> {
    props: IPlayerProps
    private img = new Img()
    private circle = new Circle()

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<IPlayerProps> = {}
    ) {
        super(state)

        this.img.on('loaded', () => this.emit('change', []))

        const theProps = proxyProps(this, {
            job: 'archer',
            size: 5,
        })

        defineImmutable(this, 'props', theProps)

        merge(this.props, props)
    }

    /**
     * 设置职业
     */
    job(value: IPlayerProps['job']) {
        this.props.job = value
        return this
    }

    /**
     * 设置尺寸
     */
    size(value: IPlayerProps['size']) {
        this.props.size = value
        return this
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
        return new Player(deepClone(this.state), deepClone(this.props))
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        if (!this.props.job) return
        const { img, circle } = this
        const { strokeWidth } = this.state
        const { job, size } = this.props
        const { unmapping } = utils

        const jobType = JOB_TYPE[job]
        const jobColor = JOB_COLOR[jobType]

        circle.stroke(jobColor)
        circle.fill(`${jobColor}aa`)
        circle.strokeWidth(strokeWidth)
        circle.size(size / 2)
        circle.render(ctx, utils)

        img.src(JOB[job] || null)
        img.size(size - unmapping(strokeWidth * 2))
        img.render(ctx, utils)
    }
}

/**
 * @ignore
 */
function proxyProps(that: Player, initialValue: IPlayerProps) {
    return proxy<IPlayerProps>(
        initialValue,
        (key, oldValue, newValue, target) => {
            if (!validator(key, newValue, oldValue)) return

            if (key === 'job') {
                target[key] = newValue = JOB_ALIAS[newValue]
            }

            that.emit(key, [newValue] as any)
            that.emit('change', [])
        }
    )
}

/**
 * @ignore
 */
function isJobAlias(value: unknown): value is IJobAlias {
    return value in JOB_ALIAS
}
