import Layer, { ILayerEvent } from './Layer'
import { ISketchUtils } from './Sketch'
import { cloneDeep } from './utils'

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
 * 绘制文本
 */
export default class Text extends Layer<ITextEvent> {
    /**
     * 字段详情：[[ITextProps]]
     */
    textProps: ITextProps = {
        value: '',
        align: 'center',
        size: 2.5,
        font: '',
        bold: false,
        italic: false
    }

    constructor(value?: ITextProps['value']) {
        super({
            fill: '#ffffff'
        })

        this.value(value)
    }

    /**
     * 设置文本内容
     */
    value(value: ITextProps['value']) {
        if (typeof value !== 'string' && typeof value !== 'number') return this
        const _value = `${value}`
        if (this.textProps.value === _value) return this

        this.textProps.value = _value
        this.emit('value', [_value])
        return this.onChange()
    }

    /**
     * 设置字体大小
     */
    size(value: ITextProps['size']) {
        if (typeof value !== 'number') return this
        if (this.textProps.size === value) return this

        this.textProps.size = value
        this.emit('size', [value])
        return this.onChange()
    }

    /**
     * 设置左右对齐方式
     */
    align(value: ITextProps['align']) {
        if (!['start', 'end', 'left', 'center', 'right'].includes(value))
            return this
        if (this.textProps.align === value) return this

        this.textProps.align = value
        this.emit('align', [value])
        return this.onChange()
    }

    /**
     * 设置字体
     *
     * 没有特殊需求不建议随便更改字体
     */
    font(value: ITextProps['font']) {
        if (typeof value !== 'string') return this
        if (this.textProps.font === value) return this

        this.textProps.font = value
        this.emit('font', [value])
        return this.onChange()
    }

    /**
     * 设置加粗
     */
    bold(value: ITextProps['bold']) {
        if (typeof value !== 'boolean') return this
        if (this.textProps.bold === value) return this

        this.textProps.bold = value
        this.emit('bold', [value])
        return this.onChange()
    }

    /**
     * 设置斜体
     */
    italic(value: ITextProps['italic']) {
        if (typeof value !== 'boolean') return this
        if (this.textProps.italic === value) return this

        this.textProps.italic = value
        this.emit('italic', [value])
        return this.onChange()
    }

    protected _clone() {
        const layer = new Text()
        layer.textProps = cloneDeep(this.textProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { value, font, size, align, bold, italic } = this.textProps
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
