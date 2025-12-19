import mongoose from "mongoose"
// import bcrypt from "bcrypt"

import User from "../../../models/userModel.mjs"

// helper
import { _file_remove } from "../../../../helpers/_file_remove.mjs"

export const processUpdateUserData = async ( req, res, next) => {

    try {

        // ACCESS UPDATE USER
        const _id = req.decoded.id

        if (!req.body) return res.status(422).json({ 
            success: false,
            message: 'no data provided in request body!' 
        })

        const id = req.params.id
        const { name, gender, birthday } = req.body
        let avatarPaths = []

        // 0. organize file paths into an array
        if (req.files && req.files.length > 0) {
            avatarPaths = req.files.map(file => file.path)
        }
        
        // 1. validasi user ID 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // remove files
            await _file_remove(avatarPaths).then(result => {
                console.log('operation result :', result)
            }).catch(error => {
                console.error('operation failed :', error)
            })
                    
            return res.status(400).json({ 
                success: false,
                message : 'the ID you entered is incorrect!'
            })
        }
        
        // 3. fetch data by user ID
        const user = await User.findById(id)

        // 4. print user if user not found
        if (!user) return res.status(404).json({ 
            success: false,
            message : 'ID user data not available!'
        })

        // 5. if file path > 0 have to remove
        if (avatarPaths.length > 1) {
            // remove files
            await _file_remove(avatarPaths).then(result => {
                console.log('operation result :', result)
            }).catch(error => {
                console.error('operation failed :', error)
            })
            return res.status(413).json({ 
                success: false,
                message : 'only one file is allowed'
            })
        }

        // 5.1 check old avatar old path & ne path
        const avatar = avatarPaths[0] || user.avatar
        if (avatarPaths.length > 0) {
            // delete old avatar path user
            await _file_remove([user.avatar]).then(result => {
                console.log('operation result :', result)
            }).catch(error => {
                console.error('operation failed :', error)
            })
        }

        // // ACCESS UPDATE USER
        if (_id !== id) {
            // remove files
            await _file_remove(avatarPaths).then(result => {
                console.log('operation result :', result)
            }).catch(error => {
                console.error('operation failed :', error)
            })
            return res.status(403).json({ 
                success: false,
                message : 'forbidden : the user does not have access!'}
            )
        }

        // 7. data has been verified
        const processUpdateUserData = {
            name : name || user.name,
            gender : gender || user.gender,
            birthday : birthday || user.birthday,
            avatar
        }

        console.log('--------------------------- UPDATE USER --------------------------------')
        console.log('process update user data : ')
        console.log(user)
        console.log('TO : ')
        console.table(processUpdateUserData)
        console.log('--------------------------- END UPDATE USER --------------------------------')

        // 8. pass to next middleware
        req.processUpdateUserData = processUpdateUserData
        req.id = id
        next()

    } catch (err) {
        console.error(err)
        return res.status(500).json({ 
            success: false,
            message : "error processing update user data!", 
        })
    }

}