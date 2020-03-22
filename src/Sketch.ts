import Layer, { ILayerEvent } from './Layer'
import { mergeOptions } from './utils'

export interface ISketchOptions {
    /**
     * 画布宽度, 单位px
     */
    w: number

    /**
     * 画布高度, 单位px
     */
    h: number

    /**
     * 尺寸基数, 单位px
     *
     * 所有数值（`strokeWidth` 除外）在最后输出为px时都将乘以 `unit`
     *
     * 建议设置为 [[w]] 或 [[h]] 的1%
     */
    unit: number

    /**
     * 画布 DOM
     *
     * 若不传入该值，则会在内部创建一个 Canvas DOM，则必须通过appendTo 添加到文档上
     */
    canvas?: HTMLCanvasElement
}

export interface ISketchUtils {
    mapping: (value: number) => number
    unmapping: (value: number) => number
}

/**
 * 画布
 */
export default class Sketch {
    static defaultOptions: ISketchOptions = {
        w: 600,
        h: 600,
        unit: 6
    }

    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    options: ISketchOptions
    layer: Layer
    private raf?: number

    constructor(options: Partial<ISketchOptions> = {}) {
        this.options = mergeOptions({ ...Sketch.defaultOptions }, options)

        this.canvas = options.canvas || document.createElement('canvas')

        this.ctx = this.canvas.getContext('2d')

        this.layer = new Layer()

        this.layer.on<ILayerEvent['change']>('change', this.render.bind(this))

        this.size(this.options.w, this.options.h)
        this.unit(options.unit || this.options.w / 100)
    }

    /**
     * 渲染
     *
     * 不需要主动调用，任何操作都后都会发起渲染请求
     */
    render() {
        if (this.raf) return this
        this.raf = requestAnimationFrame(() => {
            this.raf = null
            this._render()
        })
        return this
    }

    /**
     * 将 Canvas 添加到 ...
     */
    appendTo(element: HTMLElement) {
        element.appendChild(this.canvas)
        return this.render()
    }

    /**
     * 设置画布尺寸
     * @param w 宽度
     * @param h 高度
     */
    size(w: number, h?: number) {
        if (typeof w !== 'number') return this
        this.options.w = w
        this.options.h = typeof h === 'number' ? h : w
        this.canvas.width = this.options.w
        this.canvas.height = this.options.h
        return this.render()
    }

    /**
     * 设置基数
     * @param value 推荐是画布宽度或高度的 1%
     */
    unit(value: number) {
        if (typeof value !== 'number' || value <= 0) return this
        this.options.unit = value
        return this.render()
    }

    private _render() {
        const { ctx } = this
        const { w, h, unit } = this.options
        const utils: ISketchUtils = {
            mapping(value) {
                return value * unit
            },
            unmapping(value) {
                return value / unit
            }
        }

        ctx.clearRect(0, 0, w, h)
        ctx.save()
        ctx.translate(w / 2, h / 2)
        this.layer.render(ctx, utils)
        ctx.restore()
    }
}
