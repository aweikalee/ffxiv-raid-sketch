/**
 * @ignore
 */
export type IKey<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never
}[keyof T]

/**
 * @ignore
 */
export class Subscribe<T extends {}> {
    map = new Map<IKey<T>, T[IKey<T>][]>()
    constructor() {}

    on<K extends IKey<T>>(type: K, event: T[K]) {
        if (!this.map.has(type)) {
            this.map.set(type, [])
        }

        const arr = this.map.get(type)
        const index = arr.indexOf(event)
        if (index !== -1) {
            arr.splice(index, 1)
        }

        arr.push(event)
    }

    once<K extends IKey<T>>(type: K, event: T[K]) {
        const fn: any = (...args: any[]) => {
            ;(event as any)(...args)
            this.off(type, fn as T[K])
        }
        this.on(type, fn as T[K])
    }

    off<K extends IKey<T>>(type: K, event: T[K]) {
        if (!this.map.has(type)) {
            return
        }

        const arr = this.map.get(type)
        const index = arr.indexOf(event)
        if (index !== -1) {
            arr.splice(index, 1)
        }
    }

    emit<K extends IKey<T>>(type: K, args: Parameters<T[K]>) {
        if (!this.map.has(type)) {
            return
        }

        this.map.get(type).forEach((event) => {
            ;(event as T[K])(...args)
        })
    }
}
