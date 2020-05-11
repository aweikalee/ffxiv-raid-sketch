export type IPropertyDescriptor<T> = {
    configurable?: boolean
    enumerable?: boolean
    value?: T
    writable?: boolean
    get?(): T
    set?(v: T): void
}

/**
 * @ignore
 */
export function defineImmutable<T, K extends keyof T>(
    o: T,
    p: K,
    target: T[K]
) {
    return Object.defineProperty(o, p, {
        get() {
            return target
        },
        set() {
            console.log(o)
            throw new Error(`${p} is immutable`)
        },
    })
}

/**
 * @ignore
 */
export function defineProperties<T>(
    o: T,
    properties: {
        [K in keyof T]?: IPropertyDescriptor<T[K]>
    }
) {
    return Object.defineProperties(o, properties)
}
