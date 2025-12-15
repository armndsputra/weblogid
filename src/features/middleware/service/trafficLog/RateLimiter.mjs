class RateLimiter {
    constructor(windowMs, max) {
        this.windowMs = windowMs
        this.max = max
        this.requests = new Map()
        
        // Auto cleanup
        setInterval(() => this.cleanup(), windowMs * 2)
    }

    check(ip) {
        const now = Date.now()
        const client = this.requests.get(ip) || { count: 0, start: now }
        
        if (now - client.start > this.windowMs) {
            client.count = 1
            client.start = now
        } else {
            client.count++
        }
        
        this.requests.set(ip, client)
        return client.count <= this.max
    }

    cleanup() {
        const now = Date.now()
        for (const [ip, data] of this.requests.entries()) {
            if (now - data.start > this.windowMs) {
                this.requests.delete(ip)
            }
        }
    }

    showRequests() {
        return this.requests
    }
}

export { RateLimiter }