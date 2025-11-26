import mongoose from "mongoose"

// Model
import Contents from '../../../../models/postalModel.mjs'

// helper
import { __file_remove } from "../../../../../helpers/__file_remove.mjs"

export const verifyDeleteContentData = async ( req, res, next ) => {

    try {

        // 1. check id valid or not
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message : 'invalid id!'})
        
        // 2. Check if data exists
        const result = await Contents.findById(id)
        if (!result) return res.status(404).json({ message : 'data not found!'})

        // MAIN ACCESS USER
        if (req.decode.id !== result.user) return res.status(403).json({ message : 'forbidden : access is restricted!'})
        
        // 3. delete file
        let filePaths = []
        filePaths.push(result.thumbnail)
        await __file_remove(filePaths).then(result => {
                console.log('operation result :', result)
            }).catch(error => {
                console.error('operation failed :', error)
            });
         
        // 4. data has been verified
        req.data = result
        next()

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}