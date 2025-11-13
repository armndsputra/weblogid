import mongoose from "mongoose";

import User from '../../../../models/user_model.mjs'

export const bridgeToDeleteUser = async ( req, res, next ) => {

    try {

        const id = req.params.id

        // 1. check id valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message : 'invalid id!'})

        // 2. Check if data exists
        const result = await User.findById(id);
        if (!result) return res.status(404).json({ message : 'data not found!'})

        // 3. data has been verified
        req.data = result
        next()


    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}