import mongoose from "mongoose";

// model
import User from '../../../models/userModel.mjs'

// helper
import { _file_remove } from "../../../../helpers/_file_remove.mjs"

export const processDeleteUserData = async ( req, res, next ) => {

    try {

        const { role } = req.decoded
        const id = req.params.id

        // check id valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ 
            success: false,
            message : 'incorrect ID entered!'
        })

        // Check if data exists
        const user = await User.findById(id)
        if (!user) return res.status(404).json({ 
            success: false,
            message : 'ID user data not available!'
        })

        // ACCESS DELETE USER ( AuthorizationAuthorization )
        if (user.role === role) {
            return res.status(403).json({ 
                success: false,
                message : 'forbidden : user is prohibited from being deleted!'
            })
        }

        // remove old avatar path / file
        await _file_remove([user.avatar]).then(result => {
                        console.log('operation result:', result)
        }).catch(error => {
            console.error('operation failed:', error)
        })
        
        // data has been verified adn next process
        req.processUserData = user
        next()


    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            success: false,
            message : 'error in delete process!',
        })
    }

}