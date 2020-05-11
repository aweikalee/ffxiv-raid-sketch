import tank from './tank.png'
import gladiator from './gladiator.png'
import marauder from './marauder.png'
import paladin from './paladin.png'
import warrior from './warrior.png'
import darkknight from './darkknight.png'
import gunbreaker from './gunbreaker.png'

import healer from './healer.png'
import conjurer from './conjurer.png'
import whitemage from './whitemage.png'
import scholar from './scholar.png'
import astrologian from './astrologian.png'

import dps from './dps.png'
import melee from './melee.png'
import physicalranged from './physicalranged.png'
import magicalranged from './magicalranged.png'
import pugilist from './pugilist.png'
import lancer from './lancer.png'
import rogue from './rogue.png'
import archer from './archer.png'
import thaumaturge from './thaumaturge.png'
import arcanist from './arcanist.png'
import monk from './monk.png'
import dragoon from './dragoon.png'
import ninja from './ninja.png'
import samurai from './samurai.png'
import bard from './bard.png'
import machinist from './machinist.png'
import dancer from './dancer.png'
import blackmage from './blackmage.png'
import summoner from './summoner.png'
import redmage from './redmage.png'
import bluemage from './bluemage.png'

import libero from './libero.png'

export type IJob =
    | 'tank'
    | 'gladiator'
    | 'marauder'
    | 'paladin'
    | 'warrior'
    | 'darkknight'
    | 'gunbreaker'
    | 'healer'
    | 'conjurer'
    | 'whitemage'
    | 'scholar'
    | 'astrologian'
    | 'dps'
    | 'melee'
    | 'physicalranged'
    | 'magicalranged'
    | 'pugilist'
    | 'lancer'
    | 'rogue'
    | 'archer'
    | 'thaumaturge'
    | 'arcanist'
    | 'monk'
    | 'dragoon'
    | 'ninja'
    | 'samurai'
    | 'bard'
    | 'machinist'
    | 'dancer'
    | 'blackmage'
    | 'summoner'
    | 'redmage'
    | 'bluemage'
    | 'bluemagetank'
    | 'bluemagehealer'
    | 'libero'

/**
 * @ignore
 */
export const JOB: {
    [key in IJob]: string
} = {
    tank,
    gladiator,
    marauder,
    paladin,
    warrior,
    darkknight,
    gunbreaker,

    healer,
    conjurer,
    whitemage,
    scholar,
    astrologian,

    dps,
    melee,
    physicalranged,
    magicalranged,
    pugilist,
    lancer,
    rogue,
    archer,
    thaumaturge,
    arcanist,
    monk,
    dragoon,
    ninja,
    samurai,
    bard,
    machinist,
    dancer,
    blackmage,
    summoner,
    redmage,
    bluemage,
    bluemagetank: bluemage,
    bluemagehealer: bluemage,

    libero,
}

/**
 * @ignore
 */
export const JOB_COLOR = {
    tank: '#4494f0',
    healer: '#64aa4f',
    dps: '#c25859',
    other: '#aaaaaa',
}

/**■
 * @ignore
 */
export const JOB_TYPE: {
    [key in IJob]: keyof typeof JOB_COLOR
} = {
    tank: 'tank',
    gladiator: 'tank',
    marauder: 'tank',
    paladin: 'tank',
    warrior: 'tank',
    darkknight: 'tank',
    gunbreaker: 'tank',

    healer: 'healer',
    conjurer: 'healer',
    whitemage: 'healer',
    scholar: 'healer',
    astrologian: 'healer',

    dps: 'dps',
    melee: 'dps',
    physicalranged: 'dps',
    magicalranged: 'dps',
    pugilist: 'dps',
    lancer: 'dps',
    rogue: 'dps',
    archer: 'dps',
    thaumaturge: 'dps',
    arcanist: 'dps',
    monk: 'dps',
    dragoon: 'dps',
    ninja: 'dps',
    samurai: 'dps',
    bard: 'dps',
    machinist: 'dps',
    dancer: 'dps',
    blackmage: 'dps',
    summoner: 'dps',
    redmage: 'dps',
    bluemage: 'dps',
    bluemagetank: 'tank',
    bluemagehealer: 'healer',

    libero: 'other',
}
