/**
 * @ignore
 */
const hasOwnProperty = Object.hasOwnProperty.call.bind(Object.hasOwnProperty)

/**
 * @ignore
 */
export function hasOwn(target: object, key: unknown) {
    return hasOwnProperty(target, key)
}
