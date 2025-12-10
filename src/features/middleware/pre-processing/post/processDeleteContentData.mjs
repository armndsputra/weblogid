import mongoose from "mongoose"

// model
import Post from '../../../models/postModel.mjs'

// helper
import { __file_remove } from "../../../../helpers/__file_remove.mjs"

export const processDeleteContentData = async ( req, res, next ) => {

    try {

        // 1. check id valid or not
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ 
            success : false,
            message : 'incorrect ID entered!'
        })
        
        // 2. Check if data exists
        const result = await Post.findById(id)
        if (!result) return res.status(404).json({ 
            success : false,
            message : 'ID data not available!'
        })

        // MAIN ACCESS USER
        if (req.decode.id !== result.user.toString()) return res.status(403).json({ 
            success : false,
            message : 'forbidden : remove restricted access!'
        })
        
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
            success : false,
            message : 'error processing delete content data!',
        })
    }

}