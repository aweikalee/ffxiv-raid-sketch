import { IWaymark } from '../img/waymark/map'

export type IWaymarkAlias =
    | IWaymark
    | '1'
    | '2'
    | '3'
    // | '4'
    | 'a'
    | 'b'
    | 'c'
    | 'd'

/**
 * @ignore
 */
export const WAYMARK_ALIAS: {
    [key in IWaymarkAlias]: IWaymark
} = {
    1: 1,
    2: 2,
    3: 3,
    // 4: 4,
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    a: 'A',
    b: 'B',
    c: 'C',
    d: 'D',
}
