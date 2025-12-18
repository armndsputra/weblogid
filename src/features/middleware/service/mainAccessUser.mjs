import jwt from 'jsonwebtoken'
import chalk from 'chalk';

export const mainAccessUser = async ( req, res, next ) => {

    try {

        // 1. fetch token request header
        const token = req.header('Authorization')?.replace('Bearer ', '')
                
        // 2. check if token is undifind
        if (!token) {
            return res.status(403).json({ 
                success: false,
                message : 'forbidden : authentication required!'
            })
        }

        // 3. verify token jwt
        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            if (err) {
                // 3.1 if token is expired don't next to delete access
                // console.error(err)
                console.error(chalk.red('Token verification failed:'), chalk.yellow(err.message));
                    return res.status(400).json({
                        success: false,
                        message : 'forbidden : access token has been expired!'
                    })
            }
            // 3.2 if token active next to delete access
            console.log('---------------------------------------------------------------------')
            console.log(chalk.green('Token verified successfully. Decoded payload :'));
            console.table(decoded)
            console.log('---------------------------------------------------------------------')
            if (decoded.role === 'user') {
                req.decoded = decoded
                return next()
            } else return res.status(403).json({ 
                success: false,
                message : 'forbidden : access is restricted!'
            })
        })


    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message : 'error in access user process!',
        })
    }

}