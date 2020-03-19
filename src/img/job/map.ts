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

export const JOB = {
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
    bluemage
}

export const JOB_TYPE_MAP = {
    tank: 'tank',
    healer: 'healer',
    dps: 'dps'
}

export const JOB_COLOR = {
    tank: '#4494f0',
    healer: '#64aa4f',
    dps: '#c25859'
}

export const JOB_TYPE: {
    [key in keyof typeof JOB]: string
} = {
    gladiator: JOB_TYPE_MAP.tank,
    marauder: JOB_TYPE_MAP.tank,
    paladin: JOB_TYPE_MAP.tank,
    warrior: JOB_TYPE_MAP.tank,
    darkknight: JOB_TYPE_MAP.tank,
    gunbreaker: JOB_TYPE_MAP.tank,

    conjurer: JOB_TYPE_MAP.healer,
    whitemage: JOB_TYPE_MAP.healer,
    scholar: JOB_TYPE_MAP.healer,
    astrologian: JOB_TYPE_MAP.healer,

    pugilist: JOB_TYPE_MAP.dps,
    lancer: JOB_TYPE_MAP.dps,
    rogue: JOB_TYPE_MAP.dps,
    archer: JOB_TYPE_MAP.dps,
    thaumaturge: JOB_TYPE_MAP.dps,
    arcanist: JOB_TYPE_MAP.dps,
    monk: JOB_TYPE_MAP.dps,
    dragoon: JOB_TYPE_MAP.dps,
    ninja: JOB_TYPE_MAP.dps,
    samurai: JOB_TYPE_MAP.dps,
    bard: JOB_TYPE_MAP.dps,
    machinist: JOB_TYPE_MAP.dps,
    dancer: JOB_TYPE_MAP.dps,
    blackmage: JOB_TYPE_MAP.dps,
    summoner: JOB_TYPE_MAP.dps,
    redmage: JOB_TYPE_MAP.dps,
    bluemage: JOB_TYPE_MAP.dps
}
