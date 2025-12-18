// npm package manager
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const login = async ( req, res ) => {

    try {

        // 1. fetch data has been verifed
        const { id, username, role, tempPassword, password } = req.processLoginData

        // 2. check password and tempPassword
        const verifyPasword = await bcrypt.compare(tempPassword, password)
        if (!verifyPasword) {
            return res.status(401).json({ 
                success : false,
                message : "your password isn't correct !"
            })
        }

        // 3. set jwt and print data
        jwt.sign({ 
            id,
            username,
            role
        }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES }, function(err, token) {
            if (err) return console.error(err)
                return res.status(201).json({
                    success : true,
                    message : "you have successfully logged in",
                    data : {
                        access_token : token,
                        token_type: "Bearer",
                        expires_in: process.env.JWT_EXPIRES
                    }
                })
        })

        return false

    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            success: false,
            message : 'error in login service!',
        })
    }

} 