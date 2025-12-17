import Commenter from '../models/commenterModel.mjs'

// controller to handle adding a comment
export const commenter = async (req, res) => {
    try {

        const data = req.processCommentData
        console.log(data)
        const result = new Commenter(data)
        const savedCommenter = await result.save()

        res.status(201).json({
            success: true,
            message: `comment added to post ${data.content} successfully`,
            comment: {
                id: savedCommenter._id,
                commenter: savedCommenter.commenter,
                content: savedCommenter.content,
                comment: savedCommenter.comment,
                createdAt: savedCommenter.createdAt 
            }
        })


     } catch (err) {
        console.error(err)
        res.status(500).json({ 
            success: false,
            message: 'error adding comment!' 
        })
    }
}

// controller to fetch comments by post id
export const fetchCommenterByPostId = async (req, res) => {
    try {
        const postId = req.data;

        const comments = await Commenter.find({ content : postId }).skip(req.pagination.offset).limit(req.pagination.limit).sort({ createdAt : -1 });   

        res.status(200).json({
            success : true,
            message : `comments for post ${postId} fetched successfully`,
            comments : comments.map(comment => ({
                id : comment._id,
                commenter : comment.commenter,
                content : comment.content,
                comment : comment.comment,
                createdAt : comment.createdAt
            }))
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'error in fetch all commenter by post ID/contentID'
        })
    }
}

// delete comment controller
export const deleteCommenter = async ( req, res ) => {
    try {

        const commentId = req.id

        const deletedComment = await Commenter.findByIdAndDelete(commentId)

        if (!deletedComment) {
            return res.status(404).json({
                success : false,
                message : 'comment not found'
            })
        }

        return res.status(200).json({
            success : true,
            message : 'comment deleted successfully',
            deletedComment : {
                id : deletedComment._id,
                commenter : deletedComment.commenter,
                content : deletedComment.content,
                comment : deletedComment.comment,
                createdAt : deletedComment.createdAt
            }
        })

    } catch ( err ) {
        console.error(err)
        res.status(500).json({
            success : false,
            message : 'error deleting comment'
        })
    }
}

// fetch all commenter controller
export const fetchAllCommenter = async (req, res) => {
    try {

        const comments = await Commenter.find({}).skip(req.pagination.offset).limit(req.pagination.limit).sort({ createdAt : -1 });

        res.status(200).json({
            success : true,
            message : 'all comments fetched successfully',
            comments : comments.map(comment => ({
                id : comment._id,
                commenter : comment.commenter,
                content : comment.content,
                comment : comment.comment,
                createdAt : comment.createdAt
            }))
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'error in fetch all commenter'
        })
    }
}