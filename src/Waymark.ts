import Layer, { ILayerEvent, ILayerState } from './Layer'
import { ISketchUtils } from './Sketch'
import { WAYMARK, WAYMARK_COLOR } from './img/waymark/map'
import { WAYMARK_ALIAS, IWaymarkAlias } from './alias/waymark'
import { setAlias } from './alias/utils'
import Img from './Img'
import Circle from './Circle'
import Rect from './Rect'
import { proxy, deepClone, merge, defineImmutable } from './utils/index'
import * as valid from './utils/vaildate'

export interface IWaymarkProps {
    /**
     * 场景标记类型（名称）
     */
    type: IWaymarkAlias

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
 * @ignore
 */
const validator = valid.createValidator<IWaymarkProps>({
    type(value) {
        if (!isWaymarkAlias(value)) {
            throw new Error('type is invalid')
        }

        return WAYMARK_ALIAS[value]
    },
    size(value) {
        if (!valid.isNumber(value)) {
            throw new Error('size must be a number')
        }

        return value
    },
})

/**
 * 绘制 `场景标记`
 */
export default class Waymark extends Layer<IWaymarkEvent> {
    props: IWaymarkProps
    private img = new Img()
    private circle = new Circle()
    private rect = new Rect()

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<IWaymarkProps> = {}
    ) {
        super(state)

        this.img.on('loaded', () => this.emit('change', []))

        const theProps = proxyProps(this, {
            type: 'A',
            size: 5,
        })

        defineImmutable(this, 'props', theProps)

        merge(this.props, props)
    }

    /**
     * 设置目标标记类型（名称）
     */
    type(value: IWaymarkProps['type']) {
        this.props.type = value
        return this
    }

    /**
     * 设置尺寸
     */
    size(value: number) {
        this.props.size = value
        return this
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
        return new Waymark(deepClone(this.state), deepClone(this.props))
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { img, circle, rect } = this
        const { strokeWidth } = this.state
        const { type, size } = this.props
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

/**
 * @ignore
 */
function proxyProps(that: Waymark, initialValue: IWaymarkProps) {
    return proxy<IWaymarkProps>(
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
function isWaymarkAlias(value: unknown): value is IWaymarkAlias {
    return value in WAYMARK_ALIAS
}
