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
export function keyToKeyValue<T extends {}>(target: T) {
    const res = {} as {
        [K in keyof T]: K
    }

    Object.keys(target).forEach((key) => {
        res[key] = key
    })

    return res
}
