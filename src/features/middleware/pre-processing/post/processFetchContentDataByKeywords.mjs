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


export const processFetchContentDataByKeywords = async ( req, res, next ) => {

        const { limit, offset } = req.query

    try  {
      
       const data = await _page_breaker( limit, offset)

        if (!req.body) return res.status(400).json({ 
            success : false,
            message : 'keyword is required!'
        })

        // 1. fetch data by keywords
        const { keywords } = req.body
        
        // 2. check if length <= 0
        if (keywords.length <= 0) {
            return res.status(404).json({ 
                success : false,
                message : 'keyword has not been entered!'
            })
        }
        
        // 3. data has been verified
        req.keywords = keywords.toLowerCase()
        req.data = data
        next()

    } catch (err) {
        // handle errors
        console.log(err)
        if (err.message === 'NOT_NUMBER' || 'NEGATIVE_VALUES_NOT_ALLOWED') {
            return res.status(400).json({
                success : false,
                error: 'limit & offset have to number and positive number!'
            });
        }
        return res.status(500).json({
            success : false,
            message : 'error processing fetch content data by keywords!',
        })
    }

}