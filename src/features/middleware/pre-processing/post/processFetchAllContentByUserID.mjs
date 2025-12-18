import { __page_breaker } from "../../../../helpers/__page_breaker.mjs"

export const processFetchAllContentByUserId = async (req, res, next) => {


    try {

        const { limit, offset } = req.query

        const pagination = await __page_breaker(limit, offset)
 
        const { id } = req.decoded
        req.pagination = pagination
        req.id = id
        next()

    } catch (err) {
        console.log(err)
        if (err.message === 'NOT_NUMBER' || 'NEGATIVE_VALUES_NOT_ALLOWED') {
            return res.status(400).json({
                success : false,
                error: 'limit & offset have to number and positive number!'
            });
        }

        return res.status(500).json({
            success : false,
            error: 'error in process fetching content by user ID'
        }); 
    }

}