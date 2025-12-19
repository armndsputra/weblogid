// npm package manager
import { body, validationResult } from 'express-validator'
import chalk from 'chalk'

// model
import Users from '../../../models/userModel.mjs'

export const processLoginData = async ( req, res, next ) => {

    try {

        // check send request body
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                success: false,
                message : 'request body is required'
            })
        }

        // fetch all data
        const { email, password } = req.body

        // check the sent data and validation rules
        await Promise.all([
                body('email').notEmpty().withMessage('email is required!').run(req),
                body('password').notEmpty().withMessage('password is required!').run(req),
            ])

        // if the data does not meet the requirements, the uploaded file will be deleted
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log('----------------------------------------------------------------------')
            // console.error('validation errors :', errors.array())
            console.log(chalk.red('Login Data Validation Failed : '))
            errors.array().forEach(e => {
                console.log('Request Body : ', chalk.red(e.msg))
            })
            console.log('----------------------------------------------------------------------')
            return res.status(422).json({
                    success: false,
                    message: 'validation failed!',
                    errors: errors.array().map(err => err.msg),
                    receivedData: req.body
            });
        }

        // check account exists
        const user = await Users.findOne({ email }).exec()
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "account not found!" 
            })
        }

        console.log('----------------------------------------------------------------------')
        console.log(chalk.green('Login Data Validation Successful : '))
        console.log('User Found : ')
        console.log(`- ID       : ${user._id.toString()}`)
        console.log(`- Username : ${user.username}`)
        console.log(`- Email    : ${user.email}`)
        console.log(`- Role     : ${user.role}`)
        console.log('----------------------------------------------------------------------')

        // data has been verified
        const processLoginData = {
            id : user._id.toString(),
            username : user.username,
            role : user.role,
            password : user.password,
            tempPassword : password
        }

        // pass the verified data to the next middleware
        req.processLoginData = processLoginData
        next()

    } catch (err) {
        // handle errors
        console.log(err)
        res.status(500).json({
            success: false,
            message : 'error in login process!',
        })
    }

}