import Layer, { ILayerEvent, ILayerState } from './Layer'
import { ISketchUtils } from './Sketch'
import { proxy, deepClone, merge, defineImmutable } from './utils/index'
import * as valid from './utils/vaildate'

export interface IImgProps {
    /**
     * 图片地址
     */
    src: string | null

    /**
     * 渲染尺寸
     *
     * 当 值为 `'auto'` 时，将以图片本身的像素尺寸进行渲染
     */
    size: 'auto' | number
}

export interface IImgEvent extends ILayerEvent {
    loaded: () => void
    src: (src: IImgProps['src']) => void
    size: (size: IImgProps['size']) => void
}

/**
 * @ignore
 */
const validator = valid.createValidator<IImgProps>({
    src(value) {
        if (!(value === null || valid.isString(value))) {
            throw new Error(`Img.props.src must be a string/null`)
        }

        return value
    },
    size(value) {
        if (!(valid.isNumber(value) || value === 'auto')) {
            throw new Error(`Img.props.size must be a number/"auto"`)
        }

        return value
    },
})

export default class Img extends Layer<IImgEvent> {
    props: IImgProps
    image: HTMLImageElement = new Image()
    private raf: number | null = null

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<IImgProps> = {}
    ) {
        super(state)

        this.image.onload = () => {
            this.emit('loaded', [])
            this.emit('change', [])
        }

        const theProps = proxyProps(this, {
            src: null,
            size: 'auto',
        })

        defineImmutable(this, 'props', theProps)

        merge(this.props, props)
    }

    /**
     * 设置图片路径
     */
    src(value: string) {
        this.props.src = value
        return this
    }

    /**
     * 设置图片渲染尺寸
     *
     * 相当于宽高的最大值
     *
     * 若想改变比例请使用 [[Img.scale]]
     */
    size(value: number) {
        this.props.size = value
        return this
    }

    protected _clone() {
        return new Img(deepClone(this.state), deepClone(this.props))
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { props, image } = this
        const { size } = props
        const { mapping } = utils

        if (this.raf) {
            cancelAnimationFrame(this.raf)
            this.raf = null
        }
        if (!image.src) return

        // 加载动画
        if (!image.complete) {
            const r = typeof size === 'number' ? size * 0.4 : 5
            const time = Date.now()

            ctx.strokeStyle = '#99999990'
            ctx.lineWidth = mapping(r * 0.3)
            ctx.lineCap = 'round'

            ctx.rotate((time / 150) % (2 * Math.PI))
            ctx.beginPath()
            ctx.arc(0, 0, mapping(r), 0, 1.5 * Math.PI)
            ctx.stroke()

            this.raf = requestAnimationFrame(() => {
                this.emit('change', [])
                this.raf = null
            })
            return
        }

        let w = image.width
        let h = image.height

        if (size !== 'auto') {
            const ratio = mapping(size) / Math.max(w, h)
            w *= ratio
            h *= ratio
        }

        ctx.drawImage(this.image, -w / 2, -h / 2, w, h)
    }
}
/**
 * @ignore
 */
function proxyProps(that: Img, initialValue: IImgProps) {
    return proxy<IImgProps>(initialValue, (key, oldValue, newValue, target) => {
        validator(target, key, newValue, oldValue).then(
            (value) => {
                if (key === 'src') {
                    that.image.src = target['src']
                }
                that.emit(key, [value] as any)
                that.emit('change', [])
            },
            (err) => {
                target[key] = oldValue
                throw err
            }
        )
    })
}
