/**
 * 向量相对y轴的旋转角
 *
 * 注意：此处坐标是图层坐标 不是数学坐标（y轴方向相反）
 * @ignore
 * */
export function rotationAngleY(x: number, y: number) {
    let angle = Math.acos(-y / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))

    return x > 0 ? angle : -angle
}

/**
 * 向量相对x轴的旋转角
 *
 * 注意：此处坐标是图层坐标 不是数学坐标（y轴方向相反）
 * @ignore
 * */
export function rotationAngleX(x: number, y: number) {
    return rotationAngleY(y, x)
}

/**
 * 向量旋转后的坐标
 * @ignore
 * */
export function rotateVector(x: number, y: number, angle: number) {
    return [
        Math.cos(angle) * x - Math.sin(angle) * y,
        Math.sin(angle) * x + Math.cos(angle) * y
    ]
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
