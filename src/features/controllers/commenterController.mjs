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

        const comments = await Commenter.find({ content : postId })

        res.status(200).json({
            success: true,
            message: `comments for post ${postId} fetched successfully`,
            comments: comments.map(comment => ({
                id: comment._id,
                commenter: comment.commenter,
                content: comment.content,
                comment: comment.comment,
                createdAt: comment.createdAt
            }))
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'error fetching comments!'
        });
    }
}