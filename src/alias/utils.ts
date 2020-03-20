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
export function setAliasMapping<T>(map: T, alias: string, value: string) {
    if (!alias) throw new Error('alias is not a string')
    if (!value) throw new Error('value is not a string')
    if (alias in map)
        console.warn('alias already exists, value will be replaced')

    map[alias] = value
}
