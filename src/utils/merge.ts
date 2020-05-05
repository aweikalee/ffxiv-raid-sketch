/**
 * 合并设置, b将会合并到a
 */
export function merge<T extends object>(a: T, b: Partial<T>) {
    for (let i in b) {
        if (b[i] !== undefined) {
            a[i] = b[i]
        }
    }
    return a
}