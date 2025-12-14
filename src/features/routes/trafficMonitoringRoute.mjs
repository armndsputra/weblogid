import  { Router }  from 'express'
const router = Router()
import jwt from 'jsonwebtoken'

class trafficVisitor {

    constructor(maxSize = 12) {
        this.maxSize = maxSize
        this.data = []
        this.lock = false
    }

    add(visitor) {
        if (this.lock) return
        this.lock = true

        this.data.push(visitor)
        if (this.data.length > this.maxSize) {
            this.data = this.data.slice(-this.maxSize / 2)
        }

        this.lock = false
    }

    getAll() {
        return this.data
    }

    clear() {
        this.data = []
    }

}

const trafficData = new trafficVisitor(12)

router.use((req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '')

    let userId = []

    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
        if (decoded) {
            userId = decoded.id
        } else {
            userId = 'guest'
        }
    });

    const visitorData = {
        ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        user : userId,
        userAgent: req.headers['user-agent'],
        method: req.method,
        url: req.url,
        timestamp: new Date().toISOString(),
        referrer: req.headers['referer'] || req.headers['referrer'],
        language: req.headers['accept-language']
    };
    
    trafficData.add(visitorData)
    trafficData.clear()
    console.log('traffic data : ', trafficData.getAll())
    next()
})

export default router