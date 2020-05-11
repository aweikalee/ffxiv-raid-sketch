import { JOB, IJob } from '../img/job/map'

export type IJobAlias =
    | IJob
    | '防护'
    | '剑术师'
    | '斧术师'
    | '骑士'
    | '战士'
    | '暗黑骑士'
    | '绝枪战士'
    | '治疗'
    | '幻术师'
    | '白魔法师'
    | '学者'
    | '占星术士'
    | '进攻'
    | '近战'
    | '远程物理'
    | '远程魔法'
    | '格斗家'
    | '枪术师'
    | '双剑师'
    | '弓箭手'
    | '咒术师'
    | '秘术师'
    | '武僧'
    | '龙骑士'
    | '忍者'
    | '武士'
    | '吟游诗人'
    | '机工士'
    | '舞者'
    | '黑魔法师'
    | '召唤师'
    | '赤魔法师'
    | '青魔法师'
    | '防护青魔'
    | '治疗青魔'
    | '自由人'

/**
 * @ignore
 */
export const JOB_ALIAS: {
    [key in IJobAlias]: keyof typeof JOB
} = {
    tank: 'tank',
    gladiator: 'gladiator',
    marauder: 'marauder',
    paladin: 'paladin',
    warrior: 'warrior',
    darkknight: 'darkknight',
    gunbreaker: 'gunbreaker',

    healer: 'healer',
    conjurer: 'conjurer',
    whitemage: 'whitemage',
    scholar: 'scholar',
    astrologian: 'astrologian',

    dps: 'dps',
    melee: 'melee',
    physicalranged: 'physicalranged',
    magicalranged: 'magicalranged',
    pugilist: 'pugilist',
    lancer: 'lancer',
    rogue: 'rogue',
    archer: 'archer',
    thaumaturge: 'thaumaturge',
    arcanist: 'arcanist',
    monk: 'monk',
    dragoon: 'dragoon',
    ninja: 'ninja',
    samurai: 'samurai',
    bard: 'bard',
    machinist: 'machinist',
    dancer: 'dancer',
    blackmage: 'blackmage',
    summoner: 'summoner',
    redmage: 'redmage',
    bluemage: 'bluemage',
    bluemagetank: 'bluemagetank',
    bluemagehealer: 'bluemagehealer',

    libero: 'libero',

    防护: 'tank',
    剑术师: 'gladiator',
    斧术师: 'marauder',
    骑士: 'paladin',
    战士: 'warrior',
    暗黑骑士: 'darkknight',
    绝枪战士: 'gunbreaker',

    治疗: 'healer',
    幻术师: 'conjurer',
    白魔法师: 'whitemage',
    学者: 'scholar',
    占星术士: 'astrologian',

    进攻: 'dps',
    近战: 'melee',
    远程物理: 'physicalranged',
    远程魔法: 'magicalranged',
    格斗家: 'pugilist',
    枪术师: 'lancer',
    双剑师: 'rogue',
    弓箭手: 'archer',
    咒术师: 'thaumaturge',
    秘术师: 'arcanist',
    武僧: 'monk',
    龙骑士: 'dragoon',
    忍者: 'ninja',
    武士: 'samurai',
    吟游诗人: 'bard',
    机工士: 'machinist',
    舞者: 'dancer',
    黑魔法师: 'blackmage',
    召唤师: 'summoner',
    赤魔法师: 'redmage',
    青魔法师: 'bluemage',
    防护青魔: 'bluemagetank',
    治疗青魔: 'bluemagehealer',

    自由人: 'libero',
}
