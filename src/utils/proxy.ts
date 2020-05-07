import { hasOwn } from './object'

export type IProxyChange<T> = <K extends keyof T>(
    key: K,
    oldValue: T[K],
    newValue: unknown,
    target: T
) => void

export function proxy<T extends object>(
    target: T,
    onChange: IProxyChange<T>
): T {
    const isArray = Array.isArray(target)

    return new Proxy(target, {
        set(target, key, value, receiver) {
            const oldValue = target[key]
            const hadChange = oldValue !== value
            const res = Reflect.set(target, key, value, receiver)
            if (hadChange && hasOwn(target, key)) {
                onChange(key as keyof T, oldValue, value, target)
            }
            return res
        },
        deleteProperty(target, key) {
            const oldValue = target[key]
            const res = Reflect.deleteProperty(target, key)
            if (!isArray) {
                onChange(key as keyof T, oldValue, undefined, target)
            }
            return res
        },
    })
}
