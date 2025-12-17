import { __page_breaker } from "../../../../helpers/__page_breaker.mjs";

export const processFetchAllCommentData = async(req, res, next) => {

    try {

        const { limit,  offset } = req.query;

        const pagination = await __page_breaker(offset, limit);

        req.pagination = pagination;
        next()

    } catch (err) {
        console.error(err);

        if (err.message === 'NOT_NUMBER' || 'NEGATIVE_VALUES_NOT_ALLOWED') {
            return res.status(400).json({
                success : false,
                message : 'invalid query parameter!',
                error: 'limit & offset have to number and positive number!'
            });
        }

        return res.status(500).json({ 
            success: false,
            message : 'error in process fetch all comment data', 
        });
    }

}