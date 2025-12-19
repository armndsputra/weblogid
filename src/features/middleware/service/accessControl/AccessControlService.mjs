import jwt from 'jsonwebtoken'
import chalk from 'chalk';

export class AccessControlService {

    allowAccess(role = 'unknown') {

        if (!role) {
            throw new Error('Role is required to get access middleware')
        }

        return (req, res, next) => {

            try {

                if (!req.header('Authorization')) {
                    return res.status(403).json({ 
                    success: false,
                    message : 'forbidden : authentication required!'
                    })
                }

                const token = req.header('Authorization')?.replace('Bearer ', '')

                if (!token) {
                return res.status(403).json({ 
                    success: false,
                    message : 'forbidden : authentication required!'
                    })
                }
                
                jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
                    if (err) {
                        // 3.1 if token is expired don't next to delete access
                        console.error(chalk.red('Token verification failed:'), chalk.yellow(err.message));
                        // console.error('token verification failed : ', err.message)
                            return res.status(400).json({
                                success: false,
                                message : 'forbidden : access token has been expired!'
                            })
                    
                    }
                    // 3.2 if token active next to delete access
                    console.table(decoded)
                    if (decoded.role === role) {
                        req.decoded = decoded
                        return next()
                    } else return res.status(403).json({ 
                        success: false,
                        message : 'forbidden : access is restricted!'
                    })
                })
            

            } catch (err) {
                console.error()
                return res.status(500).json({ message: '' })
            }

        }
        
    }

    
} 
