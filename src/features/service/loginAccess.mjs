import jwt from 'jsonwebtoken';

export const loginAccess = async (req, res ,next) => {

    try {
        
        // 1. fetch token request header
        const token = req.header('Authorization')?.replace('Bearer ', '')
        
        // 2. check if token is undifind
        if (!token) {
            return next();
        }

        // 3. verify token jwt
        jwt.verify(token, process.env.JWT_KEY, function (err, decode) {
            if (err) {
                // 3.1 if token is expired next to login page
                // console.error(err)
                console.error('token verification failed:', err.message)
                return next()
            }
            // 3.2 if token actice don't next to login page
            return res.status(403).json({ message : 'access token is active', user: decode })
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            message : 'authorization failed !',
        })
    }
}