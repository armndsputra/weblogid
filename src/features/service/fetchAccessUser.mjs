import jwt from 'jsonwebtoken'

export const fetchAccessUser = async ( req, res, next ) => {

    try {

        // 1. fetch token request header
        const token = req.header('Authorization')?.replace('Bearer ', '')
                
        // 2. check if token is undifind
        if (!token) {
            return res.status(403).json({ message : 'forbidden : authentication required!'})
        }

        // 3. verify token jwt
        jwt.verify(token, process.env.JWT_KEY, function (err, decode) {
            if (err) {
                // 3.1 if token is expired don't next to delete access
                // console.error(err)
                console.error('token verification failed : ', err.message)
                    return res.status(400).json({
                        message : 'forbidden : access token has been expired!'
                    })
            }
            // 3.2 if token active next to delete access
            console.table(decode)
            if (decode.role === 'admin') {
                req.decode = decode
                return next()
            } else return res.status(403).json({ message : 'forbidden : the user does not have access!'})
        })

    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system!',
        })
    }

}