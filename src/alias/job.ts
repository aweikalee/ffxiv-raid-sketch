import { JOB } from '../img/job/map'

export const JOB_ALIAS: {
    [key: string]: keyof typeof JOB
} = {
    ...(() => {
        const keys = Object.keys(JOB)
        const result = {}
        keys.forEach(key => {
            result[key] = key
        })
        return result
    })(),

    剑术师: 'gladiator',
    斧术师: 'marauder',
    骑士: 'paladin',
    战士: 'warrior',
    暗黑骑士: 'darkknight',
    绝枪战士: 'gunbreaker',

    幻术师: 'conjurer',
    白魔法师: 'whitemage',
    学者: 'scholar',
    占星术士: 'astrologian',

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
    青魔法师: 'bluemage'
}
