import { hasOwn } from './object'

/**
 * @ignore
 */
export type IProxyChange<T> = <K extends keyof T>(
    key: K,
    oldValue: T[K],
    newValue: unknown,
    target: T
) => void

/**
 * @ignore
 */
export function proxy<T extends object>(
    target: T,
    onChange: IProxyChange<T>
): T {
    const isArray = Array.isArray(target)

    return new Proxy(target, {
        set(target, key, value, receiver) {
            const oldValue = target[key]
            const hadChange = oldValue !== value
            const hasOwnBeforeChange = hasOwn(target, key)
            const res = Reflect.set(target, key, value, receiver)
            if (hadChange && hasOwn(target, key)) {
                try {
                    onChange(key as keyof T, oldValue, value, target)
                } catch (err) {
                    if (hasOwnBeforeChange) {
                        target[key] = oldValue
                    } else {
                        if (isArray) {
                            ;(target as any[]).splice(key as number, 1)
                        } else {
                            delete target[key]
                        }
                    }
                    throw err
                }
            }
            return res
        },
        deleteProperty(target, key) {
            const oldValue = target[key]
            const res = Reflect.deleteProperty(target, key)
            if (!isArray) {
                try {
                    onChange(key as keyof T, oldValue, undefined, target)
                } catch (err) {
                    target[key] = oldValue
                    throw err
                }
            }
            return res
        },
    })
}
