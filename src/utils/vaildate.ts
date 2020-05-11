/**
 * @ignore
 */
export type IValidtorRule<T> = {
    [key in keyof T]: (newValue: unknown, oldValue: unknown) => T[key]
}

/**
 * @ignore
 */
export type IValidtor<T, K extends keyof T> = (
    target: T,
    key: K,
    newValue: unknown,
    oldValue: unknown
) => Promise<T[K]>

/**
 * @ignore
 */
export function createValidator<T, K extends keyof T = keyof T>(
    validators: IValidtorRule<T>
): IValidtor<T, K> {
    return (target, key, newValue, oldValue) => {
        return new Promise((resolve) => {
            let res: T[K]
            if (key in validators) {
                res = validators[key](newValue, oldValue)
            } else {
                res = newValue as T[K]
            }
            target[key] = res
            return resolve(res)
        })
    }
}

/**
 * @ignore
 */
export function isNumber(value: unknown): value is number {
    return typeof value === 'number'
}

/**
 * @ignore
 */
export function isString(value: unknown): value is string {
    return typeof value === 'string'
}

/**
 * @ignore
 */
export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean'
}

/**
 * @ignore
 */
export function isCanvasGradient(value: unknown): value is CanvasGradient {
    return value instanceof CanvasGradient
}

/**
 * @ignore
 */
export function isCanvasPattern(value: unknown): value is CanvasPattern {
    return value instanceof CanvasPattern
}

/**
 * @ignore
 */
export function isCanvasTextAlign(value: unknown): value is CanvasTextAlign {
    return ['center', 'end', 'left', 'right', 'start'].includes(value as string)
}

/**
 * @ignore
 */
export function isArray<T = any>(
    value: unknown,
    typeCheck?: (value: unknown) => boolean
): value is T[] {
    return (
        Array.isArray(value) &&
        (typeCheck ? value.every((v) => typeCheck(v)) : true)
    )
}
