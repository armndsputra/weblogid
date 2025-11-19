// npm package manager
import { body, validationResult } from 'express-validator'

// model
import Users from '../../../../models/userModel.mjs'

export const verifyLoginData = async ( req, res, next ) => {

    try {

        // 1. check send request body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message : 'request body is required'})
        }

        // 2. fetch all data
        const { email, password } = req.body

        // 3.1 check the sent data and validation rules
        await Promise.all([
                body('email').notEmpty().withMessage('email is required!').run(req),
                body('password').notEmpty().withMessage('password is required!').run(req),
            ])

        // 3.2 if the data does not meet the requirements, the uploaded file will be deleted
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.error('validation errors :', errors.array())
            return res.status(422).json({
                    message: 'validation failed!',
                    errors: errors.array(),
                    receivedData: req.body
            });
        }

        // 4. check account exists
        const user = await Users.findOne({ email }).exec()
        if (!user) {
            return res.status(400).json({ message: "Your email isn't exists !" })
        }

        // 5. data has been verified
        const data = {
            id : user._id.toString(),
            role : user.role,
            password : user.password,
            tempPassword : password
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