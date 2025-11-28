import mongoose from "mongoose"
// import bcrypt from "bcrypt"

import User from "../../../../models/userModel.mjs"

// helper
import { __file_remove } from "../../../../../helpers/__file_remove.mjs"

export const processUpdateUserData = async ( req, res, next) => {

    try {

        // ACCESS UPDATE USER
        const _id = req.decode.id

        if (!req.body) return res.status(422).json({ message: 'No data provided in request body!' })

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
            await __file_remove(avatarPaths).then(result => {
                console.log('operation result :', result)
            }).catch(error => {
                console.error('operation failed :', error)
            })
                    
            return res.status(400).json({ message : 'the ID you entered is incorrect!'})
        }
        
        // 3. fetch data by user ID
        const user = await User.findById(id)

        // 4. print user if user not found
        if (!user) return res.status(404).json({ message : 'user ID not found!'})

        // 5. if file path > 0 have to remove
        if (avatarPaths.length > 1) {
            // remove files
            await __file_remove(avatarPaths).then(result => {
                console.log('operation result :', result)
            }).catch(error => {
                console.error('operation failed :', error)
            })
            return res.status(413).json({ message : 'only one file is allowed'})
        }

        // 5.1 check old avatar old path & ne path
        const avatar = avatarPaths[0] || user.avatar
        if (avatarPaths.length > 0) {
            // delete old avatar path user
            await __file_remove([user.avatar]).then(result => {
                console.log('operation result :', result)
            }).catch(error => {
                console.error('operation failed :', error)
            })
        }

        // // ACCESS UPDATE USER
        if (_id !== id) {
            // remove files
            await __file_remove(avatarPaths).then(result => {
                console.log('operation result :', result)
            }).catch(error => {
                console.error('operation failed :', error)
            })
            return res.status(403).json({ message : 'forbidden : the user does not have access!'})
        }

        // 7. data has been verified
        const data = {
            name : name || user.name,
            gender : gender || user.gender,
            birthday : birthday || user.birthday,
            avatar
        }

        console.table(data)
        req.data = data
        req.id = id
        next()

    } catch (err) {
        console.log(err)
    }

}