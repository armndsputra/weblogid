// npm package manager
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const login = async ( req, res ) => {

    try {

        // 1. fetch data has been verifed
        const { id, role, tempPassword, password } = req.data

        // 2. check password and tempPassword
        const verifyPasword = await bcrypt.compare(tempPassword, password)
        if (!verifyPasword) {
            return res.status(401).json({ message : "your password isn't correct !"})
        }

        // 3. set jwt and print
        jwt.sign({ 
            id,
            role
        }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRES }, function(err, token) {
            if (err) return console.error(err)
                return res.status(201).json({
                    message : "you have successfully logged in",
                    access_token : token,
                    token_type: "bearer",
                    expires_in: process.env.JWT_EXPIRES
                })
        })

    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

} 