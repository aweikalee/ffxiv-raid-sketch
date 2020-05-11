import { IMark, MARK } from '../img/mark/map'
import { keyToKeyValue } from './utils'

export type IMarkAlias =
    | IMark
    | '攻击1'
    | '攻击2'
    | '攻击3'
    | '攻击4'
    | '攻击5'
    | '攻击6'
    | '攻击7'
    | '攻击8'
    | '止步1'
    | '止步2'
    | '止步3'
    | '止步4'
    | '止步5'
    | '止步6'
    | '止步7'
    | '止步8'
    | '禁止1'
    | '禁止2'
    | '禁止3'
    | '禁止4'
    | '禁止5'
    | '禁止6'
    | '禁止7'
    | '禁止8'
    | '方块'
    | '圆圈'
    | '十字'
    | '三角'

/**
 * @ignore
 */
export const MAKR_ALIAS: {
    [key in IMarkAlias]: IMark
} = {
    ...keyToKeyValue(MARK),

    攻击1: 'attack1',
    攻击2: 'attack2',
    攻击3: 'attack3',
    攻击4: 'attack4',
    攻击5: 'attack5',
    攻击6: 'attack6',
    攻击7: 'attack7',
    攻击8: 'attack8',

    止步1: 'bind1',
    止步2: 'bind2',
    止步3: 'bind3',
    止步4: 'bind4',
    止步5: 'bind5',
    止步6: 'bind6',
    止步7: 'bind7',
    止步8: 'bind8',

    禁止1: 'stop1',
    禁止2: 'stop2',
    禁止3: 'stop3',
    禁止4: 'stop4',
    禁止5: 'stop5',
    禁止6: 'stop6',
    禁止7: 'stop7',
    禁止8: 'stop8',

    方块: 'square',
    圆圈: 'circle',
    十字: 'cross',
    三角: 'triangle',
}
