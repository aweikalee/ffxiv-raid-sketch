import Layer, { ILayerEvent, ILayerState } from './Layer'
import { proxy, deepClone, merge, defineImmutable } from './utils/index'
import * as valid from './utils/vaildate'

export interface ISimpleProps {
    /**
     * 显示尺寸
     */
    size: number
}

export interface ISimpleEvent extends ILayerEvent {
    size: (size: ISimpleProps['size']) => void
}

/**
 * @ignore
 */
const validator = valid.createValidator<ISimpleProps>({
    size(value) {
        if (!valid.isNumber(value)) {
            throw new Error('size must be a number')
        }

        return true
    },
})

/**
 * 基础图形类
 *
 * 比如 [Monster] 可能只需要一个 `props.size`。
 * 则可直接继承这个类，重写 _render 即可
 */
export default class Simple extends Layer<ISimpleEvent> {
    props: ISimpleProps

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<ISimpleProps> = {}
    ) {
        super(state)

        const theProps = proxyProps(this, {
            size: 10,
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
        return new Simple(deepClone(this.state), deepClone(this.props))
    }
}

/**
 * @ignore
 */
function proxyProps(that: Simple, initialValue: ISimpleProps) {
    return proxy<ISimpleProps>(
        initialValue,
        (key, oldValue, newValue, target) => {
            if (!validator(key, newValue, oldValue)) return

            that.emit(key, [newValue] as any)
            that.emit('change', [])
        }
    )
}
