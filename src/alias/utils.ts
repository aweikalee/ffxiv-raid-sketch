import { IMG_ALIAS } from './img'


/**
 * @ignore
 */
export function setAlias<T>(map: T, name: keyof T, alias: string) {
    if (!(name in map)) throw new Error('alias target is not found')

    if (!alias || typeof alias !== 'string')
        throw new Error('alias is not a string')

    if (alias in map) throw new Error('alias already exists')

    map[alias] = map[name]
}


/**
 * @ignore
 */
export function setImgAlias(alias: string, value: string) {
    if (!alias) throw new Error('alias is not a string')
    if (!value) throw new Error('alias is not a string')
    if (alias in IMG_ALIAS)
        console.warn('alias already exists, value will be replaced')

    IMG_ALIAS[alias] = value
}
