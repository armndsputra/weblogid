import mongoose from "mongoose"

// helper
import { __file_remove } from "../../../../helpers/__file_remove.mjs"

// model
import Post from '../../../models/postModel.mjs'

export const processUpdateContentData = async ( req, res, next ) => {

    const id = req.params.id // id data
    let thumbnailPaths = [] // empy array

    try {

        if (!req.body) {
            return res.status(400).json({ 
                success : false,
                message : 'no data provided!'
            })
        }

        // 1. organize file paths into an array
        if (req.files && req.files.length > 0) {
            thumbnailPaths = req.files.map(file => file.path)
        }

        // 2. validasi ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // remove files
            await __file_remove(thumbnailPaths).then(result => {
                    console.log('operation result:', result)
                }).catch(error => {
                    console.error('operation failed:', error)
                })
            
            return res.status(400).json({ 
                success : false,
                message : 'incorrect ID entered!'
            })
        }

      
        // 3. check if data exists
        const result = await Post.findById(id)
        if (!result) {
            // remove files
            await __file_remove(thumbnailPaths).then(result => {
                    console.log('operation result:', result)
                }).catch(error => {
                    console.error('operation failed:', error)
                });
            return res.status(404).json({ 
                success : false,
                message : 'ID data not available!'
            })
        }

        // 4. validate access user
        // MAIN ACCESS USER
        if (req.decode.id !== result.user.toString()) {
            // remove files
            await __file_remove(thumbnailPaths).then(result => {
                    console.log('operation result:', result)
                }).catch(error => {
                    console.error('operation failed:', error)
                });
            return res.status(403).json({ 
                success : false,
                message : 'forbidden : update restricted access!'
            })
        }

        // 5. validate thumbnail file count
        if (thumbnailPaths.length > 1) {
            // remove files
            await __file_remove(thumbnailPaths).then(result => {
                    console.log('operation result:', result)
                }).catch(error => {
                    console.error('operation failed:', error)
                });
            return res.status(413).json({ 
                success : false,
                message : 'only one file is allowed'
            })
        }

        // 6. Handle thumbnail update
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

        // 7. prepare update data
        const data = {
            title : req.body.title || result.title,
            content : req.body.content || result.content,
            thumbnail : finalThumbnailPath
        }

        // 8. data has been verified
        req.id = id
        req.data = data
        console.table(data)
        next()

    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).send({ 
            success : false,
            message: 'error processing update content data!' 
        })
    }

}