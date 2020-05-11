import { IWaymark, WAYMARK } from '../img/waymark/map'
import { keyToKeyValue } from './utils'

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
    ...keyToKeyValue(WAYMARK),
    a: 'A',
    b: 'B',
    c: 'C',
    d: 'D',
}
