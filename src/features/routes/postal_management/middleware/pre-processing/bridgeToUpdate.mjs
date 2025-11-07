import mongoose from "mongoose";

// Helper
import { __file_remove } from "../../../../../helpers/__file_remove.mjs";

// Model
import Blogs from '../../../../models/postal_model.mjs'

export const bridgeToUpdate = async ( req, res, next ) => {

    const id = req.params.id // id data
    let thumbnailPaths = [] // empy array

    try {

        // 1. validasi ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // remove files
            await __file_remove(thumbnailPaths).then(result => {
                    console.log('operation result:', result)
                }).catch(error => {
                    console.error('operation failed:', error)
                });
            
            return res.status(400).json({ message : 'invalid id!'})
            
        }

        // 2. organize file paths into an array
        if (req.files && req.files.length > 0) {
            thumbnailPaths = req.files.map(file => file.path)
        }
      
        // 3. check if data exists
        const result = await Blogs.findById(id)
        if (!result) {
            // remove files
            await __file_remove(thumbnailPaths).then(result => {
                    console.log('operation result:', result)
                }).catch(error => {
                    console.error('operation failed:', error)
                });
            return res.status(404).json({ message : 'data not found!'})
        }

        // 4. Handle thumbnail update
        const oldThumbnailPath = result.thumbnail
        let finalThumbnailPath
        if (req.files && req.files.length > 0) {
            // remove old path thumbnail and update new path thumbnail
            finalThumbnailPath = thumbnailPaths[0]
            // remove files
            await __file_remove([oldThumbnailPath]).then(result => {
                    console.log('operation result:', result)
                }).catch(error => {
                    console.error('operation failed:', error)
                });
        } else {
            finalThumbnailPath = oldThumbnailPath
        }

        // 5. prepare update data
        const data = {
            title : req.body.title || result.title,
            content : req.body.content || result.content,
            thumbnail : finalThumbnailPath
        }

        // 6. data has been verified
        req.id = id
        req.data = data
        console.table(data)
        next()

    } catch (err) {

        // handle errors
        console.error(err)
        res.status(500).send({ 
            message: 'Error system !' 
        })
    }

}