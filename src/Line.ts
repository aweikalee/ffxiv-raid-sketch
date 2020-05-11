import Layer, { ILayerState, ILayerEvent } from './Layer'
import { ISketchUtils } from './Sketch'
import {
    proxy,
    deepClone,
    merge,
    rotationAngleY,
    defineImmutable,
} from './utils/index'
import * as valid from './utils/vaildate'

export interface ILineCoordinate {
    x: number
    y: number
}

export type ILineCap = 'none' | 'point' | 'arrow' | 'triangle'

export interface ILineProps {
    /**
     * 点的坐标
     */
    coordinates: (readonly number[])[]

    /**
     * 光滑
     */
    smooth: boolean

    /**
     * 线段样式
     */
    dash: readonly number[] | null

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
    coordinates: (coordinates: ILineProps['coordinates']) => void
    smooth: (smooth: ILineProps['smooth']) => void
    dash: (dash: ILineProps['dash']) => void
    startCap: (cap: ILineCap) => void
    endCap: (cap: ILineCap) => void
}

/**
 * @ignore
 */
const LINECAP: ILineCap[] = ['none', 'point', 'arrow', 'triangle']

/**
 * @ignore
 */
const validator = valid.createValidator<ILineProps>({
    coordinates(value) {
        if (
            !valid.isArray<number[]>(value, (v) => {
                return valid.isArray<number>(v, valid.isNumber) && v.length >= 2
            })
        ) {
            throw new Error('coordinates must be a number[][]')
        }

        return value
    },
    smooth(value) {
        if (!valid.isBoolean(value)) {
            throw new Error('smooth must be a boolean')
        }

        return value
    },
    dash(value) {
        if (!(value === null || valid.isArray<number>(value, valid.isNumber))) {
            throw new Error('dash must be a number[]/null')
        }

        return value
    },
    startCap(value) {
        if (!isLineCap(value)) {
            throw new Error('startCap must be a number[]/null')
        }

        return value
    },
    endCap(value) {
        if (!isLineCap(value)) {
            throw new Error('endCap must be a number[]/null')
        }

        return value
    },
})

/**
 * 可绘制 折线、二次曲线、贝塞尔曲线（任意组合）
 */
export default class Line extends Layer<ILineEvent> {
    props: ILineProps

    constructor(
        state: Partial<ILayerState> = {},
        props: Partial<ILineProps> = {}
    ) {
        super({
            fill: 'transparent',
            stroke: '#c79a66',
            ...state,
        })

        const theProps = proxyProps(this, {
            coordinates: proxyCoordinates(this, []),
            smooth: false,
            dash: null,
            startCap: 'none',
            endCap: 'none',
        })

        defineImmutable(this, 'props', theProps)

        merge(this.props, props)
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
        const arr = [x, y, cp1x, cp1y, cp2x, cp2y]
        while (arr.length) {
            const cur = arr.pop()
            if (cur !== undefined) {
                arr.push(cur)
                break
            }
        }
        this.props.coordinates.push(arr)

        return this
    }

    /**
     * 清空所有坐标点
     */
    clear() {
        this.props.coordinates = []
        return this
    }

    /**
     * 设置出发端点样式
     */
    startCap(value: ILineCap) {
        this.props.startCap = value
        return this
    }

    /**
     * 设置结束端点样式
     */
    endCap(value: ILineCap) {
        this.props.endCap = value
        return this
    }

    /**
     * 光滑折线（曲线点不受影响）
     */
    smooth(value: ILineProps['smooth']) {
        this.props.smooth = value
        return this
    }

    /**
     * 设置线段样式
     *
     * 数值最后将 * strokeWidth 后再被应用
     */
    dash(value: ILineProps['dash']) {
        this.props.dash = value
        return this
    }

    protected _clone() {
        return new Line(deepClone(this.state), deepClone(this.props))
    }

    protected _render(ctx: CanvasRenderingContext2D, utils: ISketchUtils) {
        const { state, props } = this
        const { coordinates: coord, startCap, endCap } = this.props

        /* 绘制线 */
        drawLine({
            state,
            props,
            ctx,
            utils,
        })

        /* 绘制线帽 */
        if (coord.length >= 2) {
            const end = [coord[coord.length - 2], coord[coord.length - 1]]
            const startFrom = { x: coord[1][0], y: coord[1][1] }
            const startTo = {
                x: coord[0][coord[0].length - 2],
                y: coord[0][coord[0].length - 1],
            }
            const endFrom =
                end[1].length === 2
                    ? {
                          x: end[0][end[0].length - 2],
                          y: end[0][end[0].length - 1],
                      }
                    : {
                          x: end[1][end[1].length - 4],
                          y: end[1][end[1].length - 3],
                      }
            const endTo = {
                x: end[1][end[1].length - 2],
                y: end[1][end[1].length - 1],
            }

            drawCap({
                state,
                ctx,
                utils,
                type: startCap,
                from: startFrom,
                to: startTo,
            })
            drawCap({
                state,
                ctx,
                utils,
                type: endCap,
                from: endFrom,
                to: endTo,
            })
        }
    }
}

