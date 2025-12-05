// pagination
async function _page_breaker( limit, offset) {

    if (isNaN(limit) || isNaN(offset)) {
        throw new Error('NOT_NUMBER');
    }

    if (limit < 0 || offset < 0) {
            throw new Error('NEGATIVE_VALUES_NOT_ALLOWED')
    }

    return { limit, offset }
}

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
                error: 'limit & offset have to number and positive number!'
            });
        }
        return res.status(500).json({
            message : 'error system!',
        })
        
    }

}