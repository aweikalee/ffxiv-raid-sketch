/**
 * 合并对象, b将会合并到a
 */
export function merge<T extends object>(a: T, b: Partial<T>) {
    return Object.assign(a, b)
}
