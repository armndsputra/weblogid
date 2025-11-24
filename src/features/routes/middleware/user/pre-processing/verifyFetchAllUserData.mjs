export const verifyFetchAllUserData = async ( req, res, next ) => {

    try {

        next()

    } catch (err) {
         // handle errors
        console.log(err)
        res.status(500).json({
            message : 'Error system!',
        })
    }

}