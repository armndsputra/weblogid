import mongoose from "mongoose"

import Post from '../../../models/postModel.mjs'

export const proccessCommentData = async ( req, res, next) => {

    try {

        // validate comment data exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ 
                success: false,
                message: 'no comment data provided' 
            })
        }  

        // validate id param
        const { id } = req.params
        const { comment } = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ 
            success: false,
            message : 'incorrect ID entered!'
        })

        // Example processing: Log the comment data
        console.log(`processing comment for ID: ${id}`)
        console.log(`comment: ${comment}`)

        // validate comment content
        if (typeof comment !== 'string' || comment.trim() === '') {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid comment data' 
            })
        }

        // check if post exists
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'post not found!' 
            }) 
        }
        
        // prepare processed comment data
        const proccessCommentData = {
            commenter: req.decode.id,
            content: id,
            comment: comment.trim(),
            createdAt: new Date() 
        }

        // next middleware with processed data
        req.processCommentData = proccessCommentData
        next()

    } catch (err) {
        console.error(err)
        return res.status(400).json({ 
            success: false,
            message: 'error in access comment process!',
        })
    }

}