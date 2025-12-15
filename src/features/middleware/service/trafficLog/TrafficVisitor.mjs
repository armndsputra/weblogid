export class TrafficVisitor {

    constructor(max = 10) {
        this.data = []
        this.max = max
    }

    add(visitor) {
        this.data.push(visitor)
        if (this.data.length > this.max) {
            this.data = this.data.slice(-this.max)
        }
    }

    getAll() {
        return [...this.data]
    }

    getNewest() {
        return this.data[this.data.length - 1] || null
    }

    clear() {
        this.data = []
    }

}