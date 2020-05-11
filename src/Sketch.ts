import Layer from './Layer'
import { proxy, merge, defineImmutable, defineProperties } from './utils/index'
import * as valid from './utils/vaildate'

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
    canvas: HTMLCanvasElement | null
}

export interface ISketchUtils {
    mapping: (value: number) => number
    unmapping: (value: number) => number
}

/**
 * @ignore
 */
const validator = valid.createValidator<ISketchOptions>({
    w(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Sketch.options.w must be a number')
        }

        return value
    },
    h(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Sketch.options.h must be a number')
        }

        return value
    },
    unit(value) {
        if (!valid.isNumber(value)) {
            throw new Error('Sketch.options.unit must be a number')
        }

        return value
    },
    canvas(value) {
        if (!(value instanceof HTMLCanvasElement || value === null)) {
            throw new Error('Sketch.options.angle must be a number')
        }

        return value
    },
})

/**
 * 画布
 */
export default class Sketch {
    static defaultOptions: ISketchOptions = {
        w: 600,
        h: 600,
        unit: 6,
        canvas: null,
    }

    canvas: HTMLCanvasElement | null
    ctx: CanvasRenderingContext2D | null
    options: ISketchOptions
    layer: Layer
    private raf?: number

    constructor(options: Partial<ISketchOptions> = {}) {
        /* 抽出canvas重新赋值 是为了触发proxy内的连带设置 */
        const { canvas, ...defaultOptions } = Sketch.defaultOptions

        const theOptions = proxyOptions(this, {
            canvas: null,
            ...defaultOptions,
        })
        const layer = proxyLayer(this, new Layer())

        defineImmutable(this, 'options', theOptions)
        defineProperties<Sketch>(this, {
            layer: {
                get() {
                    return layer.value
                },
                set(v) {
                    layer.value = v
                },
            },
            canvas: {
                get() {
                    return theOptions.canvas
                },
                set(v) {
                    theOptions.canvas = v
                },
            },
        })

        merge(this.options, {
            canvas,
            ...options,
        })
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
        this.options.w = w
        this.options.h = h === undefined ? w : h
        return this
    }

    /**
     * 设置基数
     * @param value 推荐是画布宽度或高度的 1%
     */
    unit(value: number) {
        this.options.unit = value
        return this
    }

    private _render() {
        const { ctx } = this
        const { w, h, unit } = this.options
        if (!ctx) return

        const utils: ISketchUtils = {
            mapping(value) {
                return value * unit
            },
            unmapping(value) {
                return value / unit
            },
        }

        ctx.clearRect(0, 0, w, h)
        ctx.save()
        ctx.translate(w / 2, h / 2)
        this.layer.render(ctx, utils)
        ctx.restore()
    }
}

/**
 * @ignore
 */
function proxyOptions(that: Sketch, initialValue: ISketchOptions) {
    return proxy<ISketchOptions>(
        initialValue,
        (key, oldValue, newValue, target) => {
            validator(target, key, newValue, oldValue).then(
                () => {
                    const canvas = target['canvas']
                    switch (key) {
                        case 'canvas':
                            if (canvas) {
                                that.ctx = canvas.getContext('2d')
                                canvas.width = target['w']
                                canvas.height = target['h']
                            } else {
                                that.ctx = null
                            }
                            break
                        case 'w':
                            if (canvas) {
                                target['canvas'].width = target['w']
                            }
                            break
                        case 'h':
                            if (canvas) {
                                target['canvas'].height = target['h']
                            }
                            break
                    }

                    that.render()
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
function proxyLayer(that: Sketch, initialValue: Layer<any>) {
    const onChange = that.render.bind(that)
    initialValue.on('change', onChange)
    return proxy<{ value: Layer<any> }>(
        { value: initialValue },
        (key, oldValue, newValue, target) => {
            if (key !== 'value') return
            if (!(newValue instanceof Layer)) {
                target[key] = oldValue
                throw new Error(`Sketch.layer must be a Layer`)
            }

            if (oldValue) {
                oldValue.off('change', onChange)
            }

            newValue.on('change', onChange)

            that.render()
        }
    )
}
