// npm package manager
import jwt from 'jsonwebtoken';

// helper
import { __read_data } from '../../helpers/__read_data.mjs';

export const deleteAccessUser = async ( req, res, next ) => {

    try {

        // 1. fetch token request header
        const token = req.header('Authorization')?.replace('Bearer ', '')
                
        // 2. check if token is undifind
        if (!token) {
            return res.status(403).json({ message : 'access token failed!'})
        }
        
        // 3. verify token jwt
        jwt.verify(token, process.env.JWT_KEY, function (err, decode) {
            if (err) {
                // 3.1 if token is expired don't next to delete access
                // console.error(err)
                console.error('token verification failed : ', err.message)
                return res.status(400).json({
                    message : 'access token has been expired!'
                })
            }
            // 3.2 if token active next to delete access
            console.table(decode)
            if (decode.role === 'admin') {
                req.decode
                return next()
            } else
            return res.status(403).json({ message : 'forbiden access!'})
        })

    } catch (err)  {
         // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}