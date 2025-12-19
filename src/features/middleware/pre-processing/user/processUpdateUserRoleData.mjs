import mongoose from "mongoose"
import { body, validationResult } from 'express-validator'
import chalk from "chalk"

import User from "../../../models/userModel.mjs"

export const processUpdateUserRoleData = async ( req, res, next ) => {

    try {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'no data provided to update!'
            })
        }

        const { id } = req.params
        const { role } = req.body

         // validasi user ID 
        if (!mongoose.Types.ObjectId.isValid(id)) { 
            return res.status(400).json({ 
                success: false,
                message : 'the ID you entered is incorrect!'
            })
        }

        // 1. check the sent data and validation rules
        await Promise.all([
            body('role').notEmpty().withMessage('role is required!').run(req),
        ])
        // 1.1  if the data does not meet the requirements
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log('----------------------------------------------------------------------')
            // console.error('validation errors :', errors.array())
            console.log(chalk.red('Update Role Validation Failed : '))
            errors.array().forEach(e => {
                console.log('Request Body : ', chalk.red(e.msg))
            })
            console.log('----------------------------------------------------------------------')
            return res.status(422).json({
                    success: false,
                    message: 'validation failed!',
                    errors: errors.array().map(err => err.msg),
                    receivedData: req.body
            })
        }

        // MAIN ACCES ADMIN
        if (role === 'admin') {
            return res.status(403).json({ 
                success: false,
                message : 'forbidden : cannot set role to admin!'
            })
        }

        

        // 3. cek user by ID
        const checkUser = await User.findById(id)
        
        if (!checkUser) {
            return  res.status(404).json({
                success: false,
                message : 'user not found!',
            })
        } else if (checkUser.role === 'admin') {
            return  res.status(403).json({
                success: false,
                message : 'forbidden : cannot change role of admin user!',
            })
        } else if (checkUser.role === role) {
            return  res.status(400).json({
                success: false,
                message : `user already has the role of '${role}'!`,
            })
        }

        console.log('---------------- User Role Update Data Processed ---------------------')
        console.log('User ID        :', chalk.green(id))
        console.log('Old Role       :', chalk.green(checkUser.role))
        console.log('New Role       :', chalk.green(role))
        console.log('----------------------------------------------------------------------')


        // 4. data has been verified as valid, continue to the next middleware
        req.processUpdateUserRoleData = { role, id }
        next() 

    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            success: false,
            message : 'error processing update user role data!',
        })
    }

}