/**
 * @ignore
 */
function proxyProps(that: Line, initialValue: ILineProps) {
    return proxy<ILineProps>(
        initialValue,
        (key, oldValue, newValue, target) => {
            validator(target, key, newValue, oldValue).then(
                (value) => {
                    if (key === 'coordinates') {
                        target['coordinates'] = proxyCoordinates(
                            that,
                            value as ILineProps['coordinates']
                        )
                    } else if (key === 'dash') {
                        Object.freeze(newValue)
                    }

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

/**
 * @ignore
 */
function proxyCoordinates(that: Line, initialValue: ILineProps['coordinates']) {
    return proxy<ILineProps['coordinates']>(
        initialValue,
        (key, oldValue, newValue, target) => {
            if (key >= 0) {
                if (!valid.isArray<number>(newValue, valid.isNumber)) {
                    oldValue
                        ? (target[key] = oldValue)
                        : target.splice(Number(key), 1)
                    throw new Error(`coordinates's value must be a number[]`)
                }

                const length = newValue.length
                if (key == 0 && length !== 2) {
                    throw new Error(`coordinates[0]'s length must equals 2`)
                } else if (
                    key != 0 &&
                    (length % 2 !== 0 || length > 6 || length < 2)
                ) {
                    throw new Error(
                        `coordinates value's length must equals 2/4/6`
                    )
                }

                target[key as number] = Object.freeze(newValue)
            }
            that.emit('coordinates', [that.props.coordinates])
            that.emit('change', [])
        }
    )
}

/**
 * @ignore
 */
function drawLine({
    state,
    props,
    ctx,
    utils,
}: {
    state: ILayerState
    props: ILineProps
    ctx: CanvasRenderingContext2D
    utils: ISketchUtils
}) {
    const { strokeWidth } = state
    const { coordinates, dash, smooth } = props
    const { mapping } = utils

    ctx.save()
    ctx.beginPath()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    /* 线段样式 */
    if (dash) {
        ctx.setLineDash(dash.map((v) => v * strokeWidth))
    }

    /* 绘制线段 */
    const _coordinates = [
        coordinates[0],
        coordinates[0],
        ...coordinates,
        coordinates[coordinates.length - 1],
    ]
    for (let i = 2, len = _coordinates.length - 1; i < len; i += 1) {
        const now = _coordinates[i]
        if (now.length === 6) {
            ctx.bezierCurveTo.apply(
                ctx,
                now.map((v) => mapping(v))
            )
            continue
        }

        if (now.length === 4) {
            ctx.quadraticCurveTo.apply(
                ctx,
                now.map((v) => mapping(v))
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
            _coordinates[i + 1],
        ]

        const level = 8
        const cp1x = c[1][0] + (c[2][0] - c[0][0]) / level
        const cp1y = c[1][1] + (c[2][1] - c[0][1]) / level
        const cp2x = c[2][0] - (c[3][0] - c[1][0]) / level
        const cp2y = c[2][1] - (c[3][1] - c[1][1]) / level

        if (i === len - 1) {
            ctx.quadraticCurveTo.apply(
                ctx,
                [cp1x, cp1y, now[0], now[1]].map((v) => mapping(v))
            )
            continue
        }

        if (i === 3) {
            ctx.quadraticCurveTo.apply(
                ctx,
                [cp2x, cp2y, now[0], now[1]].map((v) => mapping(v))
            )
            continue
        }

        ctx.bezierCurveTo.apply(
            ctx,
            [cp1x, cp1y, cp2x, cp2y, now[0], now[1]].map((v) => mapping(v))
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
    state,
    ctx,
    utils,
    type,
    from,
    to,
}: {
    state: ILayerState
    ctx: CanvasRenderingContext2D
    utils: ISketchUtils
    type: ILineCap
    from: ILineCoordinate
    to: ILineCoordinate
}) {
    const { stroke, strokeWidth } = state
    const { mapping } = utils

    ctx.save()
    ctx.beginPath()
    ctx.translate(mapping(to.x), mapping(to.y))
    let r: number
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
            ctx.rotate(rotationAngleY(to.x - from.x, to.y - from.y))
            ctx.beginPath()
            ctx.lineTo(-r, r)
            ctx.lineTo(0, 0)
            ctx.lineTo(r, r)
            ctx.stroke()
            break
        case 'triangle':
            r = strokeWidth * 1.5 + 4
            ctx.rotate(rotationAngleY(to.x - from.x, to.y - from.y))
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

/**
 * @ignore
 */
function isLineCap(value: unknown): value is ILineCap {
    return LINECAP.includes(value as ILineCap)
}
