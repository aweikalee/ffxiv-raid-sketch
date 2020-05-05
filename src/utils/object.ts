const hasOwnProperty = Object.hasOwnProperty.call.bind(Object.hasOwnProperty)
export function hasOwn(target: object, key: unknown) {
    return hasOwnProperty(target, key)
}