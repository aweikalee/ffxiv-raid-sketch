import Layer, { ILayerProps, ILayerEvent } from './Layer'
import { ISketchUtils } from './Sketch'
import { rotationAngle } from './utils'
import { cloneDeep } from './utils'

export interface ILineCoordinate {
    x: number
    y: number
}

export type ILineCap = 'none' | 'point' | 'arrow' | 'triangle'

export interface ILineProps {
    /**
     * 点的坐标
     */
    coordinates: number[][]

    /**
     * 光滑
     */
    smooth: boolean

    /**
     * 线段样式
     */
    dash: number[] | null

    /**
     * 出发端点样式
     */
    startCap: ILineCap

    /**
     * 结束端点样式
     */
    endCap: ILineCap
}

export interface ILineEvent extends ILayerEvent {
    to: (coordinate: number[]) => void
    clear: () => void
    startCap: (cap: ILineCap) => void
    endCap: (cap: ILineCap) => void
    smooth: (smooth: ILineProps['smooth']) => void
    dash: (dash: ILineProps['dash']) => void
}

/**
 * @ignore
 */
const LINECAP: ILineCap[] = ['none', 'point', 'arrow', 'triangle']

/**
 * 可绘制 折线、二次曲线、贝塞尔曲线（任意组合）
 */
export default class Line extends Layer<ILineEvent> {
    /**
     * 字段详情：[[ILineProps]]
     */
    lineProps: ILineProps = {
        coordinates: [],
        smooth: false,
        dash: null,
        startCap: 'none',
        endCap: 'none'
    }

    constructor() {
        super({
            fill: 'transparent',
            stroke: '#c79a66'
        })
    }

    /**
     * 设置线段点位
     *
     * 根据参数使用不同的绘制算法
     *
     * - `x, y` 直线
     * - `x, y, cp1x, cp1y` 二次曲线
     * - `x, y, cp1x, cp1y, cp2x, cp2y` 贝塞尔曲线
     * @param x 新的结束坐标x
     * @param y 新的结束坐标y
     * @param cp1x 二次曲线控制点坐标x / 贝塞尔曲线控制点1坐标x
     * @param cp1y 二次曲线控制点坐标y / 贝塞尔曲线控制点1坐标y
     * @param cp2x 贝塞尔曲线控制点2坐标x
     * @param cp2y 贝塞尔曲线控制点2坐标y
     */
    to(
        x: number,
        y: number,
        cp1x?: number,
        cp1y?: number,
        cp2x?: number,
        cp2y?: number
    ) {
        if (typeof x !== 'number' || typeof y !== 'number') return this
        const coordinate: number[] = []

        const cp1 = [cp1x, cp1y].filter(v => typeof v === 'number')
        if (cp1.length === 2) {
            if (this.lineProps.coordinates.length === 0) {
                this.lineProps.coordinates.push(cp1)
            }
            coordinate.push(...cp1)
        }

        const cp2 = [cp2x, cp2y].filter(v => typeof v === 'number')
        if (cp2.length === 2) {
            coordinate.push(...cp2)
        }

        coordinate.push(x, y)

        this.lineProps.coordinates.push(coordinate)
        this.emit<ILineEvent['to']>('to', [coordinate])
        return this.onChange()
    }

    /**
     * 清空所有坐标点
     */
    clear() {
        const arr = this.lineProps.coordinates
        if (arr.length === 0) return this

        arr.splice(0, arr.length)
        this.emit<ILineEvent['clear']>('clear')
        return this.onChange()
    }

    /**
     * 设置出发端点样式
     */
    startCap(value: ILineCap) {
        if (!LINECAP.includes(value)) return this
        if (this.lineProps.startCap === value) return this

        this.lineProps.startCap = value
        this.emit<ILineEvent['startCap']>('startCap', [value])
        return this.onChange()
    }

    /**
     * 设置结束端点样式
     */
    endCap(value: ILineCap) {
        if (!LINECAP.includes(value)) return this
        if (this.lineProps.endCap === value) return this

        this.lineProps.endCap = value
        this.emit<ILineEvent['endCap']>('endCap', [value])
        return this.onChange()
    }

    /**
     * 光滑折线（曲线点不受影响）
     */
    smooth(value: ILineProps['smooth']) {
        if (typeof value !== 'boolean') return this
        if (this.lineProps.smooth === value) return this

        this.lineProps.smooth = value
        this.emit<ILineEvent['smooth']>('smooth', [value])
        return this.onChange()
    }

    /**
     * 设置线段样式
     *
     * 数值最后将 * strokeWidth 后再被应用
     */
    dash(value: ILineProps['dash']) {
        if (!Array.isArray(value)) return this
        if (value.some(v => typeof v !== 'number')) return this

        this.lineProps.dash = value
        this.emit<ILineEvent['dash']>('dash', [value])
        return this.onChange()
    }

