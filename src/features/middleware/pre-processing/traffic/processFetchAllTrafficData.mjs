import { _page_breaker } from '../../../../helpers/_page_breaker.mjs'

export const processFetchAllTrafficData = async (req, res, next) => {
    
    try {

        const { limit, offset } = req.query 

        // cek value query
        const pagination = await _page_breaker( limit, offset )
        req.pagination = pagination

        next()

    } catch (err) {
        console.error(err)
        if (err.message === 'NOT_NUMBER' || 'NEGATIVE_VALUES_NOT_ALLOWED') {
            return res.status(400).json({
                success : false,
                message : 'invalid query parameter!',
                error: 'limit & offset have to number and positive number!'
            });
        }
        return res.status(500).json({ 
            success: false,
            message : 'error in fetch traffic data pre processing', 
        });
    }
}