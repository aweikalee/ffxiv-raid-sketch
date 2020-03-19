/**
 * 向量相对x轴的旋转角
 * @ignore
 * */
export function rotationAngle(x: number, y: number) {
    const x1 = 1
    const y1 = 0
    const z1 = 0
    const x2 = x
    const y2 = y
    const z2 = 0
    let angle = Math.acos(
        (x1 * x2 + y1 * y2 + z1 * z2) /
            Math.pow(
                (Math.pow(x1, 2) + Math.pow(y1, 2) + Math.pow(z1, 2)) *
                    (Math.pow(x2, 2) + Math.pow(y2, 2) + Math.pow(z2, 2)),
                1 / 2
            )
    )
    angle *= y2 > 0 ? -1 : 1

    return angle
}

/**
 * 合并设置, b将会合并到a
 * @ignore
 */
export function mergeOptions<T = {}>(a: T, b: Partial<T>) {
    for (let i in b) {
        if (b[i] !== undefined) {
            a[i] = b[i]
        }
    }
    return a
}

/**
 * 深拷贝
 * @ignore
 */
export function cloneDeep<T>(target: T) {
    // TODO: 更换为遍历形式的深拷贝
    return JSON.parse(JSON.stringify(target))
}
