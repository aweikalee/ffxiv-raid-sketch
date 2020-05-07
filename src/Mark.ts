import Layer, { ILayerEvent } from './Layer'
import { ISketchUtils } from './Sketch'
import { MARK } from './img/mark/map'
import { MAKR_ALIAS, IMarkAlias } from './alias/mark'
import { setAlias } from './alias/utils'
import Img from './Img'
// import { cloneDeep } from './utils'

export interface IMarkProps {
    /**
     * 目标标记类型（名称）
     *
     * 支持 中英文官方名称
     *
     * 可通过 [[Mark.setAlias]] 设置别名
     */
    type: IMarkAlias | null

    /**
     * 显示尺寸
     */
    size: number
}

export interface IMarkEvent extends ILayerEvent {
    type: (type: IMarkProps['type']) => void
    size: (size: IMarkProps['size']) => void
}

/**
 * 绘制 `目标标记`
 */
export default class Mark extends Layer<IMarkEvent> {
    /**
     * 字段详情：[[IMarkProps]]
     */
    markProps: IMarkProps = {
        type: null,
        size: 7
    }

    private img = new Img()

    constructor(type?: IMarkProps['type']) {
        super()

        this.img.on('loaded', this.onChange.bind(this))

        this.type(type || this.markProps.type)
    }

    /**
     * 设置目标标记类型（名称）
     */
    type(value: IMarkProps['type']) {
        if (!(value in MAKR_ALIAS)) return this
        const _value = MAKR_ALIAS[value]
        if (this.markProps.type === _value) return this

        this.markProps.type = _value
        this.emit('type', [_value])
        return this.onChange()
    }

    /**
     * 设置尺寸
     */
    size(value: IMarkProps['size']) {
        if (typeof value !== 'number') return this
        if (this.markProps.size === value) return this

        this.markProps.size = value
        this.emit('size', [value])
        return this.onChange()
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
        const layer = new Mark()
        // layer.markProps = cloneDeep(this.markProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { img } = this
        const { type, size } = this.markProps

        img.src(MARK[type])
        img.size(size)
        img.render(ctx, utils)
    }
}
