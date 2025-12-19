import mongoose from "mongoose"

export const processFetchUserDataByID = async ( req, res, next ) => {

    const id = req.params.id

    try {

        // check id valid or not
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ 
            success : false,
            message : 'incorrect ID entered!'
        })
        
        req.id = id
        next()

    } catch (err) {
        // handle errors
        console.error(err)
        res.status(500).send({ 
            success : false,
            message: 'error processing fetch user by ID!' 
        })
    }

}