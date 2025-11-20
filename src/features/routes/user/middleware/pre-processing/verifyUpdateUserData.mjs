import mongoose from "mongoose"
import bcrypt from "bcrypt"

import User from "../../../../models/userModel.mjs"

export const verifyUpdateUserData = async ( req, res, next) => {

    try {

        const id = req.params.id
        const { name, old_password, new_password, confirm_password, gender, birthday } = req.body

        // 1. validasi user ID 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // remove files
            // await __file_remove(thumbnailPaths).then(result => {
            //     console.log('operation result:', result)
            // }).catch(error => {
            //     console.error('operation failed:', error)
            // })
                    
            return res.status(400).json({ message : 'the ID you entered is incorrect!'})
        }
        
        // 2. fetch data by user ID
        const user = await User.findById(id)

        // 3. print user if user not found
        if (!user) return res.status(404).json({ message : 'user ID not found!'})
        
        // 4. check password
        let password = user.password
        if (old_password) {

            const verifyPasword = await bcrypt.compare(old_password, user.password)
            if (!verifyPasword) {
                return res.status(401).json({ message : "your password isn't correct !"})
            }
            
            if (new_password !== confirm_password) return res.status(404).json({ message : 'confirmation password not match!'})

            password = new_password
        }

        const data = {
            
        }

    } catch (err) {
        console.log(err)
    }

}