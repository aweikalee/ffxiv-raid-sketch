import Layer, { ILayerEvent, ILayerState } from './Layer'
import { ISketchUtils } from './Sketch'
import { proxy, deepClone, merge, defineImmutable } from './utils/index'
import * as valid from './utils/vaildate'

export interface ITextProps {
    /**
     * 文本内容
     */
    value: string

    /**
     * 对齐方式
     */
    align: CanvasTextAlign

    /**
     * 字体大小
     */
    size: number

    /**
     * 字体
     */
    font: string

    /**
     * 加粗
     */
    bold: boolean

    /**
     * 使用斜体
     */
    italic: boolean
}

export interface ITextEvent extends ILayerEvent {
    value: (value: ITextProps['value']) => void
    size: (size: ITextProps['size']) => void
    align: (align: ITextProps['align']) => void
    font: (font: ITextProps['font']) => void
    bold: (bold: ITextProps['bold']) => void
    italic: (italic: ITextProps['italic']) => void
}

/**
 * @ignore
 */
const validator = valid.createValidator<ITextProps>({
    value(value) {
        if (!valid.isString(value)) {
            throw new Error('value must be a string')
        }

        return value
    },
    align(value) {
        if (!valid.isCanvasTextAlign(value)) {
            throw new Error('align must be a CanvasTextAlign')
        }

        return value
    },
    size(value) {
        if (!valid.isNumber(value)) {
            throw new Error('size must be a number')
        }

        return value
    },
    font(value) {
        if (!valid.isString(value)) {
            throw new Error('font must be a string')
        }

        return value
    },
    bold(value) {
        if (!valid.isBoolean(value)) {
            throw new Error('bold must be a boolean')
        }

        return value
    },
    italic(value) {
        if (!valid.isBoolean(value)) {
            throw new Error('italic must be a boolean')
        }

        return value
    },
})

/**
 * 绘制文本
 */
export default class Text extends Layer<ITextEvent> {
    props: ITextProps

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<ITextProps> = {}
    ) {
        super({
            fill: '#ffffff',
            ...state,
        })

        const theProps = proxyProps(this, {
            value: '',
            align: 'center',
            size: 2.5,
            font: '',
            bold: false,
            italic: false,
        })

        defineImmutable(this, 'props', theProps)

        merge(this.props, props)
    }

    /**
     * 设置文本内容
     */
    value(value: ITextProps['value']) {
        this.props.value = value
        return this
    }

    /**
     * 设置字体大小
     */
    size(value: ITextProps['size']) {
        this.props.size = value
        return this
    }

    /**
     * 设置左右对齐方式
     */
    align(value: ITextProps['align']) {
        this.props.align = value
        return this
    }

    /**
     * 设置字体
     *
     * 没有特殊需求不建议随便更改字体
     */
    font(value: ITextProps['font']) {
        this.props.font = value
        return this
    }

    /**
     * 设置加粗
     */
    bold(value: ITextProps['bold']) {
        this.props.bold = value
        return this
    }

    /**
     * 设置斜体
     */
    italic(value: ITextProps['italic']) {
        this.props.italic = value
        return this
    }

    protected _clone() {
        return new Text(deepClone(this.state), deepClone(this.props))
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { value, font, size, align, bold, italic } = this.props
        const { mapping } = utils

        const fontStyle = italic ? 'italic' : 'normal'
        const fontWeight = bold ? 700 : 400
        const fontSize = `${mapping(size)}px`
        const fontFamily = ['Microsoft YaHei', 'PingFang SC', 'sans-serif']
        if (font) fontFamily.unshift(font)

        ctx.font = [fontStyle, fontWeight, fontSize, fontFamily.join(',')].join(
            ' '
        )
        ctx.textBaseline = 'middle'
        ctx.textAlign = align
        ctx.shadowColor = '#000000'
        ctx.fillText(value, 0, 0)
    }
}

/**
 * @ignore
 */
function proxyProps(that: Text, initialValue: ITextProps) {
    return proxy<ITextProps>(
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
