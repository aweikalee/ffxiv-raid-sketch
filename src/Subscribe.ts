export default class Subscribe<T = string> {
    map = new Map<T, ((...args: any[]) => void)[]>()
    constructor() {}

    on<F extends (...args: any[]) => void>(type: T, event: F) {
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

    once<F extends (...args: any[]) => void>(type: T, event: F) {
        const fn = (...args: Parameters<F>) => {
            event(...args)
            this.off(type, fn)
        }
        this.on(type, fn)
    }

    off<F extends (...args: any[]) => void>(type: T, event: F) {
        if (!this.map.has(type)) {
            return
        }

        const arr = this.map.get(type)
        const index = arr.indexOf(event)
        if (index !== -1) {
            arr.splice(index, 1)
        }
    }

    emit<F extends (...args: any[]) => void>(type: T, args?: Parameters<F>) {
        if (!this.map.has(type)) {
            return
        }

        this.map.get(type).forEach(event => {
            event(...(args || []))
        })
    }
}