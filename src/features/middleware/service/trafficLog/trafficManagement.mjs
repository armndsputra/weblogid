import chalk from 'chalk'

export const saveTrafficLog = async (logData) => {

    try {

        console.log('-----------------------------------------------------------------------')
        console.log('Show Traffic Log :')
        console.log('-----------------------------------------------------------------------')
        console.log( 'IP        :', logData?.ip)
        console.log( 'UserID    :', logData?.userID)
        console.log( 'Username  :', logData?.username)
        console.log( 'UserAgent :', logData?.userAgent)
        console.log( 'URL       :', logData?.url)
        console.log( 'Method    :', logData?.method)
        console.log( 'Referrer  :', logData?.referrer)
        console.log( 'Timestamp :', logData?.timestamp)
        console.log('-----------------------------------------------------------------------')

        if (logData == null) {
            console.log(chalk.red('No log data provided. Skipping save operation'))
            return
        }

        const { ip, userID, username, userAgent, url, method, referrer, timestamp } = logData

        const TrafficLogModel = await import('../../../models/trafficLogModel.mjs')
        const TrafficLog = TrafficLogModel.default

        const newLog = new TrafficLog({
            ip: ip,
            userID: userID,
            username: username,
            userAgent: userAgent || null,
            url: url,
            method: method,
            referrer: referrer,
            timestamp: timestamp,
            createdAt: new Date()
        })

        await newLog.save()


    } catch (err) {
        console.error('Error saving traffic log:', err)
    }

}