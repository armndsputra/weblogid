import jwt from 'jsonwebtoken'
import chalk from 'chalk'

export const loginAccess = async (req, res ,next) => {

    try {

        // return
        
        // 1. fetch token request header
        const token = req.header('Authorization')?.replace('Bearer ', '')
        
        // 2. check if token is undifind
        if (!token) {
            return next();
        }

        // 3. verify token jwt
        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            if (err) {
                // 3.1 if token is expired next to login page
                console.error('----------------------------------------------------------------------')
                console.error(chalk.red('Login Page : Access token verification failed : ', err.message))
                console.error('----------------------------------------------------------------------')
                return next()
            }
            // 3.2 if token actice don't next to login page
            return res.status(200).json({ 
                success: true,
                message : 'access token is active and valid', user: decoded 
            })
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            message : 'error in login access process!',
        })
    }
}