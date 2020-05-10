import Layer, { ILayerEvent, ILayerState } from './Layer'
import { ISketchUtils } from './Sketch'
import { MARK } from './img/mark/map'
import { MAKR_ALIAS, IMarkAlias } from './alias/mark'
import { setAlias } from './alias/utils'
import Img from './Img'
import { proxy, deepClone, merge, defineImmutable } from './utils/index'
import * as valid from './utils/vaildate'

export interface IMarkProps {
    /**
     * 目标标记类型（名称）
     *
     * 支持 中英文官方名称
     *
     * 可通过 [[Mark.setAlias]] 设置别名
     */
    type: IMarkAlias

    /**
     * 显示尺寸
     */
    size: number
}

export interface IMarkEvent extends ILayerEvent {
    type: (type: IMarkProps['type']) => void
    size: (size: IMarkProps['size']) => void
}

const validator = valid.createValidator<IMarkProps>({
    type(value) {
        if (!isMarkAlias(value)) {
            throw new Error('Mark.props.type is invalid')
        }

        return MAKR_ALIAS[value]
    },
    size(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Mark.props.size must be a number')
        }

        return value
    },
})

/**
 * 绘制 `目标标记`
 */
export default class Mark extends Layer<IMarkEvent> {
    props: IMarkProps
    private img = new Img()

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<IMarkProps> = {}
    ) {
        super(state)

        this.img.on('loaded', () => this.emit('change', []))

        const theProps = proxyProps(this, {
            type: 'attack1',
            size: 7,
        })

        defineImmutable(this, 'props', theProps)

        merge(this.props, props)
    }

    /**
     * 设置目标标记类型（名称）
     */
    type(value: IMarkProps['type']) {
        this.props.type = value
        return this
    }

    /**
     * 设置尺寸
     */
    size(value: IMarkProps['size']) {
        this.props.size = value
        return this
    }

    /**
     * 为目标标记设别名
     *
     * 比如 `攻击1` 和 `attck1` 分别是中英文的官方名称
     *
     * 我可以通过 `Mark.setAlias('攻击1', '攻1')` 设置别名
     *
     * 之后则可以使用 `new Mark('攻1')` 获得同样的目标标记
     * @param name 中英文官方名称 / 已设置成功的别名
     * @param alias 别名
     */
    static setAlias(name: IMarkAlias, alias: string) {
        setAlias(MAKR_ALIAS, name, alias)
    }

    protected _clone() {
        return new Mark(deepClone(this.state), deepClone(this.props))
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { img } = this
        const { type, size } = this.props

        img.src(MARK[type] || null)
        img.size(size)
        img.render(ctx, utils)
    }
}

/**
 * @ignore
 */
function proxyProps(that: Mark, initialValue: IMarkProps) {
    return proxy<IMarkProps>(
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

/**
 * @ignore
 */
function isMarkAlias(value: unknown): value is IMarkAlias {
    return value in MAKR_ALIAS
}
