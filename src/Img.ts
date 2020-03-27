import Layer, { ILayerEvent } from './Layer'
import { ISketchUtils } from './Sketch'
import { IMG_ALIAS } from './alias/img'
import { setAliasMapping } from './alias/utils'
import { cloneDeep } from './utils'

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

export default class Img extends Layer<IImgEvent> {
    /**
     * 字段详情：[[IImgProps]]
     */
    imgProps: IImgProps = {
        src: null,
        size: 'auto'
    }
    private image: HTMLImageElement
    private raf: number | null = null

    constructor(src?: string) {
        super()

        this.image = new Image()
        this.image.onload = () => {
            this.emit<IImgEvent['loaded']>('loaded')
            this.onChange()
        }

        this.src(src || this.imgProps.src)
    }

    /**
     * 设置图片路径
     */
    src(value: string) {
        if (typeof value !== 'string') return this
        const _value = IMG_ALIAS[value] || value
        if (this.imgProps.src === _value) return this

        this.imgProps.src = _value
        this.image.src = _value
        this.emit<IImgEvent['src']>('src', [_value])
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
        if (typeof value !== 'number') return this
        if (this.imgProps.size === value) return this

        this.imgProps.size = value
        this.emit<IImgEvent['size']>('size', [value])
        return this.onChange()
    }

    /**
     * 定义图片地址的别名，方便后期使用
     *
     * 比如 `Img.setAlias('buff', 'https://example/buff.png')`
     *
     * 之后就可以使用 `Img('buff')` 来使用这张图片了
     * @param alias 别名
     * @param value 值
     */
    static setAlias(alias: string, value: string) {
        setAliasMapping(IMG_ALIAS, alias, value)
    }

    protected _clone() {
        const layer = new Img(this.imgProps.src)
        layer.imgProps = cloneDeep(this.imgProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { imgProps, image } = this
        const { size } = imgProps
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
                this.emit('change')
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
