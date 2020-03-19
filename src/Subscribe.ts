export default class Subscribe {
    map = new Map<string, Function[]>()
    constructor() {}

    on(type: string, event: Function) {
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

    off(type: string, event: Function) {
        if (!this.map.has(type)) {
            return
        }

        const arr = this.map.get(type)
        const index = arr.indexOf(event)
        if (index !== -1) {
            arr.splice(index, 1)
        }
    }

    emit(type: string, args: unknown[] = []) {
        if (!this.map.has(type)) {
            return
        }

        this.map.get(type).forEach(event => {
            event(...args)
        })
    }
}
