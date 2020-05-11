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
 * @ignore
 */
export function rotateVector(x: number, y: number, angle: number) {
    return [
        Math.cos(angle) * x - Math.sin(angle) * y,
        Math.sin(angle) * x + Math.cos(angle) * y,
    ]
}
