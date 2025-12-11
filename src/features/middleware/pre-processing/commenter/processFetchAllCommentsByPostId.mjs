import mongoose from 'mongoose';

import Post from '../../../models/postModel.mjs';

export const processFetchAllCommentsByPostId = async (req, res, next) => {

    try {

        const postId = req.params.id;
        const userId= req.decode.id
        
        // Validate postId
        if (!postId) {
            return res.status(400).json({ 
                success: false,
                message : 'Post ID is required' 
            });
        }

        if (!mongoose.Types.ObjectId.isValid(postId)) return res.status(400).json({ 
            success: false,
            message : 'incorrect ID entered!'
        })

        const post = await Post.findById(postId);

        if (post.user.toString() !== userId) {
            return res.status(403).json({ 
                success: false,
                message : 'Access denied. You do not have permission to view these comments.' 
            });
        }

        req.data = postId
        next()


    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}