    protected _clone() {
        const layer = new Line()
        layer.lineProps = cloneDeep(this.lineProps)
        return layer
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { props, lineProps } = this
        const { coordinates: coord, startCap, endCap } = this.lineProps

        /* 绘制线 */
        drawLine({
            props,
            lineProps,
            ctx,
            utils
        })

        /* 绘制线帽 */
        if (coord.length >= 2) {
            const end = [coord[coord.length - 2], coord[coord.length - 1]]
            const startFrom = { x: coord[1][0], y: coord[1][1] }
            const startTo = {
                x: coord[0][coord[0].length - 2],
                y: coord[0][coord[0].length - 1]
            }
            const endFrom =
                end[1].length === 2
                    ? {
                          x: end[0][end[0].length - 2],
                          y: end[0][end[0].length - 1]
                      }
                    : {
                          x: end[1][end[1].length - 4],
                          y: end[1][end[1].length - 3]
                      }
            const endTo = {
                x: end[1][end[1].length - 2],
                y: end[1][end[1].length - 1]
            }

            drawCap({
                props,
                ctx,
                utils,
                type: startCap,
                from: startFrom,
                to: startTo
            })
            drawCap({
                props,
                ctx,
                utils,
                type: endCap,
                from: endFrom,
                to: endTo
            })
        }
    }
}

/**
 * @ignore
 */
function drawLine({
    props,
    lineProps,
    ctx,
    utils
}: {
    props: ILayerProps
    lineProps: ILineProps
    ctx: CanvasRenderingContext2D
    utils: ISketchUtils
}) {
    const { strokeWidth } = props
    const { coordinates, dash, smooth } = lineProps
    const { mapping } = utils

    ctx.save()
    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    /* 线段样式 */
    if (dash) {
        ctx.setLineDash(dash.map(v => v * strokeWidth))
    }

    /* 绘制线段 */
    const _coordinates = [
        coordinates[0],
        coordinates[0],
        ...coordinates,
        coordinates[coordinates.length - 1]
    ]
    for (let i = 2, len = _coordinates.length - 1; i < len; i += 1) {
        const now = _coordinates[i]
        if (now.length === 6) {
            ctx.bezierCurveTo.apply(
                ctx,
                now.map(v => mapping(v))
            )
            continue
        }

        if (now.length === 4) {
            ctx.quadraticCurveTo.apply(
                ctx,
                now.map(v => mapping(v))
            )
            continue
        }

        if (!smooth || i === 2) {
            ctx.lineTo(mapping(now[0]), mapping(now[1]))
            continue
        }

        // 平滑曲线
        const c = [
            _coordinates[i - 2],
            _coordinates[i - 1],
            now,
            _coordinates[i + 1]
        ]

        const level = 8
        const cp1x = c[1][0] + (c[2][0] - c[0][0]) / level
        const cp1y = c[1][1] + (c[2][1] - c[0][1]) / level
        const cp2x = c[2][0] - (c[3][0] - c[1][0]) / level
        const cp2y = c[2][1] - (c[3][1] - c[1][1]) / level

        if (i === len - 1) {
            ctx.quadraticCurveTo.apply(
                ctx,
                [cp1x, cp1y, now[0], now[1]].map(v => mapping(v))
            )
            continue
        }

        if (i === 3) {
            ctx.quadraticCurveTo.apply(
                ctx,
                [cp2x, cp2y, now[0], now[1]].map(v => mapping(v))
            )
            continue
        }

        ctx.bezierCurveTo.apply(
            ctx,
            [cp1x, cp1y, cp2x, cp2y, now[0], now[1]].map(v => mapping(v))
        )
    }
    ctx.fill()
    ctx.stroke()
    ctx.restore()
}

/**
 * @ignore
 */
function drawCap({
    props,
    ctx,
    utils,
    type,
    from,
    to
}: {
    props: ILayerProps
    ctx: CanvasRenderingContext2D
    utils: ISketchUtils
    type: ILineCap
    from: ILineCoordinate
    to: ILineCoordinate
}) {
    const { stroke, strokeWidth } = props
    const { mapping } = utils

    ctx.save()
    ctx.beginPath()
    ctx.translate(mapping(to.x), mapping(to.y))
    let r
    switch (type) {
        case 'none':
            break
        case 'point':
            r = strokeWidth * 0.8 + 1
            ctx.fillStyle = stroke
            ctx.beginPath()
            ctx.arc(0, 0, r, 0, Math.PI * 2)
            ctx.fill()
            break
        case 'arrow':
            r = strokeWidth + 4
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.rotate(rotationAngle(from.y - to.y, from.x - to.x))
            ctx.beginPath()
            ctx.lineTo(-r, r)
            ctx.lineTo(0, 0)
            ctx.lineTo(r, r)
            ctx.stroke()
            break
        case 'triangle':
            r = strokeWidth * 1.5 + 4
            ctx.rotate(rotationAngle(from.y - to.y, from.x - to.x))
            ctx.fillStyle = stroke
            ctx.beginPath()
            ctx.lineTo(0, -r)
            ctx.lineTo((-r * Math.sqrt(3)) / 2, r / 2)
            ctx.lineTo((r * Math.sqrt(3)) / 2, r / 2)
            ctx.fill()
            break
        default:
    }

    ctx.restore()
}
