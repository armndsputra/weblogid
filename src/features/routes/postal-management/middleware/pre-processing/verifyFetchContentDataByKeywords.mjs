export const verifyFetchContentDataByKeywords = async ( req, res, next ) => {

    try  {

        // 1. fetch data by keywords
        const { keywords } = req.body
        
        // 2. check if length <= 0
        if (keywords.length <= 0) {
            return res.status(404).json({ message : 'keyword has not been entered!'})
        }
        
        // 3. data has been verified
        req.keywords = keywords
        next()

    } catch (err) {
        // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}