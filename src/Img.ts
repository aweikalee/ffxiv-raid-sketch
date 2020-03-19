import Layer from './Layer'
import { ISketchUtils } from './Sketch'
import { IMG_ALIAS } from './alias/img'
import { setImgAlias } from './alias/utils'
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

export default class Img extends Layer {
    /**
     * 字段详情：[[IImgProps]]
     */
    imgProps: IImgProps = {
        src: null,
        size: 'auto'
    }
    private image: HTMLImageElement

    constructor(src?: string) {
        super()

        this.image = new Image()
        this.image.onload = () => {
            this.emit('loaded')
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
        if (_value === this.imgProps.src) return this
        this.imgProps.src = _value
        this.image.src = _value

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
        this.imgProps.size = value
        return this.onChange()
    }

    static setAlias(alias: string, value: string) {
        setImgAlias(alias, value)
    }

    protected _clone() {
        const layer = new Img()
        layer.imgProps = cloneDeep(this.imgProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { imgProps, image } = this
        const { size } = imgProps
        const { mapping } = utils

        if (!image.src || !image.complete) return

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
