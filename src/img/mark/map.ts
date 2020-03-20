import attack1 from './attack1.png'
import attack2 from './attack2.png'
import attack3 from './attack3.png'
import attack4 from './attack4.png'
import attack5 from './attack5.png'
import attack6 from './attack6.png'
import attack7 from './attack7.png'
import attack8 from './attack8.png'

import bind1 from './bind1.png'
import bind2 from './bind2.png'
import bind3 from './bind3.png'
import bind4 from './bind4.png'
import bind5 from './bind5.png'
import bind6 from './bind6.png'
import bind7 from './bind7.png'
import bind8 from './bind8.png'

import stop1 from './stop1.png'
import stop2 from './stop2.png'
import stop3 from './stop3.png'
import stop4 from './stop4.png'
import stop5 from './stop5.png'
import stop6 from './stop6.png'
import stop7 from './stop7.png'
import stop8 from './stop8.png'

import square from './square.png'
import circle from './circle.png'
import cross from './cross.png'
import triangle from './triangle.png'

export type IMark =
    | 'attack1'
    | 'attack2'
    | 'attack3'
    | 'attack4'
    | 'attack5'
    | 'attack6'
    | 'attack7'
    | 'attack8'
    | 'bind1'
    | 'bind2'
    | 'bind3'
    | 'bind4'
    | 'bind5'
    | 'bind6'
    | 'bind7'
    | 'bind8'
    | 'stop1'
    | 'stop2'
    | 'stop3'
    | 'stop4'
    | 'stop5'
    | 'stop6'
    | 'stop7'
    | 'stop8'
    | 'square'
    | 'circle'
    | 'cross'
    | 'triangle'

export const MARK: {
    [key in IMark]: string
} = {
    attack1,
    attack2,
    attack3,
    attack4,
    attack5,
    attack6,
    attack7,
    attack8,

    bind1,
    bind2,
    bind3,
    bind4,
    bind5,
    bind6,
    bind7,
    bind8,

    stop1,
    stop2,
    stop3,
    stop4,
    stop5,
    stop6,
    stop7,
    stop8,

    square,
    circle,
    cross,
    triangle
}
