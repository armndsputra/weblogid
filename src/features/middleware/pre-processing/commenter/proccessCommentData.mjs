import mongoose from "mongoose"

import Contents from '../../../models/postModel.mjs'

export const proccessCommentData = async ( req, res, next) => {

    try {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'No comment data provided' })
        }  

        const { id } = req.params
        const { comment } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message : 'incorrect ID entered!'})

        // Example processing: Log the comment data
        console.log(`Processing comment for ID: ${id}`)
        console.log(`comment: ${comment}`)

        if (typeof comment !== 'string' || comment.trim() === '') {
            return res.status(400).json({ message: 'Invalid comment data' })
        }

        const content = await Contents.findById(id)

        if (!content) {
            return res.status(404).json({ message: 'Content not found' })
        }
        
        const data = {
            commenter: req.decode.id,
            content: id,
            comment: comment.trim(),
            created: new Date() 
        }

        req.data = data
        next()

    } catch (error) {
        console.error('Error processing comment data:', error)
        return res.status(400).json({ 
            message: 'Failed to process comment data',
            error: error.message 
        })
    }

}