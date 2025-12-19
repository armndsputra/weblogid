import { _page_breaker } from "../../../../helpers/_page_breaker.mjs";

// http://localhost:3000/postal/?limit=2&offset=0 example pagination
export const processFetchAllContentData = async ( req, res, next ) => {

    const { limit, offset } = req.query

    try {

        // 1. cek value query
        const result = await _page_breaker( limit, offset )
        
        // 2. data has been verified
        req.data = result
        next()

    } catch (err) {
        // handle error
        // console.error(err)
        if (err.message === 'NOT_NUMBER' || 'NEGATIVE_VALUES_NOT_ALLOWED') {
            return res.status(400).json({
                success : false,
                error: 'limit & offset have to number and positive number!'
            });
        }
        return res.status(500).json({
            success : false,
            message : 'error processing fetch all content data!',
        })
        
    }

}