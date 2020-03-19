import { MARK } from '../img/mark/map'

export const MAKR_ALIAS: {
    [key: string]: keyof typeof MARK
} = {
    ...(() => {
        const keys = Object.keys(MARK)
        const result = {}
        keys.forEach(key => {
            result[key] = key
        })
        return result
    })(),

    ...(() => {
        const result = {}
        for (let i = 1; i < 6; i += 1) {
            result[`攻击${i}`] = `attack${i}`
        }
        for (let i = 1; i < 4; i += 1) {
            result[`止步${i}`] = `bind${i}`
        }
        for (let i = 1; i < 3; i += 1) {
            result[`禁止${i}`] = `stop${i}`
        }
        return result
    })(),

    方块: 'square',
    圆圈: 'circle',
    十字: 'cross',
    三角: 'triangle'
}
