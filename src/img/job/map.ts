import gladiator from './gladiator.png'
import marauder from './marauder.png'
import paladin from './paladin.png'
import warrior from './warrior.png'
import darkknight from './darkknight.png'
import gunbreaker from './gunbreaker.png'

import conjurer from './conjurer.png'
import whitemage from './whitemage.png'
import scholar from './scholar.png'
import astrologian from './astrologian.png'

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

export type IJob =
    | 'gladiator'
    | 'marauder'
    | 'paladin'
    | 'warrior'
    | 'darkknight'
    | 'gunbreaker'
    | 'conjurer'
    | 'whitemage'
    | 'scholar'
    | 'astrologian'
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

/**
 * @ignore
 */
export const JOB: {
    [key in IJob]: string
} = {
    gladiator,
    marauder,
    paladin,
    warrior,
    darkknight,
    gunbreaker,

    conjurer,
    whitemage,
    scholar,
    astrologian,

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
}

/**
 * @ignore
 */
export const JOB_COLOR = {
    tank: '#4494f0',
    healer: '#64aa4f',
    dps: '#c25859',
}

/**
 * @ignore
 */
export const JOB_TYPE: {
    [key in IJob]: keyof typeof JOB_COLOR
} = {
    gladiator: 'tank',
    marauder: 'tank',
    paladin: 'tank',
    warrior: 'tank',
    darkknight: 'tank',
    gunbreaker: 'tank',

    conjurer: 'healer',
    whitemage: 'healer',
    scholar: 'healer',
    astrologian: 'healer',

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
}
