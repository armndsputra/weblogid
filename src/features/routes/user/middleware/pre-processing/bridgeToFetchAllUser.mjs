export const bridgeToFetchAllUser = async ( req, res, next ) => {

    try {

        console.log('ok')
        next()

    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }

}