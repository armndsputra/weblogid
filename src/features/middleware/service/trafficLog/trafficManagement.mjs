export const saveTrafficLog = async (logData) => {

    try {

        // console.log('show traffic log:', logData)
        if (logData == null) {
            console.log('No log data to save.')
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