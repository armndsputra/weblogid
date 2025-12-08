// npm package manager
import { body, validationResult } from 'express-validator'
import bcrypt from "bcrypt"

// model
import User from '../../../../models/userModel.mjs'

export const processRegisterData = async ( req, res, next ) => {

    try {

        // 1. fetch all data
        const { name, username, confirm_password, email, password, gender, birthday } = req.body

        // 2.1 check the sent data and validation rules
        await Promise.all([
                body('name').notEmpty().withMessage('name is required!').run(req),
                body('username').notEmpty().withMessage('username is required!').run(req),
                body('email').notEmpty().withMessage('email is required!').run(req),
                body('password').notEmpty().withMessage('password is required!').run(req),
                body('confirm_password').notEmpty().withMessage('birthday is required!').run(req),
                body('birthday').notEmpty().withMessage('birthday is required!').run(req)
            ])

        // 2.2 if the data does not meet the requirements, the uploaded file will be deleted
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.error('validation errors :', errors.array())
            return res.status(422).json({
                    message: 'validation failed!',
                    errors: errors.array(),
                    receivedData: req.body
            });
        }

        // 3. check if the data is available
       const userExists = await User.findOne({$or: [{ email }, { username }]})
       if (userExists) {
            const conflictField = userExists.email === email ? 'email' : 'username';
            return res.status(409).json({ 
                message: `${conflictField} already registered` 
            });
        }

        // 3.1 check confirmation password
        if ( password !== confirm_password) {
            return res.status(202).json({ message : 'password is not match!'})
        }

        // 4. hash password
        const saltRoundes = 12
        const hashedPassword = await bcrypt.hash(password, saltRoundes)

        // 5. data has been verified
        const data = { 
            name, 
            username, 
            email, 
            password : hashedPassword, 
            gender, 
            birthday, 
            created : new Date(), 
            avatar : 'default',
            role : 'guest'
        }

        req.data = data
        next()

    } catch (err) {
        // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}