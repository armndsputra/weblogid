import  { Router }  from 'express'
const router = Router()
import jwt from 'jsonwebtoken'
import chalk from 'chalk';

import { TrafficVisitor } from '../middleware/service/trafficLog/TrafficVisitor.mjs'
import { RateLimiter } from '../middleware/service/trafficLog/RateLimiter.mjs'


const rateLimiter = new RateLimiter(60000, 10) // 100 requests per minute
const trafficData = new TrafficVisitor(10)

router.use(async(req, res, next) => {

    try {

        const clientIp = req.ip || req.socket.remoteAddress || req.headers['x-forwarded-for']
        // console.log('Client IP:', clientIp)

        console.log('Current rate limiter state:', rateLimiter.showRequests())

        // console.log(5 <= 0) // false
        // console.log(rateLimiter.check(clientIp))
        if (!rateLimiter.check(clientIp)) {
            console.warn(chalk.red(`Rate limit exceeded for IP: ${clientIp}`))
            // return res.status(429).json({ error: 'Too many requests. Please try again later.' })
            return next()
        }


        let user = { id: 'unknown', username: 'unknown' }
        const token = req.header('Authorization')?.replace('Bearer ', '')
        
        if (token && process.env.JWT_KEY) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY)
                user = { 
                    id: decoded.id || user.id, 
                    username: decoded.username || user.username 
                }
            } catch (err) {
                console.warn(`Invalid JWT token from IP: ${clientIp}`)
                return next()
            }
        }

        const visitorData = {
            ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            userID : user.id,
            username : user.username,
            userAgent: req.headers['user-agent'],
            method: req.method,
            url: req.url,
            timestamp: new Date().toISOString(),
            referrer: req.headers['referer'] || req.headers['referrer'],
            language: req.headers['accept-language']
        }

        trafficData.add(visitorData)

        // console.log('traffic data : ', trafficData.getAll())
        // console.log('traffic data size : ', trafficData.getSize())
        // console.log('newest visitor : ', trafficData.getNewest())


        res.on('finish', async () => {

            try {

                const { saveTrafficLog } = await import('../middleware/service/trafficLog/trafficManagement.mjs')
                saveTrafficLog(trafficData.getNewest())

            } catch (err) {
                console.error('Error saving traffic log:', err)
                return next()
            }
            
        })

        next()

    } catch(err) {
        console.error('Error in traffic log middleware:', err)
        return next()
    }
    
})

export default router