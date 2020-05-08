/**
 * 深拷贝
 *
 * 暂时只支持 普通object/array
 * @param target object/array
 */
export function deepClone<T>(target: T): T {
    if (typeof target === 'object' && target !== null) {
        let cloneTarget = (Array.isArray(target) ? [] : {}) as T
        for (const key in target) {
            cloneTarget[key] = deepClone(target[key])
        }
        return cloneTarget
    } else {
        return target
    }
}
