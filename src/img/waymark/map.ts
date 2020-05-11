import one from './1.png'
import two from './2.png'
import three from './3.png'
// import four from './4.png'
import A from './a.png'
import B from './b.png'
import C from './c.png'
import D from './d.png'

export type IWaymark =
    | 1
    | 2
    | 3
    // | 4
    | 'A'
    | 'B'
    | 'C'
    | 'D'

/**
 * @ignore
 */
export const WAYMARK: {
    [key in IWaymark]: string
} = {
    1: one,
    2: two,
    3: three,
    // 4: four,
    A,
    B,
    C,
    D,
}

/**
 * @ignore
 */
export const WAYMARK_COLOR_MAP = {
    red: '#ff444e',
    yellow: '#fcff44',
    blue: '#448cff',
    purple: '#9b44ff',
}

/**
 * @ignore
 */
export const WAYMARK_COLOR: {
    [key in IWaymark]: string
} = {
    1: WAYMARK_COLOR_MAP.red,
    2: WAYMARK_COLOR_MAP.yellow,
    3: WAYMARK_COLOR_MAP.blue,
    // '4': WAYMARK_COLOR_MAP.purple,
    A: WAYMARK_COLOR_MAP.red,
    B: WAYMARK_COLOR_MAP.yellow,
    C: WAYMARK_COLOR_MAP.blue,
    D: WAYMARK_COLOR_MAP.purple,
}
