// helpers
import { _page_breaker } from "../../../../helpers/_page_breaker.mjs";


export const processFetchAllUserData = async ( req, res, next ) => {

    try {

        const { limit, offset } = req.query 

        // 1. cek value query
        const pagination = await _page_breaker( limit, offset )
        
        req.pagination = pagination

        next()

    } catch (err) {
         // handle errors
        console.log(err)

        if (err.message === 'NOT_NUMBER' || 'NEGATIVE_VALUES_NOT_ALLOWED') {
            return res.status(400).json({
                success : false,
                message : 'invalid query parameter!',
                error: 'limit & offset have to number and positive number!'
            });
        }
        res.status(500).json({
            success : false,
            message : 'error processing fetch all user data!',
        })
    }

}